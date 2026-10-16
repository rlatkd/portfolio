"""Offline measurement of the real correlation service with deterministic provider fixtures.
Run with the up-quant backend virtualenv; never calls a live exchange.
"""
import argparse
import hashlib
import json
import math
import platform
import os
from importlib.metadata import version
import statistics
import subprocess
import sys
import time
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch
from datetime import datetime, timezone, timedelta

parser = argparse.ArgumentParser()
parser.add_argument('--source', type=Path, required=True, help='up-quant checkout root')
parser.add_argument('--output', type=Path, required=True)
parser.add_argument('--expected-commit', required=True, help='Explicit immutable commit SHA, checked before importing source')
parser.add_argument('--verify-remote', action='store_true', help='Also require the expected commit to match public origin main now')
args = parser.parse_args()
root = args.source.resolve()
source_commit = subprocess.check_output(['git', '-C', str(root), 'rev-parse', 'HEAD'], text=True).strip()
if source_commit != args.expected_commit:
    parser.error(f'Source commit mismatch: expected {args.expected_commit}, got {source_commit}')
source_status = subprocess.check_output(['git', '-C', str(root), 'status', '--porcelain', '--untracked-files=normal', '--', 'backend/app', 'backend/requirements.txt'], text=True)
if source_status.strip():
    parser.error('Source has modified/untracked backend files; use a clean checkout')
remote_verification = None
if args.verify_remote:
    remote_url = 'https://github.com/rlatkd/up-quant.git'
    remote_line = subprocess.check_output(['git', 'ls-remote', remote_url, 'refs/heads/main'], text=True, timeout=30).strip()
    remote_head = remote_line.split()[0] if remote_line else ''
    if remote_head != source_commit:
        parser.error(f'Remote main changed: expected {source_commit}, got {remote_head}; review and check out that commit first')
    remote_verification = {'repository': remote_url, 'ref': 'refs/heads/main', 'head': remote_head, 'checkedAt': datetime.now(timezone.utc).isoformat()}
sys.path.insert(0, str(root / 'backend'))
from app.core import cache
from app.clients import upbit_rest
from app.services import analysis_service, market_service

markets = [f'KRW-FIXTURE{i:03d}' for i in range(260)]
end = datetime(2026, 10, 1, tzinfo=timezone.utc)
fixtures = {}
for i, market in enumerate(markets):
    fixtures[market] = [{
        'candle_date_time_utc': (end - timedelta(days=199 - day)).strftime('%Y-%m-%dT%H:%M:%S'),
        'opening_price': 100 + i, 'high_price': 120 + i, 'low_price': 80 + i,
        'trade_price': 100 + i + day * .02 + math.sin(day * .17 + i * .1),
        'candle_acc_trade_volume': 1000, 'candle_acc_trade_price': 100000,
    } for day in reversed(range(200))]
calls = 0

def provider(interval, market, count, to=None):
    global calls
    calls += 1
    assert interval == 'days' and count == 200 and to is None
    return fixtures[market][:count]

def forbid(*args, **kwargs):
    raise AssertionError('Live network calls are forbidden in this benchmark')

def measure():
    start = time.perf_counter_ns()
    result = analysis_service.get_correlation(markets[0])
    elapsed = (time.perf_counter_ns() - start) / 1e6
    assert len(result) == 259
    return elapsed, [(item.market, item.correlation) for item in result]

with patch.object(market_service, 'valid_markets', return_value=markets), \
     patch.object(market_service, 'get_tickers', return_value=[SimpleNamespace(market=m, korean_name=m) for m in markets]), \
     patch.object(upbit_rest, 'get_candles', side_effect=provider), \
     patch.object(upbit_rest._client, 'get', side_effect=forbid):
    cold_samples = []
    for _ in range(10):
        cache.clear()
        elapsed, expected = measure()
        cold_samples.append(elapsed)
    assert calls == 2600
    warm_samples = []
    before = calls
    for _ in range(100):
        elapsed, actual = measure()
        assert actual == expected
        warm_samples.append(elapsed)
    assert calls == before

files = ['backend/app/core/cache.py', 'backend/app/services/candle_service.py', 'backend/app/services/analysis_service.py']
summary = lambda values: {'samples': len(values), 'p50Ms': round(statistics.median(values), 3), 'p95Ms': round(sorted(values)[math.ceil(len(values) * .95) - 1], 3), 'rawMs': [round(v, 3) for v in values]}
result = {
    'measuredAt': datetime.now(timezone.utc).isoformat(),
    'scope': 'Offline Python service function only; fixture provider, no HTTP server or exchange latency',
    'sourceCommit': source_commit,
    'sourceCheck': {'expectedCommit': args.expected_commit, 'cleanBackend': True, 'remoteVerification': remote_verification},
    'sourceHashes': {f: hashlib.sha256((root / f).read_bytes()).hexdigest() for f in files},
    'dependencies': {name: version(name) for name in ['pydantic', 'pydantic-settings', 'httpx']},
    'hashSeed': os.environ.get('PYTHONHASHSEED', 'random'),
    'environment': {'os': platform.system(), 'osRelease': platform.release(), 'architecture': platform.machine(), 'python': platform.python_version()},
    'conditions': {'markets': 260, 'candlesPerMarket': 200, 'correlationWindow': 60, 'concurrency': 1, 'network': 'disabled', 'coldState': 'cache cleared before each sample', 'warmState': 'reuse candle cache after final cold sample', 'fixedFormula': '100 + marketIndex + day * 0.02 + sin(day * 0.17 + marketIndex * 0.1)'},
    'cold': summary(cold_samples), 'warm': summary(warm_samples),
    'providerCalls': {'coldTotal': before, 'warmTotal': calls - before},
    'resultConsistency': True,
    'limitations': 'Does not reproduce the historical 1.8s to 5ms claim or measure production HTTP latency. Fixture data is synthetic and provider has no network delay.',
}
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({key: value for key, value in result.items() if key not in ['sourceHashes', 'cold', 'warm']}, ensure_ascii=False))
print(json.dumps({'cold': {k:v for k,v in result['cold'].items() if k != 'rawMs'}, 'warm': {k:v for k,v in result['warm'].items() if k != 'rawMs'}}))

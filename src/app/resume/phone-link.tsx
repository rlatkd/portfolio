'use client';

import { useEffect, useState } from 'react';

// 2026-11-01: 휴대폰 번호를 HTML 소스에 그대로 두지 않는다.
// 뒤집은 번호를 base64로 인코딩해 두고 브라우저에서만 복원하므로, HTML만 읽는 단순 수집기는 번호를 가져가지 못한다.
const ENCODED = 'ODczMC03MjYyLTAxMA==';

export function PhoneLink() {
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    setPhone([...atob(ENCODED)].reverse().join(''));
  }, []);

  // 복원 전에는 같은 자리를 비워 두어 레이아웃이 움직이지 않게 한다.
  if (!phone) return <span aria-hidden='true' style={{ visibility: 'hidden' }}>000-0000-0000</span>;
  return <a href={`tel:+82${phone.replace(/-/g, '').slice(1)}`}>{phone}</a>;
}

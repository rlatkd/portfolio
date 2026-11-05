// 2026-11-04: TrueType 글꼴(sfnt)의 이름 표(name) 중 지정한 항목만 새 이름으로 바꾸고 나머지 표는 그대로 다시 묶는다.
// 글자를 덜어 낸 글꼴은 OFL상 수정 버전이라 예약 이름을 쓸 수 없어서 쓴다(scripts/build-fonts.mjs).

function checksum(data) {
  let sum = 0;
  for (let index = 0; index < data.length; index += 4) {
    sum = (sum + (((data[index] << 24) | ((data[index + 1] ?? 0) << 16) | ((data[index + 2] ?? 0) << 8) | (data[index + 3] ?? 0)) >>> 0)) >>> 0;
  }
  return sum;
}

function buildNameTable(table, names) {
  if (table.readUInt16BE(0) !== 0) throw new Error('name 표 형식 0만 처리한다');
  const count = table.readUInt16BE(2);
  const storage = table.readUInt16BE(4);
  const records = [];
  for (let index = 0; index < count; index++) {
    const at = 6 + index * 12;
    const nameID = table.readUInt16BE(at + 6);
    if (Object.hasOwn(names, nameID)) continue; // 바꿀 항목은 모든 플랫폼 기록을 지우고 아래에서 새로 넣는다
    const length = table.readUInt16BE(at + 8);
    const offset = table.readUInt16BE(at + 10);
    records.push({
      platformID: table.readUInt16BE(at), encodingID: table.readUInt16BE(at + 2), languageID: table.readUInt16BE(at + 4), nameID,
      data: table.subarray(storage + offset, storage + offset + length),
    });
  }
  for (const [nameID, value] of Object.entries(names)) {
    records.push({ platformID: 3, encodingID: 1, languageID: 0x409, nameID: Number(nameID), data: Buffer.from(value, 'utf16le').swap16() });
  }
  records.sort((a, b) => a.platformID - b.platformID || a.encodingID - b.encodingID || a.languageID - b.languageID || a.nameID - b.nameID);
  const header = Buffer.alloc(6 + records.length * 12);
  header.writeUInt16BE(0, 0);
  header.writeUInt16BE(records.length, 2);
  header.writeUInt16BE(header.length, 4);
  let offset = 0;
  records.forEach((record, index) => {
    const at = 6 + index * 12;
    header.writeUInt16BE(record.platformID, at);
    header.writeUInt16BE(record.encodingID, at + 2);
    header.writeUInt16BE(record.languageID, at + 4);
    header.writeUInt16BE(record.nameID, at + 6);
    header.writeUInt16BE(record.data.length, at + 8);
    header.writeUInt16BE(offset, at + 10);
    offset += record.data.length;
  });
  return Buffer.concat([header, ...records.map(record => record.data)]);
}

/** names: { 이름 ID: 새 문자열 }. 바꾼 글꼴(TrueType)을 Buffer로 돌려준다. */
export function renameFont(font, names) {
  const input = Buffer.from(font);
  const sfntVersion = input.readUInt32BE(0);
  const tables = new Map();
  for (let index = 0; index < input.readUInt16BE(4); index++) {
    const at = 12 + index * 16;
    const offset = input.readUInt32BE(at + 8);
    tables.set(input.toString('latin1', at, at + 4), Buffer.from(input.subarray(offset, offset + input.readUInt32BE(at + 12))));
  }
  tables.set('name', buildNameTable(tables.get('name'), names));
  tables.get('head').writeUInt32BE(0, 8); // checkSumAdjustment는 전체를 묶은 뒤 다시 계산한다

  const tags = [...tables.keys()].sort();
  const entrySelector = Math.floor(Math.log2(tags.length));
  const header = Buffer.alloc(12 + tags.length * 16);
  header.writeUInt32BE(sfntVersion, 0);
  header.writeUInt16BE(tags.length, 4);
  header.writeUInt16BE(2 ** entrySelector * 16, 6);
  header.writeUInt16BE(entrySelector, 8);
  header.writeUInt16BE(tags.length * 16 - 2 ** entrySelector * 16, 10);
  const chunks = [header];
  let offset = header.length;
  let headOffset = 0;
  tags.forEach((tag, index) => {
    const data = tables.get(tag);
    const at = 12 + index * 16;
    header.write(tag, at, 'latin1');
    header.writeUInt32BE(checksum(data), at + 4);
    header.writeUInt32BE(offset, at + 8);
    header.writeUInt32BE(data.length, at + 12);
    if (tag === 'head') headOffset = offset;
    const padded = Buffer.concat([data, Buffer.alloc((4 - (data.length % 4)) % 4)]);
    chunks.push(padded);
    offset += padded.length;
  });
  const result = Buffer.concat(chunks);
  result.writeUInt32BE((0xb1b0afba - checksum(result)) >>> 0, headOffset + 8);
  return result;
}

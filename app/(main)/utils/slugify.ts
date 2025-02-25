export const slugify = (text) => {
  return text
    .toString()
    .trim()
    .replace(/[\s]+/g, '-') // 한국어: 띄어쓰기 기준으로 '-'
    .replace(/([a-z])([A-Z])/g, '$1-$2') // 영어: 대문자 앞에 '-' 추가 (camelCase)
    .toLowerCase()
    .replace(/&/g, '-and-')
    .replace(/[^\w\-가-힣]+/g, '') // 한글, 영문, 숫자만 허용
    .replace(/\-\-+/g, '-') // 연속된 '-' 제거
}
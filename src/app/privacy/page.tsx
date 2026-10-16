import Link from 'next/link';
import { profile } from '@/shared/data/site-data';
export const metadata = { title: '개인정보 및 방문 분석 안내', alternates: { canonical: '/privacy' } };
export default function Privacy() {
  return <main className='mx-auto w-full max-w-3xl px-6 py-12 leading-loose'>
    <Link href='/' className='text-accent underline'>← 포트폴리오</Link>
    <h1 className='mt-8 text-3xl font-bold'>개인정보 및 방문 분석 안내</h1>
    <p className='mt-6'>이 사이트는 김상훈의 포트폴리오와 기술 블로그입니다. 회원가입, 댓글, 결제 기능은 제공하지 않습니다.</p>
    <h2 className='mt-8 text-xl font-bold'>방문 분석</h2>
    <p>공식 운영 도메인에서 Google Analytics 4, Vercel Web Analytics와 Speed Insights를 사용해 페이지 방문, 유입 경로와 성능을 확인합니다. 개발·미리보기 환경에는 분석 도구를 활성화하지 않습니다.</p>
    <p>Google Analytics는 브라우저 식별을 위해 쿠키를 사용할 수 있으며 페이지 URL, 브라우저·기기 정보와 상호작용을 처리합니다. URL과 입력 내용에 이름, 이메일 등 개인정보를 포함하지 마세요. 이 사이트는 이메일이나 연락처를 분석 이벤트로 직접 전송하지 않습니다.</p>
    <p>Vercel 분석 도구는 방문 통계와 로딩·응답 성능을 처리합니다. Google과 Vercel의 실제 보관 기간 및 처리는 각 서비스 설정과 정책에 따릅니다.</p>
    <ul className='list-disc pl-5'><li><a className='text-accent underline' href='https://policies.google.com/privacy'>Google 개인정보처리방침</a></li><li><a className='text-accent underline' href='https://vercel.com/docs/analytics/privacy-policy'>Vercel Web Analytics 개인정보 안내</a></li><li><a className='text-accent underline' href='https://tools.google.com/dlpage/gaoptout'>Google Analytics 수집 거부 도구</a></li></ul>
    <h2 className='mt-8 text-xl font-bold'>외부 콘텐츠와 브라우저 저장</h2>
    <p>블로그 이미지는 Velog 등 원문 이미지 서버에서, 글꼴은 jsDelivr에서 불러옵니다. 해당 서버에 접속 정보가 전달될 수 있습니다. 테마 선택은 브라우저 로컬 저장소에 저장됩니다.</p>
    <h2 className='mt-8 text-xl font-bold'>문의</h2>
    <p>이메일로 보낸 내용은 문의에 답변하는 데 사용됩니다. 문의: <a className='text-accent underline' href={`mailto:${profile.email}`}>{profile.email}</a></p>
  </main>;
}

import Image from 'next/image';

type Props = {
  image: string;
  alt: string;
  fit?: 'contain' | 'cover';
  cardTitle: string;
  cardTags: string[];
};

// 기존 스크린샷을 기울어진 브라우저 창에 넣고, 앞쪽에 정보 카드를 띄운 목업 장면
export default function DeviceMockup({ image, alt, fit, cardTitle, cardTags }: Props) {
  return (
    <div className='relative mx-auto w-full max-w-xl [perspective:1800px]'>
      {/* 조명 효과 — 그라디언트 대신 흐린 원 */}
      <div aria-hidden className='absolute -inset-10 rounded-full bg-navy-mid opacity-90 blur-3xl dark:bg-surface-2' />

      {/* 브라우저 창 */}
      <div className='relative rounded-xl bg-navy-mid p-2 shadow-2xl ring-1 ring-cream/10 [transform:rotateY(-20deg)_rotateX(10deg)_rotateZ(3deg)] dark:bg-surface-2'>
        <div className='flex items-center gap-1.5 px-2 pb-2 pt-1'>
          <span className='h-2.5 w-2.5 rounded-full bg-cream/30' />
          <span className='h-2.5 w-2.5 rounded-full bg-cream/30' />
          <span className='h-2.5 w-2.5 rounded-full bg-cream/30' />
          <span className='ml-3 h-4 flex-1 rounded-full bg-cream/10' />
        </div>
        <div className='relative aspect-[16/10] overflow-hidden rounded-md bg-surface'>
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes='(min-width: 768px) 40vw, 90vw'
            className={fit === 'contain' ? 'object-contain p-3' : 'object-cover object-top'}
          />
        </div>
      </div>

      {/* 앞쪽에 떠 있는 카드 */}
      <div className='absolute -bottom-10 -left-2 w-52 rounded-2xl bg-gold p-5 text-navy shadow-2xl [transform:rotateZ(-7deg)] md:-left-10 md:w-60'>
        <span aria-hidden className='block h-6 w-8 rounded-md bg-gold-light' />
        <p className='mt-6 text-lg font-bold leading-tight'>{cardTitle}</p>
        <p className='mt-2 text-xs font-semibold opacity-80'>{cardTags.join(' · ')}</p>
      </div>
    </div>
  );
}

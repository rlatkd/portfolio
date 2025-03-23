import Image from 'next/image';

type TopProps = {
  headerText?: string;
  headerImage?: string;
}

export function Top({ headerText, headerImage}: TopProps) {
  return (
    <div className='mb-20'>
      {headerText && <p className='text-5xl mb-20 '>{headerText}</p>}
      {headerImage && (
        <Image 
          src={headerImage} 
          alt={headerText || "Header image"}
          width={0}
          height={0}
          sizes="100vw"
          className='rounded-3xl w-full h-100'
          priority
        />
      )}
    </div>
  )
}
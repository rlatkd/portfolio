type TopProps = {
  headerText?: string;
  headerImage?: string;
}

export function Top({ headerText, headerImage}: TopProps) {
  return (
    <div className="mb-20">
      {headerText && <p className="text-5xl mb-20 ">{headerText}</p>}
      {headerImage && (
      <img src={headerImage} className="rounded-3xl w-full h-100" />
      )}
    </div>
  )
}

import { CustomMDX } from "app/components/mdx";
import { getEtcMdxs } from "app/utils/mdx";

export default function Page() {
  const about = getEtcMdxs().find((about) => about.metadata.summary === 'about')
  
  return (
      <article className="prose">
        <CustomMDX source={about.content} />
      </article>
  );
}
  
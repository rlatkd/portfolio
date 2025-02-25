"use client";

import { useEffect, useState } from "react";
import { CustomMDX } from "./components/custom-mdx";
import { Top } from "./components/top";
import { getEtcMdxs } from "./utils/mdx";

export default function Page() {

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // const about = getEtcMdxs().find((about) => about.metadata.summary === 'about')

  // if (!about) {
  //   return (
  //     <>
  //     </>
  //   )
  // }

  // TODO Interceptor로 라우팅 벗어나는거 막아야댐
  return (
    mounted && 
    <>
      <Top headerText="헤더문구 예정" headerImage="/static/images/header.jpg" />
      <section>
      <article className="prose">
        {/* <CustomMDX source={about.content} /> */}
      </article>
        <div className="my-8">
          {/* <BlogPosts /> */}
        </div>
      </section>
    </>
  )
}

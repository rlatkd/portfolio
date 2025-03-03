"use client";

import { Top } from "./components/top";

export default function Page() {

  return (
    <>
      <Top headerText="헤더문구 예정" headerImage="/static/images/header.jpg" />
      <section>
      <article className="prose">
      </article>
        <div className="my-8">
        </div>
      </section>
    </>
  )
}

import { Top } from "./components/top";

export default function Page() {
  return (
    <>
      <Top headerText="메인-안녕하세요 김상훈입니다" headerImage="/static/images/header.jpg" />
      <section>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          김상훈
        </h1>
        <p className="mb-4">
          {`테스트1`}
        </p>
        <div className="my-8">
          {/* <BlogPosts /> */}
        </div>
      </section>
    </>
  )
}

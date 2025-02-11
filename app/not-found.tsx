"use client";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen py-8 text-gray-900 page md:py-16">
      <div className="relative flex flex-col items-center w-full gap-8 px-8 md:px-18 xl:px-40 md:gap-16">
        <h1 className="text-9xl md:text-[300px] w-full select-none text-center font-black text-gray-400">
          404
        </h1>
        <p className="text-3xl font-bold capitalize">페이지를 찾을 수 없습니다.</p>
        <p className="text-2xl font-medium break-words text-dull">
          존재하지 않는 주소를 입력하셨거나
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
        <div className="flex flex-col justify-between w-full gap-8 md:flex-row md:gap-8 xl:px-16">
          <button
            onClick={() => window.history.back()} // 이전 페이지로 이동
            className="flex items-center justify-center w-full md:w-1/2 gap-4 p-3 font-semibold capitalize border-2 border-blue-500 rounded shadow-lg hover:bg-blue-500 md:p-6 focus:outline-none hover:scale-105 active:scale-90 hover:shadow-xl"
          >
            <span className="material-symbols-outlined">이전 페이지로</span>
          </button>
          <a
            href="/"
            className="flex items-center justify-center w-full md:w-1/2 gap-4 p-3 font-semibold capitalize border-2 border-green-500 rounded shadow-lg hover:bg-green-500 md:p-6 focus:outline-none hover:scale-105 active:scale-90 hover:shadow-xl"
          >
            <span className="material-symbols-outlined">홈으로</span>
          </a>
        </div>
      </div>
    </div>
  );
}

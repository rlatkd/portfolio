"use client";

import { useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  return (
    <>
      <footer className="flex flex-col mt-20 mb-20 border-t border-t-gray-200">
        <div className="flex flex-row gap-4 mt-20">
          <a
            className="flex items-center gap-1 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <img className="w-5 h-5 rounded dark:invert" src="static/images/rss.jpg"/>
          </a>
          <div className="flex items-center flex-row ml-auto gap-10">
            <a
              href="https://github.com/rlatkd"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://velog.io/@kata"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100 w-6 h-6"
            >
              <img className="rounded dark:invert" src="static/images/velog.jpg"/>
            </a>
            <a
              href="https://www.linkedin.com/in/sanghun-kim-689a03342/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            >
              <FaLinkedin className="w-7 h-7" />
            </a>
            <button
              onClick={() => openModal("저는 Facebook을 안 합니다.")}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            >
              <FaFacebook className="w-6 h-6" />
            </button>
            <button
              onClick={() => openModal("저는 Instagram을 안 합니다.")}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            >
              <FaInstagram className="w-7 h-7" />
            </button>
          </div>
        </div>
        <p className="mt-8 text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed cursor-default">
          주소 : 서울특별시 노원구 동일로 245길 162 (문의 :{" "}
          <a
            className="underline"
            href="mailto:rlatkdgns042@gmail.com"
          >
            rlatkdgns042@gmail.com
          </a>
          ) <br />
          © {new Date().getFullYear()}. kata All rights reserved.
        </p>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-neutral-900 dark:text-neutral-100 mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const ArrowIcon = () => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
};

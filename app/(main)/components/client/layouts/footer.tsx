"use client";

import { useRouter } from "next/navigation"; // navigation 모듈 주의
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const router = useRouter();

  return (
    <>
      <footer className="flex flex-col mt-20 mb-20 border-t border-t-gray-200">
        <div className="flex flex-row gap-4 mt-20">
          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed cursor-default">
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
          <div className="flex items-center flex-row ml-auto gap-10">
            <a
              className="flex items-center gap-1 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
            >
              <img className="w-5 h-5 rounded dark:invert" src="static/images/rss.jpg"/>
            </a>
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
              onClick={() => router.push('/404')}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            >
              <FaFacebook className="w-6 h-6" />
            </button>
            <button
              onClick={() => router.push('/404')}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            >
              <FaInstagram className="w-7 h-7" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

import React from "react";

export default function Pagination({
  first,
  last,
  prev,
  next,
  currentPage,
  count,
}: {
  first: string;
  last: string;
  prev: string;
  next: string;
  currentPage: number;
  count: number;
}) {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="inline-flex mt-2 xs:mt-0 w-full items-center justify-between text-[10px] font-normal text-gray-700 dark:text-gray-400">
          <div className="flex gap-4 md:gap-8">
            <button>First</button>
            <button className="flex items-center justify-center px-3 h-8  rounded-l">
              <svg
                className="w-3.5 h-2.5 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Back
            </button>
          </div>
          <span className="text-[10px] font-normal text-gray-700 dark:text-gray-400">
            <span className="font-normal  dark:text-white">1</span> -{"  "}
            <span className="font-normal  dark:text-white">
              {count}
            </span> of{" "}
            <span className="font-normal  dark:text-white">{count}</span>{" "}
          </span>
          <div className="flex gap-4 md:gap-8">
            <button className="flex items-center justify-center px-3 h-8 rounded-l">
              Next
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <button>Last</button>
          </div>
        </div>
      </div>
    </>
  );
}

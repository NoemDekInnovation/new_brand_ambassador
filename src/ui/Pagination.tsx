import React from "react";

export default function Pagination({
  totalPages,
  currentPage,

  pageSize,
  count,
  handlePageChange,
}: {
  totalPages: number;
  handlePageChange: (n: number) => void;
  pageSize: number;

  currentPage: number;
  count: number;
}) {
  const negativePage = pageSize - 1;
  const positivePage = pageSize + 1;

  console.log({ currentPage });

  return (
    <>
      <div className="flex flex-col items-center w-full md:max-w-[260px] md:ml-auto">
        <div className="inline-flex mt-2 sm:mt-0 w-full items-center justify-between text-[12px] font-normal text-gray-700 dark:text-gray-400">
          <div className="flex gap-4">
            {currentPage * pageSize - negativePage <= pageSize && (
              <button className="text-slate-400">First</button>
            )}
            {currentPage * pageSize - negativePage >= positivePage && (
              <button onClick={() => handlePageChange(1)}>First</button>
            )}
            {currentPage * pageSize - negativePage <= pageSize && (
              <button className="flex items-center justify-center text-slate-400 px-3 h-8  rounded-l">
                Back
              </button>
            )}
            {currentPage * pageSize - negativePage >= positivePage && (
              <button
                className="flex items-center justify-center px-3 h-8  rounded-l"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Back
              </button>
            )}
          </div>
          <span className="text-[10px] font-normal text-gray-700 dark:text-gray-400">
            <span className="font-normal  dark:text-white">
              {" "}
              {currentPage * pageSize - negativePage}
            </span>{" "}
            -{"  "}
            <span className="font-normal  dark:text-white">
              {currentPage * pageSize >= count ? count : currentPage * pageSize}{" "}
            </span>{" "}
            of <span className="font-normal  dark:text-white">{count}</span>{" "}
          </span>
          <div className="flex gap-4">
            {currentPage * pageSize < count && (
              <button
                className="flex items-center justify-center px-3 h-8 rounded-l"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            )}
            {currentPage * pageSize >= count && (
              <button className="flex items-center justify-center px-3 h-8 rounded-l text-slate-400">
                Next
              </button>
            )}
            {currentPage * pageSize < count && (
              <button onClick={() => handlePageChange(totalPages)}>Last</button>
            )}
            {currentPage * pageSize >= count && (
              <button className="text-slate-400">Last</button>
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
}

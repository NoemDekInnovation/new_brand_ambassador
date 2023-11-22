import { PiTagChevronFill } from "react-icons/pi";
import { HiOutlineChevronRight } from "react-icons/hi";

export default function ChevBackground({
  text,
  stage,
}: {
  text: string;
  stage: string;
}) {
  return (
    <div className="flex">
      <div className="relative flex p-0 m-0 text-white items-center h-[80px]">
        <div className="bg-bm_black h-[50px] px-10 flex items-center rounded-md">
          <p className="z-10 p-0 m-0">{text}</p>
          <p className="ml-3 text-[24px]">
            <span className="text-bm_card__orange">{stage}</span> {"  "}/{" "}
            {"   "}5
          </p>
        </div>
        <PiTagChevronFill className="text-bm_black font-bold text-[80px] absolute top-0 z-0 -right-8" />

        <HiOutlineChevronRight className="text-gray-200 font-bold text-[80px] absolute top-0 z-0 -right-[88px]" />
        <HiOutlineChevronRight className="text-gray-200 font-bold text-[80px] absolute top-0 z-0 -right-[104px]" />
        <HiOutlineChevronRight className="text-bm_black font-bold text-[80px] absolute top-0 z-0 -right-14" />
        <HiOutlineChevronRight className="text-gray-200 font-bold text-[80px] absolute top-0 z-0 -right-[72px]" />
      </div>
    </div>
  );
}

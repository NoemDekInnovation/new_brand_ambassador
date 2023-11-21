
import { AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import { Card } from "../../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Separator } from "../../ui/seperator";
import beauty from "../../assets/beauty.jpg"

export default function TalentCard() {
  return (
    <Card className="w-[260px] relative">
      <div className="relative">
        <div className="bg-bm__card absolute z-30 right-0 top-2 p-2 rounded-l-md flex gap-2">
          <AiOutlineHeart />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AiOutlineMore />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-3">
              <DropdownMenuItem className="hover:bg-black/10">
                Add to Project
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-bm__beige" />
              <DropdownMenuItem className="hover:bg-black/10">
                Share{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <img
          src={beauty}
          alt=""
          width={260}
          height={260}
          style={{ borderRadius: 5 }}
          className=" hover:grayscale-0 grayscale"
        />
      </div>
      <div className="flex items-center gap-3 whitespace-nowrap p-2">
        <p className="text-[15px] font-medium">Gloria Michael</p>
        <span className="text-[12px] font-normal">24 yrs. 51.Ikeja Lagos</span>
      </div>{" "}
      <div className="flex items-center gap-2 whitespace-nowrap p-1">
        <p className="text-[12px] font-normal border-r-2 pr-2">
          Nivea, Coca Cola, ...
        </p>
        <span className="text-[12px] font-normal">In-store, Open Market</span>
      </div>
      <Separator />
      <div className="flex items-center gap-2 whitespace-nowrap p-2">
        <div className="text-[15px] font-medium border-r-2 pr-2 ">
          <span className="text-bm_ox_red">97% {"  "}</span>
          Work Success
        </div>
        <div className="text-[15px] font-medium">
          <span className="text-bm_ox_red">4.5 {"  "}</span>
          Ratings
        </div>
      </div>
    </Card>
  );
}
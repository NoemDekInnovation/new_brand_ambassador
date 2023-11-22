import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Separator } from "../../ui/seperator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { HiOutlineArrowSmallRight } from "react-icons/hi2"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { AiOutlineMore } from "react-icons/ai"
import { DropdownMenuItem, DropdownMenuSeparator } from "../../ui/dropdown-menu"
import drago from "../../assets/drago.jpg"

export function TopProjectCard({
    card_title,
    card_width
}: {
    card_width?: string;
    card_title: string
}) {
    return (
        <Card className={`p-2 md:p-4 bg-white w-[240px] ${card_width}`}>
            <CardHeader className="flex-row p-1 justify-between items-center">
                <div className="flex space-x-3">
                    <CardTitle className="">
                        <p className="font-medium text-[15px]">{card_title}</p>
                    </CardTitle>
                </div>
                <div className="flex gap-4 text-bm_black/75 text-[14px]">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <AiOutlineMore />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white p-3">
                            <DropdownMenuItem className="hover:bg-black/10">Relevance</DropdownMenuItem>
                            <DropdownMenuSeparator className=" bg-bm__beige" />
                            <DropdownMenuItem className="hover:bg-black/10">Favorites{" "}</DropdownMenuItem>
                            <DropdownMenuSeparator className=" bg-bm__beige" />
                            <DropdownMenuItem className="hover:bg-black/10">Top rated</DropdownMenuItem>
                            <DropdownMenuSeparator className=" bg-bm__beige" />
                            <DropdownMenuItem className="hover:bg-black/10">Top paying</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <Separator className="my-2 bg-bm__beige" />

            <div>
        {[1, 2, 3].map((_, idx) => {
          return (
            <div className="" key={idx}>
              <CardContent className="p-0 space-y-1">
                <div className="flex ">
                  <div className="flex">
                    <img src={drago} alt="" width={18} height={18} />
                    <p className="border-r px-1 text-[11px] whitespace-nowrap text-[#252525]">
                      Cool Ltd.
                    </p>
                  </div>
                  <p className="border-r px-1 text-[11px] whitespace-nowrap">
                    5k per week
                  </p>
                  <p className="text-bm__niv text-[10px] font-medium pl-1">
                    Current
                  </p>
                  {/* <p className="text-bm__niv text-[10px] ">Complelted</p> */}
                </div>
                <div className="flex space-x-2">
                  <h3 className="font-medium text-[15px] ">Project Name</h3>
                </div>
                <p className="font-normal text-[13px]">
                  This is the project description.{" "}
                </p>
                <p className="font-medium text-[13px] text-[#800000]">
                  3oo Applications{" "}
                </p>
                <div className="flex space-x-2 text-[12px]">
                  <p>Lagos, Abuja</p>{" "}
                </div>
              </CardContent>
              {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
            </div>
          );
        })}
      </div>

      <Separator className="my-2" />
      <CardFooter className="mt-3 p-0 gap-6  flex justify-center text-[10px] w-full">
        <Link to={""} className="flex items-center space-x-2">
          <p>See all applications</p> <HiOutlineArrowSmallRight />
        </Link>
      </CardFooter>
        </Card>
    )
}


const ListCard = ({card_title, card_width}: {
    card_title: string,
    card_width?: string
}) => {
  return (
    <Card className={`p-2 md:p-4 bg-white  w-[240px] ${card_width}`}>
      <CardHeader className="flex-row p-1 justify-between items-center">
        <div className="flex space-x-3">
          <CardTitle className="">
            <p className="font-medium text-[15px] ">My Projects</p>
          </CardTitle>
        </div>
      </CardHeader>
      <Separator className="my-2 bg-bm__beige" />
      <Tabs defaultValue="posted" className="mb-0">
        <TabsList className="p-0 justify-start gap-4 flex">
          <TabsTrigger className="px-0" value="posted">
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Current</p>
              <span className="bg-bm__niv text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                5
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger className="px-0" value="posted">
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Published</p>
              <span className="bg-bm_card__orange text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                3
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger className="px-0" value="posted">
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Completed</p>
              <span className="bg-bm_black text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                25
              </span>
            </div>
          </TabsTrigger>
        </TabsList>
        <Separator className="my-2" />
        <TabsContent value="posted">
          {[1, 2, 3].map((_, idx) => {
            return (
              <div className="" key={idx}>
                <CardContent className="p-0 space-y-1">
                  <div className="flex space-x-2">
                    <h3 className="font-medium text-[12px] border-r pr-2">
                      Project Name
                    </h3>
                    <p className="text-bm_card__orange text-[12px] font-medium">
                      Published
                    </p>
                  </div>
                  <p className="font-normal text-[8px] leading-3">
                    This is the project description.{" "}
                  </p>
                  <p className="font-medium text-[13px] text-bm__ox__red">
                    3oo Applications{" "}
                  </p>
                  <div className="flex space-x-2 text-[8px] font-light leading-3">
                    <p>Lagos, Abuja, Ogun, Pleteau</p>{" "}
                  </div>
                </CardContent>
                {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
              </div>
            );
          })}
        </TabsContent>
        <TabsContent value="pending">Pending</TabsContent>
        <TabsContent value="reject">Rejected</TabsContent>
      </Tabs>
      <Separator className="my-2" />
      <CardFooter className="mt-3 p-0 gap-6  flex justify-center text-[10px] w-full">
        <Link to={""} className="flex items-center space-x-2">
          <p
            className="font-medium text-[10px] text-[#252525]/70"
          >
            See all projects
          </p>{" "}
          <HiOutlineArrowSmallRight />
        </Link>
      </CardFooter>
          
    </Card>
  );
}

export default ListCard
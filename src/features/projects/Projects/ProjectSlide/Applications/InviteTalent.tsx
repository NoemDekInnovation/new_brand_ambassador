import React, { useCallback, useEffect, useState } from "react";
import { Card } from "../../../../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../ui/dropdown-menu";
import { BiSortAlt2 } from "react-icons/bi";
import Pagination from "../../../../../ui/Pagination";
// import PublishedProject from "../PublishedProject";
import { AiOutlineSearch } from "react-icons/ai";
import PublishedProject from "../../ProjectTabs/PublishedProject";
import { Checkbox } from "../../../../../ui/checkbox";
import { TalentList } from "../../../../../components/newAgency/Talentlist";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../ui/select";
import { BsGrid } from "react-icons/bs";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import _debounce from "lodash.debounce";
import {
  fetchTalents,
  setTalentQuery,
} from "../../../../../redux/revmap/talent.slice";
import { TalentQueryProp } from "../../../../../redux/talent.slice";

const InviteTalent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [modal, setModal] = useState(false);
  const [sortQuery, setSortQuery] = useState<TalentQueryProp | null>({
    // projectId: projectId,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const {
    talents: resTalents,
    totalPages,
    totalTalent,
    page,
    talentQuery,
    pageSize: resPageSize,
  } = useSelector((state: RootState) => state.newtalent);

  const updateQuery = (newValues: any) => {
    setSortQuery((prevQuery: any) => ({ ...prevQuery, ...newValues }));
  };

  const handlePageSizeChange = useCallback((size: number) => {
    updateQuery({ pageSize: size });
    // Update query or fetch data for the new page size
  }, []);

  const handlePageChange = useCallback((page: any) => {
    updateQuery({ page: page });
  }, []);

  const handleSearchChange = useCallback((e: any) => {
    updateQuery({ search: e.target.value });
    setSearchQuery(e.target.value);
  }, []);

  const debouncedTetchTalents = useCallback(
    _debounce((talentQuery: any | null) => {
      console.log("only", { talentQuery });

      dispatch(fetchTalents(talentQuery));
    }, 300), // Adjust debounce delay as needed
    [dispatch]
  );

  useEffect(() => {
    dispatch(setTalentQuery(sortQuery));
  }, [sortQuery]);

  // console.log({ talentQuery });

  useEffect(() => {
    debouncedTetchTalents(talentQuery);
    return debouncedTetchTalents.cancel; // Cleanup debounce on component unmount
  }, [debouncedTetchTalents, talentQuery]);

  return (
    <>
      <div className="relative w-full gap-4 flex flex-col">
        <Card className="bg-white h-full  p-0 flex flex-col w-full">
          <div className="border-y ">
            <div className="flex flex-col md:flex-row gap-3 bg-bm_card_grey p-4 w-full justify-between">
              <div className=" md:max-w-[520px] w-full whitespace-nowrap gap-4 flex md:flex-1 ">
                <Select>
                  <SelectTrigger className="w-full bg-white text-[12px]">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent className="z-[2500] bg-white text-[12px]">
                    <SelectGroup>
                      <SelectItem value="invite">Invite all</SelectItem>
                      <SelectItem value="add-to-favorites">
                        Add to favorites
                      </SelectItem>
                      <SelectItem value="export">Export(Excel)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full bg-white text-[12px]">
                    <SelectValue placeholder="Invited Talent" />
                  </SelectTrigger>
                  <SelectContent className="z-[2500] bg-white text-[12px]">
                    <SelectGroup className="text-[12px]">
                      <SelectItem value="invited-talent">
                        Invited Talent
                      </SelectItem>
                      <SelectItem value="all-talent">All Talent</SelectItem>{" "}
                      <SelectItem value="favorites">Favorites</SelectItem>
                      <SelectItem value="my-talent">My Talent</SelectItem>{" "}
                      <SelectItem value="current-contracts">
                        Current Contracts{" "}
                      </SelectItem>
                      <SelectItem value="engaged-talent">
                        Engaged Talent
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <div className="px-3 bg-white flex items-center w-full  max-w-[600px]  rounded-md ml-auto">
                  <AiOutlineSearch />
                  <input
                    type="search"
                    placeholder="Search filter (Name,age, location and skills)"
                    className="w-full bg-transparent outline-none text-[12px] p-2"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center text-[#808080]">
              <div className="flex items-center gap-3 md:px-4 py-3 px-2 text-[12px] font-normal">
                <Checkbox />
                <p className="whitespace-nowrap">Select all</p>
              </div>
              <div className="flex flex-col md:flex-row w-full items-center md:justify-end md:gap-8 md:px-4">
                <div className="flex justify-between md:justify-end px-2 gap-2 md:gap-8 md:h-full w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex gap-1 items-center">
                      <BiSortAlt2 />
                      <div className="flex text-[12px] font-normal text-{#252525]">
                        Sort by: {"  "}{" "}
                        <span className="text-black ml-1">Relevance </span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white p-3 z-[2500] text-[#252525]">
                      <DropdownMenuItem className="hover:bg-black/10  text-[12px]">
                        Relevance
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-bm__beige" />
                      <DropdownMenuItem className="hover:bg-black/10  text-[12px]">
                        Rating(Low-High)
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-bm__beige" />
                      <DropdownMenuItem className="hover:bg-black/10  text-[12px]">
                        Rating(High-Low)
                      </DropdownMenuItem>{" "}
                      <DropdownMenuSeparator className="bg-bm__beige" />
                      <DropdownMenuItem className="hover:bg-black/10  text-[12px]">
                        Rating(Young-Old)
                      </DropdownMenuItem>{" "}
                      <DropdownMenuSeparator className="bg-bm__beige" />
                      <DropdownMenuItem className="hover:bg-black/10  text-[12px]">
                        Rating(Old-Young)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex gap-2 text-[12px] font-normal items-center">
                    View:
                    <div className="border rounded p-1 border-[#808080]">
                      <BsGrid />
                    </div>
                  </div>
                </div>
                <div className="max-w-[400px] md: md:min-w-[300px]">
                  <Pagination
                    count={totalTalent}
                    currentPage={page}
                    handlePageChange={handlePageChange}
                    pageSize={resPageSize}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 py-6  overflow-auto h-[50vh] flex flex-col gap-4 w-full overflow-x-scroll">
            {resTalents.map((talent, idx: number) => {
              return (
                <>
                  <TalentList
                    talent={talent}
                    key={idx}
                    index={0}
                    handleProfilePopUp={() => {}}
                    setSelectedTalentID={() => {}}
                    handleCheckedChange={() => {}}
                    setModal={setModal}
                    modal={modal}
                    checkInvite={true}
                    inviteStatus="invite"
                  />
                </>
              );
            })}
          </div>
          <div className="flex w-full bg-bm_card_grey items-center justify-between md:gap-6 md:px-4 py-3 flex-col md:flex-row gap-2">
            <div className="flex items-center">
              <p className=" whitespace-nowrap  mr-2 text-[10px]">
                Rows Per Page:
              </p>
              <div className="flex items-center gap-3">
                {[10, 20, 30, 40, 50].map((n, idx) => {
                  return (
                    <div
                      className={`hover:bg-gray-300 text-[10px]  ${
                        resPageSize === n ? "bg-gray-300" : ""
                      } rounded p-2 transition-all duration-400 cursor-pointer`}
                      key={idx}
                      onClick={() => handlePageSizeChange(n)}
                    >
                      {n}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="max-w-[400px]">
              <Pagination
                count={totalTalent}
                currentPage={page}
                handlePageChange={handlePageChange}
                pageSize={resPageSize}
                totalPages={totalPages}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default InviteTalent;

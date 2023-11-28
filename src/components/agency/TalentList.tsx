import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "@radix-ui/react-separator";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type TalentType =
  | "All Talents"
  | "Current Contacts"
  | "Favorites"
  | "Engaged"
  | "My Talents";

type TalentTypeProps = {
  name: TalentType;
  count: number;
  onClick: (name: TalentType) => void;
};

type TalentListProps = {
  onTalentTypeChnage: (type: TalentType) => void;
  talentCount: Record<TalentType, number>;
};

const TalentType: React.FC<TalentTypeProps> = ({ name, count, onClick }) => {
  return (
    <div className="flex justify-between" onClick={() => onClick(name)}>
      <div className="flex items-center">
        <p>{name}</p>
      </div>
      <div className="text-white bg-bm__ox__red px-2 rounded-sm">{count}</div>
    </div>
  );
};

const TalentList: React.FC<TalentListProps> = ({
  onTalentTypeChnage,
  talentCount,
}) => {
  const {
    count,
    error: resErrror,
    loading,
    talents: resTalents,
  } = useSelector((state: RootState) => state.talent);

  const handleTalentTypeClick = (
    type:
      | "All Talents"
      | "Current Contacts"
      | "Favorites"
      | "Engaged"
      | "My Talents"
  ) => {
    onTalentTypeChnage(type);
  };

  return (
    <Card>
      <CardContent className="py-3 md:py-6 space-y-3 cursor-pointer">
        <div className="hover:bg-black/10 transform hover:scale-105 ">
          {/* <p> All Talents</p> */}
          <TalentType
            name="All Talents"
            count={talentCount["All Talents"]}
            onClick={handleTalentTypeClick}
          />
        </div>
        <Separator className="bg-bm__beige shrink-0 h-[1px] w-full" />
        <div className="hover:bg-black/10 transform hover:scale-105 ">
          {/* <p>Current Contacts</p>{' '}
                      <span className='bg-bm__ox__red text-white px-2'>
                          {resTalents?.length}
                      </span> */}
          <TalentType
            name="Current Contacts"
            count={talentCount["Current Contacts"]}
            onClick={handleTalentTypeClick}
          />
        </div>
        <Separator className="bg-bm__beige shrink-0 h-[1px] w-full" />
        <div className=" hover:bg-black/10 transform hover:scale-105 cursor-pointer">
          {/* <p> Favorites</p> */}
          <TalentType
            name="Favorites"
            count={talentCount["Favorites"]}
            onClick={handleTalentTypeClick}
          />
        </div>
        <Separator className="bg-bm__beige shrink-0 h-[1px] w-full" />
        <div className="hover:bg-black/10 transform hover:scale-105 cursor-pointer">
          {/* <p>Engaged</p> */}
          <TalentType
            name="Engaged"
            count={talentCount["Engaged"]}
            onClick={handleTalentTypeClick}
          />
        </div>
        <Separator className="bg-bm__beige  shrink-0 h-[1px] w-full" />
        <div className="hover:bg-black/10 transform hover:scale-105 cursor-pointer">
          {/* <p>My Talents</p> */}
          <TalentType
            name="My Talents"
            count={talentCount["My Talents"]}
            onClick={handleTalentTypeClick}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentList;

{
  /* <CardContent className="p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[280px] max-h-[210px] border rounded-[6px]">
  <div className="hover:bg-black/10 transform hover:scale-105 cursor-pointer">
    <p className="text-[#252525B2] text-[14px] font-normal p-3 mr-3">
      All Talents
    </p>
    <Separator className="bg-[#D7D8DA]" />
  </div>

  <div className="flex justify-between hover:bg-black/10 transform hover:scale-105 cursor-pointer">
    <div className=" flex items-center gap-10 ">
      <p className="text-[#252525B2] text-[14px] font-normal p-3">
        Current Contacts
      </p>

      <p className="text-white bg-bm__ox__red px-2 rounded-sm "></p>
    </div>
  </div>
  <Separator className="bg-[#D7D8DA]" />

  <div className=" hover:bg-black/10 transform hover:scale-105 cursor-pointer">
    <p className="text-[#252525B2] text-[14px] font-normal p-3 mr-3">
      Favorites
    </p>
  </div>
  <Separator className="bg-[#D7D8DA]" />

  <div className=" hover:bg-black/10 transform hover:scale-105 cursor-pointer">
    <p className="text-[#252525B2] text-[14px] font-normal p-3 mr-3">
      Engaged
    </p>
  </div>
</CardContent> */
}

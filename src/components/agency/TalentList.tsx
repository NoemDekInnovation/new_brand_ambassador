import React, { useEffect, useState } from "react";
import { CardContent } from "../../ui/card";
import { Separator } from "@radix-ui/react-separator";

type TalentType =
  | "All Talent"
  | "Current Contracts"
  | "Favorites"
  | "Engaged"
  | "My Talent";

type TalentTypeProps = {
  name: TalentType;
  count: number;
  onClick: (name: TalentType) => void;
  isActive: boolean;
};

type TalentListProps = {
  onTalentTypeChnage: (type: TalentType) => void;
  talentCount: any;
  activeTalentClick: any;
  setActiveTalentClick: any;
  // talentCount: Record<TalentType, number>;
};

const TalentType: React.FC<TalentTypeProps> = ({
  name,
  count,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`flex justify-between p-4 ${isActive ? "bg-black/10" : ""}`}
      onClick={() => onClick(name)}
    >
      <div className="flex items-center">
        <p>{name}</p>
      </div>
      <div className="text-white bg-bm__ox__red px-2 rounded-sm">{count}</div>
    </div>
  );
};

const TalentList: React.FC<TalentListProps> = ({
  onTalentTypeChnage,
  setActiveTalentClick,
  activeTalentClick,
  talentCount,
}) => {
  const [activeTalentType, setActiveTalentType] = useState<TalentType | null>(
    null
  );

  // const [activeTalentClick, setActiveTalentClick] = useState<boolean | null>(
  //   false
  // );

  useEffect(() => {
    setTimeout(() => {
      const storedDefaultTalent: any = localStorage.getItem("defaultTalent");

      if (!activeTalentClick) {
        if (storedDefaultTalent) {
          return setActiveTalentType(storedDefaultTalent);
        }
        return setActiveTalentType("All Talent");
      }
    }, 1000);
  }, [activeTalentClick]);

  const handleTalentTypeClick = (
    type:
      | "All Talent"
      | "Current Contracts"
      | "Favorites"
      | "Engaged"
      | "My Talent"
  ) => {
    setActiveTalentClick(true);
    onTalentTypeChnage(type);
    setActiveTalentType(type);
  };

  return (
    // <Card>
    <CardContent className="p-1 flex flex-col justify-center gap-1 border rounded-[6px]">
      <div className="gap-4 hover:bg-black/10 cursor-pointer ">
        {/* <p> All Talent</p> */}
        <TalentType
          name="All Talent"
          count={talentCount["All Talent"]}
          onClick={handleTalentTypeClick}
          isActive={activeTalentType === "All Talent"}
        />
      </div>
      <Separator className="bg-bm__beige shrink-0 h-[1px] w-full" />
      <div className="gap-4 hover:bg-black/10 cursor-pointer">
        {/* <p>Current Contracts</p>{' '}
                      <span className='bg-bm__ox__red text-white px-2'>
                          {resTalents?.length}
                      </span> */}
        <TalentType
          name="Current Contracts"
          count={talentCount["Current Contracts"]}
          onClick={handleTalentTypeClick}
          isActive={activeTalentType === "Current Contracts"}
        />
      </div>
      <Separator className="bg-bm__beige shrink-0 h-[1px] w-full" />
      <div className=" gap-4 hover:bg-black/10 cursor-pointer">
        {/* <p> Favorites</p> */}
        <TalentType
          name="Favorites"
          count={talentCount["Favorites"]}
          onClick={handleTalentTypeClick}
          isActive={activeTalentType === "Favorites"}
        />
      </div>
      <Separator className="bg-bm__beige shrink-0 h-[1px] w-full" />
      <div className="gap-4 hover:bg-black/10 cursor-pointer">
        {/* <p>Engaged</p> */}
        <TalentType
          name="Engaged"
          count={talentCount["Engaged"]}
          onClick={handleTalentTypeClick}
          isActive={activeTalentType === "Engaged"}
        />
      </div>
      <Separator className="bg-bm__beige  shrink-0 h-[1px] w-full" />
      <div className="gap-4 hover:bg-black/10 cursor-pointer">
        {/* <p>My Talent</p> */}
        <TalentType
          name="My Talent"
          count={talentCount["My Talent"]}
          onClick={handleTalentTypeClick}
          isActive={activeTalentType === "My Talent"}
        />
      </div>
    </CardContent>
    //</Card>
  );
};

export default TalentList;

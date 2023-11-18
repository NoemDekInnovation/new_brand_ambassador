import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import TalentTab from "./TalentTab";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../ui/dropdown-menu"
  import arrowIcon from "../../assets/Vector.png";
  

const DropdownAgency = () => {
  return (
    <Tabs>
      <TabsList>

      <DropdownMenu>
  <DropdownMenuTrigger>
  <TabsTrigger value="talent">Talent</TabsTrigger>
  <img src={arrowIcon} alt="arrowicon" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      </TabsList>
      <TabsContent className="w-full" value="talent">
          <TalentTab />
        </TabsContent>
    </Tabs>
  );
};

export default DropdownAgency;

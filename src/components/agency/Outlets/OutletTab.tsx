import React, { useEffect, useState } from "react";
import { OutletTable } from "./OutletTable";
import useSWR from "swr";
import { fetcher } from "../../../api/axios";
import { AddOutletDialog } from "./AddOutlet";
import DeleteOutlet from "./DeleteOutlet";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAgencyOutlet } from "../../../redux/agencyOutlet.slice";
import { UpdateOutletDialog } from "./UpdateOutlet";
import { ManagePictures } from "./ManagePictures";
import { OutletOverview } from "./OutletOverview";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { TrainingTable } from "./TrainTable";
import { cn } from "../../../libs/clsx";
import { AddTrainDialog } from "./AddTraining";

const OutletTab = () => {
  const { outlet, pageSize, page, totalTalent } = useSelector(
    (state: RootState) => state.agencyOutlet
  );
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAgencyOutlet());
  }, [dispatch]);

  return (
    <>
      <div className=" bg-bm_card_greym bg-white h-full overflow-y-scroll md:w-[1950px] xl:w-full w-full">
        <div className="px-4 md:px-12 xl:px-40 flex pt-10 pb-2 h-full  md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
          <div className="h-full space-y-8 flex-1 flex flex-col items-center sm:block">
            <div className="my-4">
              <h4 className="text-xl sm:text-2xl font-medium">
                Outlets & Training Centers
              </h4>
            </div>
            <Tabs defaultValue="account" className="w-full h-full">
              <TabsList>
                <TabsTrigger
                  value="account"
                  onClick={() => setIndex(0)}
                  className={cn(
                    "data-[state=active]:border-b-red-900 text-base",
                    index === 0 && "border-b-red-900  bg-[#F7F7F7] border-b-2"
                  )}
                >
                  Outlet
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  onClick={() => setIndex(1)}
                  className={cn(
                    "data-[state=active]:border-b-red-900 text-base",
                    index === 1 && "border-b-red-900 bg-[#F7F7F7]  border-b-2"
                  )}
                >
                  Training Centers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <OutletTable
                  data={outlet}
                  pageSize={pageSize}
                  page={page}
                  totalTalent={totalTalent}
                />{" "}
              </TabsContent>
              <TabsContent value="password">
                <TrainingTable
                  data={outlet}
                  pageSize={pageSize}
                  page={page}
                  totalTalent={totalTalent}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <AddOutletDialog />
      <DeleteOutlet />
      <UpdateOutletDialog />
      <ManagePictures />
      <OutletOverview />
      <AddTrainDialog />
    </>
  );
};

export default OutletTab;

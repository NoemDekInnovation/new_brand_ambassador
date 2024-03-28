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
import { fetchAgencyCenters } from "../../../redux/agencyCenter.slice";
import DeleteCenter from "./DeleteCenter";
import { ManagePicturesCenter } from "./ManagePicturesCenter";
import { UpdateTrainDialog } from "./UpdateTraining";
import MakePrivate from "./MakePrivate";
import MakePublic from "./MakePublic";
import MakePublicOutlet from "./MakePublicOutlet";
import MakePrivateOutlet from "./MakePrivateOutlet";
import { CenterOverview } from "./CenterOverview";

const OutletTab = () => {
  const { outlet, pageSize, page, totalTalent } = useSelector(
    (state: RootState) => state.agencyOutlet
  );

  const agencyCenter = useSelector((state: RootState) => state.agencyCenter);
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAgencyOutlet());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAgencyCenters());
  }, [dispatch]);

  console.log(agencyCenter.center);

  return (
    <>
      <div className=" bg-bm_card_greym bg-white h-full overflow-y-scroll md:w-[1950px] xl:w-full w-full">
        <div className="px-4 md:px-12 xl:px-40 flex pt-6 pb-2 h-full  md:space-x-8 flex-col items-center space-y-4 md:flex-row md:space-y-0 md:items-start">
          <div className="h-full space-y-4 flex-1 flex flex-col items-center sm:block">
            <div className="my-2">
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
                  data={agencyCenter.center || []}
                  pageSize={agencyCenter.pageSize}
                  page={agencyCenter.page}
                  totalTalent={agencyCenter.totalTalent}
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
      <DeleteCenter />
      <ManagePicturesCenter />
      <UpdateTrainDialog />
      <MakePrivate />
      <MakePublic />
      <MakePublicOutlet />
      <MakePrivateOutlet />
      <CenterOverview />
    </>
  );
};

export default OutletTab;

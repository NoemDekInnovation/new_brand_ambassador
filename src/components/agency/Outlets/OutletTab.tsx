import React, { useEffect } from "react";
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

const OutletTab = () => {
  const { outlet } = useSelector((state: RootState) => state.agencyOutlet);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAgencyOutlet());
  }, [dispatch]);

  return (
    <div>
      <div className=" bg-bm_card_greym bg-white h-full overflow-y-scroll md:w-[1950px] xl:w-full w-full">
        <div className="px-4 md:px-12 xl:px-40 flex pt-10 pb-2  md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
          <div className=" space-y-8 flex-1 flex flex-col items-center sm:block">
            <OutletTable data={outlet} />
          </div>
        </div>
      </div>
      <AddOutletDialog />
      <DeleteOutlet />
      <UpdateOutletDialog />
      <ManagePictures />
      <OutletOverview />
    </div>
  );
};

export default OutletTab;

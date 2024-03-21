import React, { useEffect } from "react";
import { UsersTable } from "./UserTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgencyUsers } from "../../redux/agencyUser.slice";
import { AppDispatch, RootState } from "../../redux/store";
import UpdateUser from "./UpdateUser";
import ResetUser from "./ResetUser";
import SuspendUser from "./SuspendUser";
import DeleteUser from "./DeleteUser";
import { CreateUserDialog } from "./CreateUser";
import UnsuspendUser from "./UnsuspendUser";

const UsersTab = () => {
  const { staff } = useSelector((state: RootState) => state.agencyUser);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAgencyUsers());
  }, [dispatch]);

  console.log(staff);

  return (
    <div className=" bg-bm_card_greym bg-white h-full overflow-y-scroll md:w-[1950px] xl:w-full w-full">
      <div className="px-4 md:px-12 xl:px-40 flex pt-10 pb-2  md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
        <div className=" space-y-8 flex-1 flex flex-col items-center sm:block">
          <UsersTable data={staff} />
        </div>
      </div>
      <CreateUserDialog />
      <UpdateUser />
      <ResetUser />
      <SuspendUser />
      <DeleteUser />
      <UnsuspendUser />
    </div>
  );
};

export default UsersTab;

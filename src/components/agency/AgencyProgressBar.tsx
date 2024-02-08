import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { BiSolidUserDetail } from "react-icons/bi";

const AgencyProgressBar = () => {
  const { agencyProfile } = useSelector((state: RootState) => state.talent);
  const [progressCount, setProgressCount] = useState(0);

  console.log(agencyProfile);

  useEffect(() => {
    let count = 0;

    // Function to count non-empty fields
    const countNonEmptyFields = (fields: any[]) => {
      return fields.filter((field) => field !== "").length;
    };

    // Count fields in the agencyProfile object
    count += countNonEmptyFields([
      agencyProfile.agencyName,
      agencyProfile.agencyType,
      agencyProfile.alternatePhone,
      agencyProfile.companyLogo,
      agencyProfile.email,
      agencyProfile.firstName,
      agencyProfile.lastName,
      agencyProfile.officePhone,
      agencyProfile.phone,
      agencyProfile.languages,
      agencyProfile.summary,
      agencyProfile.profilePic,
      agencyProfile?.address?.[0]?.street,
      agencyProfile?.address?.[0]?.city,
      agencyProfile?.address?.[0]?.LGA,
      agencyProfile?.address?.[0]?.state,
      agencyProfile?.address?.[0]?.zipCode,
    ]);

    // Update the progressCount
    setProgressCount(count);
  }, [agencyProfile]);
  console.log(progressCount);

  const percentage = Math.floor((progressCount / 17) * 100);

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-black w-fit rounded-[5px] px-1 text-[18px]">
            <BiSolidUserDetail className="text-white w-fit" />
          </div>
          <p className="text-[16px] font-bold">Profile</p>
          <p className="ml-20 bg-bm__ox__red px-2 text-white rounded-md">
            {percentage}%
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700  my-2 mb-7">
        <div
          className="bg-bm__ox__red h-1.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </>
  );
};

export default AgencyProgressBar;

import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { BiSolidUserDetail } from "react-icons/bi";

const ProgressBar = () => {
  const { talentData } = useSelector((state: RootState) => state.talent);
  const [progressCount, setProgressCount] = useState(0);

  useEffect(() => {
    let count = 0;

    // Function to count non-empty fields
    const countNonEmptyFields = (fields: any[]) => {
      return fields.filter((field) => field !== "").length;
    };

    // Count fields in the talentData object
    count += countNonEmptyFields([
      talentData.firstName,
      talentData.lastName,
      talentData.middleName,
      talentData.email,
      talentData.phone,
      talentData.gender,
      talentData.alternatePhone,
      talentData.DOB,
      talentData.origin,
      talentData.nationality,
      talentData.height,
      talentData.skinColor,
      talentData.dressSize,
      talentData.languages,
      talentData.summary,
      talentData.profilePic,
      talentData?.address?.[0]?.street,
      talentData?.address?.[0]?.city,
      talentData?.address?.[0]?.LGA,
      talentData?.address?.[0]?.state,
      talentData?.address?.[0]?.zipCode,
      talentData.socials,
      talentData.opportunities,
    ]);

    // Check and count array fields
    if (
      talentData.experience &&
      Array.isArray(talentData.experience) &&
      talentData.experience.length > 0
    ) {
      count += 1; // Increment count if there's at least one item
    }

    if (
      talentData.education &&
      Array.isArray(talentData.education) &&
      talentData.education.length > 0
    ) {
      count += 1;
    }

    if (
      talentData.certifications &&
      Array.isArray(talentData.certifications) &&
      talentData.certifications.length > 0
    ) {
      count += 1;
    }

    if (
      talentData.skills &&
      Array.isArray(talentData.skills) &&
      talentData.skills.length > 0
    ) {
      count += 1;
    }

    // Update the progressCount
    setProgressCount(count);
  }, [talentData]);
  console.log(progressCount);

  const percentage = Math.floor((progressCount / 27) * 100);

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

export default ProgressBar;

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { campaignAuthAxiosInstance } from "../api/axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";

const HeartIcon = ({ selectedTalentID }: { selectedTalentID: any }) => {
  const user = useSelector((state: RootState) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedLikedStatus = localStorage.getItem(`liked_${selectedTalentID}`);
    setIsFavorite(storedLikedStatus === "true");
  }, [selectedTalentID]);

  const addFavorites = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/add-favorites/${selectedTalentID}?toFavorite={}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        localStorage.setItem(`liked_${selectedTalentID}`, "true");
        return response?.data;
      } catch (error: any) {
        console.error("Error submitting form:", error);
        console.error("Error response:", error.response); // Log the response for more details
      }
    }
  };

  const removeFavorites = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/remove-favorites/${selectedTalentID}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        localStorage.setItem(`liked_${selectedTalentID}`, "false");

        return response?.data;
      } catch (error: any) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleHeartClick = async () => {
    try {
      if (isFavorite) {
        // Talent is already a favorite, so remove it
        await removeFavorites();
      } else {
        // Talent is not a favorite, so add it
        await addFavorites();
      }

      // Toggle the favorite state
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };

  return (
    <div onClick={handleHeartClick} className=" cursor-pointer">
      {/* <AiFillHeart /> */}
      {isFavorite ? (
        <AiFillHeart className="text-yellow-500" />
      ) : (
        <AiOutlineHeart />
      )}
    </div>
  );
};

export default HeartIcon;

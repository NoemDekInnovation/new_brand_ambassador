import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { campaignAuthAxiosInstance } from "../api/axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import {
  fetchFavouriteProjects,
  filterFavorite,
} from "../redux/favourite.slice";

const HeartIcon = ({
  selectedTalentID,
  favorites,
}: {
  favorites: any;
  selectedTalentID: any;
}) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);

  console.log(user?.user?.userId, favorites);

  useEffect(() => {
    const tobi = user?.user?.userId;

    const todo = favorites;

    const matchingObject = todo.find((item: any) => item.favedBy === tobi);

    if (matchingObject) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
    // dispatch(fetchFavouriteProjects(null));
  }, [selectedTalentID]);

  const addFavorites = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/add-favorites/${selectedTalentID}?toFavorite=${isFavorite}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        setIsFavorite((prev) => !prev);

        dispatch(filterFavorite(response?.data?.detail?.talent));

        return response?.data;
      } catch (error: any) {
        console.error("Error submitting form:", error);
        console.error("Error response:", error.response); // Log the response for more details
      }
    }
  };

  // const handleHeartClick = async () => {
  //   try {
  //     if (isFavorite) {
  //       // Talent is already a favorite, so remove it
  //       await removeFavorites();
  //     } else {
  //       // Talent is not a favorite, so add it
  //       await addFavorites();
  //     }

  //     // Toggle the favorite state
  //     setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // Handle errors
  //   }
  // };

  return (
    <div onClick={addFavorites} className=" cursor-pointer">
      {isFavorite ? (
        <AiOutlineHeart />
      ) : (
        <AiFillHeart className="text-yellow-500" />
      )}
    </div>
  );
};

export default HeartIcon;

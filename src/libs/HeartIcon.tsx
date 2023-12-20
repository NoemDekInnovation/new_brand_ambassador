// Import necessary modules and components
import React, { useCallback } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { addFavorites, removeFavorites } from '../redux/like.slice';


interface HeartIconProps {
  talentId: string; // Assuming talentId is the unique identifier for the talent
}

const HeartIcon: React.FC<HeartIconProps> = ({ talentId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.like);
  const isFavorite = data?.some((item: any) => item.id === talentId);

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      // If already a favorite, remove from favorites
      dispatch(removeFavorites());
    } else {
      // If not a favorite, add to favorites
      dispatch(addFavorites());
    }
  }, [dispatch, isFavorite, talentId]);

  return (
    <div onClick={handleToggleFavorite} className="cursor-pointer">
      {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
    </div>
  );
};

export default HeartIcon;

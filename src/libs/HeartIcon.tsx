import React, {useCallback, useEffect} from 'react'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addFavorites, removeFavorites } from '../redux/like.slice';

const HeartIcon = ({isFavorite}: any) => {
    const dispatch = useDispatch<AppDispatch>();
    
console.log("add", addFavorites);
    const handleToggleFavorite = useCallback(() => {
      if (isFavorite) {
        // If already a favorite, remove from favorites
        dispatch(removeFavorites());
      } else {
        // If not a favorite, add to favorites
        dispatch(addFavorites());
      }
    }, [dispatch, isFavorite]);

  return (
    <div onClick={handleToggleFavorite}>
      {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
    </div>
  );
}

export default HeartIcon
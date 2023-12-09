// import { setUser } from "../redux/user.slice";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useAuth = async () => {
//   const { data: session } = useSession();

//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(setUser(session?.user));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [session]);

//   return user;
// };

// export default useAuth;

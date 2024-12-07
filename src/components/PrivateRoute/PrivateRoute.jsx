import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { setFavorites } from "../../redux/favorites/slice";
import { useEffect } from "react";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      const favoriteItems = localStorage.getItem("favoriteItems");
      if (favoriteItems) {
        dispatch(setFavorites(JSON.parse(favoriteItems)));
      }
    }
  }, [isLoggedIn, dispatch]);
  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;

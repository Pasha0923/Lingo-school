// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";

// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = useSelector(selectAuthIsLoggedIn);
//   if (!isLoggedIn) {
//     return <Navigate to="/login" />; // если не авторизован, перенаправить на страницу логина
//   }

//   return children; // если авторизован, отображать защищенный компонент
//   // return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
// };

// export default PrivateRoute;
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;

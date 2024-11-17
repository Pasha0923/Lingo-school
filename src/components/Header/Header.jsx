import { useSelector } from "react-redux";

import Navigation from "../Navigation/Navigation";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import css from "./Header.module.css";

const Header = ({ hideHeader }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  if (hideHeader) return null; // Если hideHeader == true, не показываем шапку
  return (
    <header className={css.header}>
      <Logo />
      <Navigation />
      <ThemeChanger />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default Header;

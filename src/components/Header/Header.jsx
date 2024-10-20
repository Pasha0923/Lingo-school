import { useSelector } from "react-redux";

import Navigation from "../Navigation/Navigation";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import css from "./Header.module.css";

const Header = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

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

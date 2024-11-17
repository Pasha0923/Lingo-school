import { ThemeProvider } from "next-themes";
import Header from "../Header/Header";

const Layout = ({ children, hideHeader }) => {
  return (
    <>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="system"
        themes={["Yellow", "Green", "Blue", "Red", "Brown"]}
        enableSystem
      >
        {!hideHeader && <Header />}
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;

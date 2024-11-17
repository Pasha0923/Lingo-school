import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthRefreshing } from "./redux/auth/selectors";
import Loader from "./components/Loader/Loader";
import { refreshUser } from "./redux/auth/operations";
import Layout from "./components/Layout/Layout";
import Container from "./components/Container/Container";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { ToastContainer } from "react-toastify";

const HomePage = lazy(() => import("./pages/HomePage"));
const TeachersPage = lazy(() => import("./pages/TheachersPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectAuthRefreshing);
  // const is404 = useMatch("*"); // Пытаемся захватить все маршруты
  useEffect(() => {
    const body = document.body;

    if (
      location.pathname === "/teachers" ||
      location.pathname === "/favorites"
    ) {
      body.style.backgroundColor = "var(--gray-background-color)";
    } else {
      body.style.backgroundColor = "var(--main-white-color)";
    }

    return () => {
      body.style.backgroundColor = "";
    };
  }, [location.pathname]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }
  // Убираем Header для 404 страницы
  const hideHeader = !["/", "/teachers", "/favorites"].includes(
    location.pathname
  );

  return (
    <Container>
      <ToastContainer /> {/* Добавляем ToastContainer здесь */}
      {/* <Logo />
      <Navigation />
      <ThemeChanger /> */}
      <Suspense fallback={<Loader />}>
        <Layout hideHeader={hideHeader}>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/teachers" element={<TeachersPage />} />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <FavoritesPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </Layout>
      </Suspense>
    </Container>
  );
}

export default App;

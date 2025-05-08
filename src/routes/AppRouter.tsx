import { createElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import Layout from "../layout/Layout";
import { routes } from "./routes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<Layout />}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element && createElement(route.element)}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

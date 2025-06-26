import { createElement, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { routes } from "./routes";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import Layout from "../layout/Layout";
import CartPage from "../pages/cart";
import Products from "../pages/products";

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
            <Route path="/products/:id" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

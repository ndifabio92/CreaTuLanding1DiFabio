import { lazy } from "react";
import { Route } from "../types/app/route";

const Home = lazy(() => import("../pages/home"));
const Brands = lazy(() => import("../pages/brands"));

export const routes: Route[] = [
  { path: "/", name: "Inicio", element: Home },
  { path: '/brands', name: "Marcas", element: Brands },
];

import { lazy } from "react";
import { Route } from "../types/app/route";

const Home = lazy(() => import("../pages/home"));
const Contact = lazy(() => import("../pages/contact"));

export const routes: Route[] = [
  { path: "/", name: "Inicio", element: Home },
  { path: "/contact", name: "Contacto", element: Contact },
];

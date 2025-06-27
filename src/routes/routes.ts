import { lazy } from "react";
import { Route } from "../types/app/route";

const Home = lazy(() => import("../pages/home"));
// const Contact = lazy(() => import("../pages/contact"));
const Checkout = lazy(() => import("../pages/checkout"));

export const routes: Route[] = [
  { path: "/", name: "Inicio", element: Home },
  { path: '/checkout', name: "Checkout", element: Checkout},
  // { path: "/contact", name: "Contacto", element: Contact },
];

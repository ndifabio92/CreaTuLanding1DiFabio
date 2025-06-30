import { lazy } from "react";
import { Route } from "../types/app/route";

export const routes: Route[] = [
  { path: "/", name: "Inicio", element: lazy(() => import("../pages/home")) },
  {
    path: "/brands",
    name: "Marcas",
    element: lazy(() => import("../pages/brands")),
  },
  {
    path: "contact",
    name: "Contacto",
    element: lazy(() => import("../pages/contact")),
  },
];

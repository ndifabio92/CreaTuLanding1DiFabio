import { Route } from "../types/app/route";
import Home from "../pages/home";

export const routes: Route[] = [
  { path: "/", name: "Inicio", element: Home },
  { path: "/", name: "Productos", element: Home },
  { path: "/", name: "Categorias", element: Home },
  { path: "/", name: "Contacto", element: Home },
];

import { ComponentType, LazyExoticComponent } from "react";

export interface Route {
  path: string;
  name?: string;
  icon?: string;
  element: LazyExoticComponent<ComponentType<object>> | ComponentType<object>;
}

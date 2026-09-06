import { createContext } from "react";

export interface PanelContextValue {
  titleId:string;
  descriptionId?:string;
  setHasDescription: (hasDescription:boolean) => void;
}

export const PanelContext = 
  createContext<PanelContextValue|null>(null);
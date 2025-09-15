
import { createContext, type Dispatch, type SetStateAction } from "react";

interface AppContextType {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  token: string;
  setToken : Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

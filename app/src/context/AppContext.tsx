
import { createContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";

interface AppContextType {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <AppContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </AppContext.Provider>
  );
};

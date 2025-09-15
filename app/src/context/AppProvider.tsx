import { type ReactNode, useState } from "react";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [token,setToken] = useState<string>("");

  return (
    <AppContext.Provider value={{ openModal, setOpenModal, tags, setTags, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

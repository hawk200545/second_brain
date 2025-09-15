import SideBar from "../components/ui/SideBar";
import AllNotes from "../components/ui/AllNotes";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const context  = useContext(AppContext);
  if (!context) {
    throw new Error("useContext must be used within a AppProvider");
  }
  const {token, setToken} = context;
  if(token == ""){
    if(localStorage.getItem('token') != ""){
      setToken(localStorage.getItem('token') ?? "")
    }else{
      navigate('/');
      return;
    }
      
  }
  return (
    <>
      <div className="flex w-full">
        <SideBar />
        <AllNotes />
      </div>
    </>
  );
}

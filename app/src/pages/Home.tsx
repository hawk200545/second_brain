import SideBar from "../components/ui/SideBar";
import AllNotes from "../components/ui/AllNotes";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { setToken } from "../redux/tokenSlice";
import { useDispatch } from "react-redux";


export default function Home() {
  const token = useSelector((state : RootState) => state.token );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(token == ""){
    if(localStorage.getItem('token') != ""){
      dispatch(setToken(localStorage.getItem('token') ?? ""))
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

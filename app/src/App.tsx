import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
      <Toaster richColors />
    </>
  );
}

export default App;

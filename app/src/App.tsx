import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import { AppProvider } from "./context/AppProvider";
import { Provider } from "react-redux";
import {store} from './redux/store'

function App() {
  return (
    <>
    <Provider store={store}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </Provider>
      <Toaster richColors />
    </>
  );
}

export default App;

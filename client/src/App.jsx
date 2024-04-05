import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Welcome from "./pages/welcome";
import Profile from "./pages/profile";
import Post from "./pages/post";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import { getCurrentUser } from "./utils/auth.util";
import NotFound from "./pages/not-found";
import PrivateRoutes from "./components/protected-route";
import Settings from "./pages/settings";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar user={currentUser} />
        <Routes>
          <Route element={<PrivateRoutes check={currentUser} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/" element={<Welcome />} exact />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

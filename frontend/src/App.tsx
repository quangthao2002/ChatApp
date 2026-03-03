import { BrowserRouter, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

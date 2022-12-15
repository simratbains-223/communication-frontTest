import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import HomePage from "./pages/home-testOnly-page";
import ChatPage from "./pages/chat-page";
import LoginPage from "./pages/login-page";
import "./App.css";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Menu />}>
          <Route index element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

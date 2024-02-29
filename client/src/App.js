// import logo from "./logo.svg";
import "./App.css";
import Post from "./Post";
import Header from "./Header";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
// import IndexPage from "./pages/IndexPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <IndexPage />

              // <main>
              //   <Header />
              //   <Post />
              //   <Post />
              //   <Post />
              // </main>
            }
          />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/Create" element={<CreatePost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

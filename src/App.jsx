import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStrore.js";
import Feed from "./components/Feed.jsx";
import Connection from "./components/Connection.jsx";
import Request from "./components/Request.jsx";
import Signup from "./components/Signup.jsx";

function App() {

  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connection />} />
              <Route path="/requests" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div >
  )
}

export default App

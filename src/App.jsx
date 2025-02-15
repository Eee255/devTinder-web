
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from './Components/Body'
import Login from "./Components/Login";
import { Provider } from "react-redux";
import AppStore from "./Utils/AppStrore";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Chat from "./Components/ChatComponent";
import LoginHelp from "./Components/LoginHelp";

function App() {

  return (
    <Provider store={AppStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/"  element = {<Body />}>
            <Route path="/login" element = {<Login />}></Route>
            <Route path="/feed" element = {<Feed />}></Route>
            <Route path="/profile" element = {<Profile />}></Route>
            <Route path="/connections" element = {<Connections />}/>
            <Route path="/requests" element = {<Requests />}/>
            <Route path="/chat/:senderId/:receiverId" element = {<Chat/>}></Route>
            <Route path="/LoginHelp" element= {<LoginHelp />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;

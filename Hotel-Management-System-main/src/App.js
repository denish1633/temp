import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "./components/homepage.component";
import RoomsList from "./components/rooms-list.component";
import EditRoom from "./components/edit-room.component";
import CreateRoom from "./components/create-room.component";
import CreateUser from "./components/create-user.component";
import LoginPage from "./components/LoginComponents/login.component";
import ForgotPassword from "./components/LoginComponents/forgotpassword.component";
import ResetPassword from "./components/LoginComponents/resetpassword.component";
import Signup from "./components/LoginComponents/signup.component";

function App() {
  return (
    <Router>
      <Homepage />
      
      <Route path="/" exact component={RoomsList} />
      <Route path="/edit/:id" component={EditRoom} />
      <Route path="/create" component={CreateRoom} />
      <Route path="/user" component={CreateUser} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/signup" component={Signup} />
    </Router>
  );
}

export default App;

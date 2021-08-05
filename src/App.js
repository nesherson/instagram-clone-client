import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAuthUser } from "./features/user/userSlice/authUserSlice/authUserSlice";

import Signup from "./features/auth/components/Signup/Signup";
import Login from "./features/auth/components/Login/Login";
import Feed from "./features/posts/components/Feed";
import AuthUserProfile from "./features/user/components/AuthUserProfile";
import PostDetails from './features/posts/components/PostDetails';
import { PrivateRoute } from "./util/PrivateRoute";


function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { username } = useSelector(selectAuthUser);

  return (
    <Router>
      <PrivateRoute exact path="/feed">
        <Feed />
      </PrivateRoute>
      <PrivateRoute path={`/profile/${username}`}>
        <AuthUserProfile/>
      </PrivateRoute>
      <PrivateRoute path="/post/:id">
        <PostDetails/>
      </PrivateRoute>

     { !userData ?
       <>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
       </> : <Redirect to='/feed' />
     }
    </Router>
  );
}

export default App;

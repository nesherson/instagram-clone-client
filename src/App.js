import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./util/PrivateRoute";

import Signup from "./features/auth/components/Signup/Signup";
import Login from "./features/auth/components/Login/Login";
import Feed from "./features/posts/components/Feed";
import AuthUserProfile from "./features/user/components/AuthUserProfile";
import PostDetails from './features/posts/components/PostDetails';

function App() {
  const token = JSON.parse(localStorage.getItem("userData"));

  return (
    <Router>
      <PrivateRoute exact path="/feed">
        <Feed />
      </PrivateRoute>
      <PrivateRoute path="/profile/:id">
        <AuthUserProfile/>
      </PrivateRoute>
      <PrivateRoute path="/post/:id">
        <PostDetails/>
      </PrivateRoute>

     { !token ?
       <>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
       </> : <Redirect to='/feed' />
     }
    </Router>
  );
}

export default App;

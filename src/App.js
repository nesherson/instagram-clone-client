import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAuthUser } from './features/user/userSlice/authUserSlice/authUserSlice';

import Signup from './features/auth/components/Signup/Signup';
import Login from './features/auth/components/Login/Login';
import Feed from './features/posts/components/Feed';
import AuthUserProfile from './features/user/components/AuthUserProfile';
import UserProfile from './features/user/components/UserProfile';
import PostDetails from './features/posts/components/PostDetails';
import { PrivateRoute } from './util/PrivateRoute';

function App() {

  const userData = JSON.parse(localStorage.getItem('userData'));
  const { username } = useSelector(selectAuthUser);

  return (
    <Router>
      <PrivateRoute exact path='/feed'>
        <Feed />
      </PrivateRoute>
      <PrivateRoute  path={`/your-profile/${username}`}>
        <AuthUserProfile />
      </PrivateRoute>
      <PrivateRoute  path='/profile/:id'>
        <UserProfile />
      </PrivateRoute>
      <PrivateRoute path='/post/:id'>
        <PostDetails />
      </PrivateRoute>

     
        <>
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={Signup} />
        </>
      
    </Router>
  );
}

export default App;

/*

{!userData ? (
        <>
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={Signup} />
        </>
      ) : (
        null
      )}
*/

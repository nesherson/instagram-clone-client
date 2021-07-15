import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './util/PrivateRoute';

import Signup from './features/auth/components/Signup/Signup';
import Login from './features/auth/components/Login/Login';
import Feed from './features/posts/components/Feed';
import UserProfile from './features/user/components/userProfile';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} />
      <Route path='/signup' component={Signup} />
      <PrivateRoute path='/feed'>
        <Feed />
        <UserProfile />
      </PrivateRoute>
      <PrivateRoute path='/profile/:id'>
        <UserProfile />
      </PrivateRoute>
    </Router>
  );
}

export default App;

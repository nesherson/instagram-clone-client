import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './util/PrivateRoute';

import Signup from './features/auth/components/SignUp/SignUp';
import Login from './features/auth/components/LogIn/LogIn';
import Feed from './features/posts/components/Feed';
import UserProfile from './features/user/components/userProfile';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <PrivateRoute exact path='/feed'>
        <Feed />
      </PrivateRoute>
      <PrivateRoute exact path='/:id'>
        <UserProfile />
      </PrivateRoute>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './util/PrivateRoute';

import Signup from './features/auth/components/SignUp/SignUp';
import Login from './features/auth/components/LogIn/LogIn';
import Main from './features/posts/components/Main';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <PrivateRoute exact path='/main'>
        <Main />
      </PrivateRoute>
    </Router>
  );
}

export default App;

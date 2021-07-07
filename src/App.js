import { BrowserRouter as Router, Route } from 'react-router-dom';

import Signup from './features/auth/components/SignUp/SignUp';
import Login from './features/auth/components/LogIn/LogIn';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} />
      <Route path='/signup' component={Signup} />
    </Router>
  );
}

export default App;

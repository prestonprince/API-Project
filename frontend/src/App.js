import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActivities from './store/session';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActivities.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <>
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
      <Route path='/signup'>
        <SignupFormPage />
      </Route>
      <Route exact path='/'>
        <h1>Hello from myAirBnB</h1>
      </Route>
    </Switch>
    </>
  );
}

export default App;

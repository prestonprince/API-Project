import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActivities from './store/session';
import LoginFormPage from './components/LoginFormModal';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActivities.restoreUser()).then(() => setIsLoaded(true)).catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
    <Switch>
      <Route path='/signup'>
        <SignupFormPage />
      </Route>
      <Route exact path='/'>
      <h2>Welcome to BingusBnB</h2>
      </Route>
    </Switch>
    )}
    </>
  );
}

export default App;

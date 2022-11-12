import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActivities from './store/session';
import Navigation from './components/Navigation';

//? TODO: Spots Feature
//?       Make spot store
//?       - make spot reducer
//?       - make load spot actions and dispatch
//?       Make spot card component
//?       Make spot details page and route
//?       Make create a spot modal
//?       Make an edit a spot modal

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActivities.restoreUser()).then(() => setIsLoaded(true)).catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <>
    <div className='main'>
      <Navigation className='nav' isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route exact path='/'>
        <h2 className='nav1'>BingusBnB</h2>
        </Route>
      </Switch>
      )}
    </div>
    </>
  );
}

export default App;

import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActivities from './store/session';
import Navigation from './components/Navigation';
import SpotsView from './components/SpotsView';
import { fetchAllSpots } from './store/spot';
import SpotDetails from './components/SpotDetails';
import AddSpotForm from './components/AddSpotForm.js';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSpots, setHasSpots] = useState(false);

  useEffect(() => {
    dispatch(sessionActivities.restoreUser()).then(() => setIsLoaded(true)).catch((e) => console.log(e));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllSpots()).then(() => setHasSpots(true))
  }, [dispatch])

  return (
    <>
    <div className='main'>
      <Navigation className='nav' isLoaded={isLoaded} />
      <hr className='nav-under'></hr>
      {isLoaded && hasSpots ? (
      <Switch>
        <Route path='/spots/new'>
          <AddSpotForm />
        </Route>
        <Route path='/spots/:spotId'>
          <SpotDetails />
        </Route>
        <Route exact path='/'>
          <SpotsView />
        </Route>
      </Switch>
      ) :
      (<div className='loader'></div>)
    }
    </div>
    </>
  );
}

export default App;

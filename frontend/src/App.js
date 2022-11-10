import { Route, Switch } from 'react-router-dom';

import LoginFormPage from './components';

function App() {
  return (
    <>
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
      <Route exact path='/'>
        <h1>Hello from myAirBnB</h1>
      </Route>
    </Switch>
    </>
  );
}

export default App;

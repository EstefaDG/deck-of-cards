import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { FormProvider, useForm } from './components/form/Form-context';
import Form from './components/form/Form';
import Loading from './components/loading/Loading';
import Game from './components/game/Game';

function App() {

  const { isLoadingData } = useForm();

  return (
    <Router>
      <Switch>

        <Route path="/game">
          <Game />
        </Route>
        
        <Route path="/">
          {
            (isLoadingData)
              ? <Loading />
              : <Form />
          }
        </Route>

      </Switch>
    </Router>
  );
}

export default () => {
  return <FormProvider>
    <App />
  </FormProvider>
};

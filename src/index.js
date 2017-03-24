import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/auth/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// if there is a token than we consider user signed in
if (token) {
    //need to dispatch an action creator to update state
    store.dispatch({type:AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Welcome}></IndexRoute>
            <Route path="/signin" component={Signin}/>
            <Route path="/signout" component = {RequireAuth(Signout)} />
            <Route path="/signup" component = {Signup} />
            <Route path="/feature" component = {RequireAuth(Feature)} />
        </Route>    
    </Router>
  </Provider>
  , document.querySelector('.container'));

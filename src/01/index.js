//	IMPORTS
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { render } from 'react-dom';
import { Provider } from 'react-redux';


import ExpModel from './ExpModel';
import App from './pages/App';
import Home from './pages/Home';
import About from './pages/About';
import Experiment from './pages/Experiment';

console.log('Folder Static pages testing ', Math.floor(Math.random() * 100));
//	CONSTRUCT MODELS

const experimentsReducer = (state=ExpModel, action) => {
	return state;
}

const middleware = routerMiddleware(browserHistory)

//	MAKE SOME REDUCERS
let reducer = combineReducers({
  experiments: experimentsReducer,
  routing: routerReducer
})

const store = createStore(reducer, applyMiddleware(middleware));
const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/Sketches/' component={App}>
				<IndexRoute component={Home} />
				<Route path="/exps/:exp" component={Experiment} />
				<Route path="/Sketches/about" component={About} />

				<Redirect from="about" to="/Sketches/about" />
			</Route>
		</Router>
	</Provider>
	,document.querySelector('#root')
);


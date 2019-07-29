import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { createStore } from 'redux';
import Reducer from './reducers/reducer.js';
import { Provider } from 'react-redux';
import Counter from './components/counter.js';

const store = createStore(Reducer);

ReactDOM.render(
	<Provider store={ store }>
		<Counter />
	</Provider>, 
	document.getElementById('root')
);



import React, { Component } from 'react';
import './App.css';
import Counter from './components/counter.js';

class App extends Component {
    render() {
        return (
            <div>
                我是App组件
                <div>
                    <Counter />
                </div>
            </div>
        );
    }
}

export default App;

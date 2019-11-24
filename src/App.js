import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Memories from './components/memories';
import SaveMemory from './components/save-memory';
import EditMemory from './components/edit-memory';
import Memory from './components/memory';
import Navbar from './components/navbar';
import Login from './components/login';
import Signup from './components/signup';
import Quote from './components/quote';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Switch> {/* allows Only One Route to be displayed  */}
                    <Route exact path='/' component={Login} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/quote' component={Quote} />
                    <Route path='/memories' component={Memories} />
                    <Route path='/save-memory' component={SaveMemory} />
                    <Route path='/memory/:id' component={Memory} />
                    <Route path='/edit-memory/:id' component={EditMemory} />
                    <Route path='/*' component={Login} /> {/* handles unknown urls */}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
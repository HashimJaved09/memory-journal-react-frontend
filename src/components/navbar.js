import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

import { server } from '../global';


class Navbar extends Component {

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        return (
            <nav className="nav-wrapper indigo">
                <div className="container">
                    <Link to="/" className="brand-logo fontWeight">Memory Journal</Link>
                    {
                        localStorage.getItem('token') != null ? (
                        <ul id="nav-mobile" className="right hide-on-small-and-down">
                            <li><Link to="/memories">My Memories</Link></li>
                            <li><Link to="/quote">Quote</Link></li>
                            <li>
                                <NavLink to="/login">
                                    <i className="material-icons" onClick={this.logout}>power_settings_new</i>
                                </NavLink>
                            </li>
                        </ul> ) : (
                            null
                        )
                    }
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);
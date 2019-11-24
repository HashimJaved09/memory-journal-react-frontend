import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../spinner-service/spinner-service';
import { server } from '../global';
import Position from '../toast-service/toast-service';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


class Login extends Component {
    state = {
        username: '',
        password: '',
        token: '',
        vusername: false,
        vusernametext: '',
        vpassword: false,
        vpasswordtext: '',
        vauthenticate: false,
        vauthenticatetext: ''
    };

    componentDidMount() {
        if(localStorage.getItem('token') != null) {
            this.props.history.push('/memories');
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let model = {
            username: this.state.username,
            password: this.state.password
        };
        this.setState({
            vusername: false,
            vusernametext: '',
            vpassword: false,
            vpasswordtext: '',
            vauthenticate: false,
            vauthenticatetext: ''
        });
        axios.post(server + '/token-auth/', model)
            .then(data => {
                this.setState({
                    token: data.data.token
                });
                localStorage.setItem('token', this.state.token);
                this.props.history.push('/memories');
            })
            .catch(error => {
                try {
                    if (error.response.data.username) {
                        this.setState({
                            vusername: true,
                            vusernametext: error.response.data.username[0]
                        });
                    }
                    if (error.response.data.password) {
                        this.setState({
                            vpassword: true,
                            vpasswordtext: error.response.data.password[0]
                        });
                    }
                    if (error.response.data.non_field_errors) {
                        this.setState({
                            vauthenticate: true,
                            vauthenticatetext: error.response.data.non_field_errors[0]
                        });
                    }
                }
                catch(error) {
                    console.log(error.response);
                }
            }
        )
    }

    render() {
        return (
            <div className="container">
            <br />
                <h3 className="grey-text darken-4 center">Welcome to the Memory Journal</h3>
                <hr />
                <br />
                <h4 className="indigo-text darken-4">Login</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="username" type="text" onChange={this.handleChange} />
                            <label htmlFor="username">Username:</label>
                            <span className="red-text helper-text" id="vusername">
                                { this.state.vusername ? this.state.vusernametext : '' }
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <input id="password" type="password" onChange={this.handleChange} />
                            <label htmlFor="password">Password:</label>
                            <span className="red-text helper-text" id="vpassword">
                                { this.state.vpassword ? this.state.vpasswordtext : '' }
                            </span>
                        </div>
                        <p className="red-text">{ this.state.vauthenticate ? this.state.vauthenticatetext : '' }</p>
                        <div className="row">
                            <div className="input-field col s12">
                                <button className="waves-effect waves-light btn white-text blue darken-4 pull" type="submit">Submit</button>
                            </div>
                            <a href="/signup">
                                <span className="text-small mt-0">create new account</span>
                            </a>
                        </div>
                    </div>
                </form>
                {/* <Position />  */}
                <Spinner />
            </div>
        );
    }
}

export default Login;
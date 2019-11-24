import React, { Component } from 'react';
import axios from 'axios';

import { server } from '../global';

class Signup extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        gender: '',
        vfname: false,
        vfnametext: '',
        vlname: false,
        vlnametext: '',
        vusername: false,
        vusernametext: '',
        vemail: false,
        vemailtext: '',
        vpassword: false,
        vpasswordtext: ''
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            gender: ''
        };
        this.setState({
            vfname: false,
            vfnametext: '',
            vlname: false,
            vlnametext: '',
            vusername: false,
            vusernametext: '',
            vemail: false,
            vemailtext: '',
            vpassword: false,
            vpasswordtext: ''
        });
        axios.post(server + '/accounts/api/user/create', model)
            .then(data => {
                console.log(data);  
                this.props.history.push('/login');
            })
            .catch(error => {
                try {
                    if (error.response.data.first_name) {
                        this.setState({
                            vfname: true,
                            vfnametext: error.response.data.first_name[0]
                        });
                    }
                    if (error.response.data.last_name) {
                        this.setState({
                            vlname: true,
                            vlnametext: error.response.data.last_name[0]
                        });
                    }
                    if (error.response.data.username) {
                        this.setState({
                            vusername: true,
                            vusernametext: error.response.data.username[0]
                        });
                    }
                    if (error.response.data.email) {
                        this.setState({
                            vemail: true,
                            vemailtext: error.response.data.email[0]
                        });
                    }
                    if (error.response.data.password) {
                        this.setState({
                            vpassword: true,
                            vpasswordtext: error.response.data.password[0]
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
            <div className='container'>
                <br />
                <h3 className='indigo-text darken-4 center-text'>Sign Up</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s4">
                            <input id="first_name" type="text" onChange={this.handleChange} />
                            <label htmlFor="first_name">First Name:</label>
                            <span className="red-text helper-text" id="vfname">
                                { this.state.vfname ? this.state.vfnametext : '' }
                            </span>
                        </div>
                        <div className="input-field col s4">
                            <input id="last_name" type="text" onChange={this.handleChange} />
                            <label htmlFor="last_name">Last Name:</label>
                            <span className="red-text helper-text" id="vfname">
                                { this.state.vlname ? this.state.vlnametext : '' }
                            </span>
                        </div>
                        <div className="input-field col s2">
                            <p>
                            <label>
                                <input id="male" className="with-gap" name="group1" type="radio" onChange={this.handleChange} />
                                <span>Male</span>
                            </label>
                            </p>
                        </div>
                        <div className="input-field col s2">
                            <p>
                            <label>
                                <input id="female" className="with-gap" name="group1" type="radio" onChange={this.handleChange} />
                                <span>Female</span>
                            </label>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id='username' type="text" onChange={this.handleChange} />
                            <label htmlFor="username">Username:</label>
                            <span className="red-text helper-text" id="vusername">
                                { this.state.vusername ? this.state.vusernametext : '' }
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <input id='email' type="email" onChange={this.handleChange} />
                            <label htmlFor="email">Email:</label>
                            <span className="red-text helper-text" id="vemail">
                                { this.state.vemail ? this.state.vemailtext : '' }
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <input id='password' type="password" onChange={this.handleChange} />
                            <label htmlFor="password">Password:</label>
                            <span className="red-text helper-text" id="vpassword">
                                { this.state.vpassword ? this.state.vpasswordtext : '' }
                            </span>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <button className='waves-effect waves-light btn white-text blue darken-4' type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;
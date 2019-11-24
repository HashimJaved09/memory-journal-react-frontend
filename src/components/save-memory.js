import React, { Component } from 'react';
import axios from 'axios';

import { server } from '../global';

class SaveMemory extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        vtitle: false,
        vtitletext: '',
        vdescription: false,
        vdescriptiontext: ''
    };
    
    componentDidMount() {
        if(localStorage.getItem('token') == null) {
            this.props.history.push('/login');
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let model = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image
        };
        this.setState({
            vtitle: false,
            vtitletext: '',
            vdescription: false,
            vdescriptiontext: '',
        });
        axios.post(server + '/core/api/memories', model, { headers: { "Authorization": "JWT " + localStorage.getItem('token') }})
            .then(data => {
                console.log(data);
                this.props.history.push('/memories');
            })
            .catch(error => {
                try {
                    if (error.response.data.title) {
                        this.setState({
                            vtitle: true,
                            vtitletext: error.response.data.title[0]
                        });
                    }
                    if (error.response.data.description) {
                        this.setState({
                            vdescription: true,
                            vdescriptiontext: error.response.data.description[0]
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
                <br />
                <h3>Save Your Memory</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" type="text" onChange={this.handleChange} />
                            <label htmlFor="title">Memory Title:</label>
                            <span className="red-text helper-text" id="vtitle">
                                { this.state.vtitle ? this.state.vtitletext : '' }
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
                            <label htmlFor="description">Memory Description:</label>
                            <span className="red-text helper-text" id="vdescription">
                                { this.state.vdescription ? this.state.vdescriptiontext : '' }
                            </span>
                        </div>
                        <input type="file" />
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <button className="waves-effect waves-light btn white-text blue darken-4 pull" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SaveMemory;
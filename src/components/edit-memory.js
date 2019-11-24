import React, { Component } from 'react';
import axios from 'axios';

import { server } from '../global';

class EditMemory extends Component {
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
        let memory_id = this.props.match.params.id;
        axios.get(server + '/core/api/memory/' + memory_id, { headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }})
            .then(data => {
                this.setState({
                    title: data.data.title,
                    description: data.data.description,
                    image: data.data.image
                });
            })
            .catch(error => {
                console.log(error);
            }
        )
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
        let memory_id = this.props.match.params.id;
        axios.put(server + '/core/api/memory/' + memory_id, model, { headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }})
            .then(data => {
                this.setState({
                    title: data.data.title,
                    description: data.data.description,
                    image: data.data.image
                });
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
    };

    render() {
        return (
            <div className="container">
                <br />
                <br />
                <h3>Edit Your Memory</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <span>Memory Title:</span>
                            <input id="title" type="text" onChange={this.handleChange} value={this.state.title} />
                            <span className="red-text helper-text" id="vtitle">
                                { this.state.vtitle ? this.state.vtitletext : '' }
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <span>Memory Description:</span>
                            <textarea id="description" className="materialize-textarea" onChange={this.handleChange} value={this.state.description}></textarea>
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

export default EditMemory;
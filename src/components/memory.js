import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { server } from '../global';
import Plane from '../assets/images/memory.jpeg';

class Memory extends Component {
    state = {
        memory: {}
    };
    
    componentDidMount() {
        if(localStorage.getItem('token') == null) {
            this.props.history.push('/login');
        }
        let memory_id = this.props.match.params.id;
        axios.get(server + '/core/api/memory/' + memory_id, { headers: { "Authorization": "JWT " + localStorage.getItem('token') }})
            .then(data => {
                console.log(data);
                this.setState({
                    memory: data.data
                });
            })
            .catch(error => {
                console.log(error);
            }
        )
    }

    handleClick = (e) => {
        this.props.deletePost(this.props.post.id);
        this.props.history.push('/');
    };

    deleteMemory(memory_id) {
        axios.delete(server + '/core/api/memory/' + memory_id, { headers: { "Authorization": "JWT " + localStorage.getItem('token') }})
            .then(data => {
                console.log(data);
                this.props.history.push('/memories');
            })
            .catch(error => {
                console.log(error);
            }
        )
    }

    render() {
        const memory = this.state.memory ? (
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-image">
                            <img className="single-memory-image" src={ Plane } />
                            <a className="btn-floating halfway-fab waves-effect waves-light blue" href="/save-memory" title="add new memory">
                                <i className="material-icons">add</i>
                            </a>
                        </div>
                        <div className="card-content">
                            <span className="card-title">{ this.state.memory.title }</span>
                            <p>{ this.state.memory.description }</p>
                        </div>
                        <div className="card-action">
                            <i className="red-text material-icons right cursor" onClick={() => {this.deleteMemory(this.state.memory.id)}} title="delete memory">delete</i>
                            <Link to={ '/edit-memory/' + this.state.memory.id }>
                                <i className="material-icons right" title="edit memory">edit</i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
            <div className='center mt-5'>Loading memory...</div>
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h3 className='cyan-text accent-4s'>My Memory</h3>
                    </div>
                </div>
                { memory }
            </div>
        );
    }
}

export default Memory;
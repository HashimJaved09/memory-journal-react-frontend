import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { server } from '../global';
import Plane from '../assets/images/memory.jpeg';


class Memories extends Component {
    state = {
        memories: []
    };
    
    componentDidMount() {
        if(localStorage.getItem('token') == null) {
            this.props.history.push('/login');
        }
        this.getMemories();
    }

    getMemories () {
        axios.get(server + '/core/api/memories', { headers: { "Authorization": "JWT " + localStorage.getItem('token') }})
            .then(data => {
                console.log(data);
                this.setState({
                    memories: data.data
                });
            })
            .catch(error => {
                console.log(error);
            }
        )
    }

    deleteMemory(memory_id) {
        // confirm('Are you sure you want to delete this memory?');
        axios.delete(server + '/core/api/memory/' + memory_id, { headers: { "Authorization": "JWT " + localStorage.getItem('token') }})
            .then(data => {
                console.log(data);
                this.getMemories();
            })
            .catch(error => {
                console.log(error);
            }
        )
    }

    render() {
        const { memories } = this.state;

        const memoriesList = memories.length ? (
            memories.map(memory => {
                return (
                    <div key={ memory.id } className="card horizontal">
                        <div className="card-image">
                            <img className="memory-image" src={ Plane } />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <Link to={ '/memory/' + memory.id }>
                                    <span className="card-title">{ memory.title }</span>
                                </Link>
                                {
                                    memory.description.length > 100 ? (
                                        <p>{ memory.description.substring(0,90) + '...' }</p>
                                    ) : (
                                        <p>{ memory.description }</p>
                                    )
                                }
                            </div>
                            <div className="card-action">
                                <i className="red-text material-icons right cursor" onClick={() => {this.deleteMemory(memory.id)}} title="delete memory">delete</i>
                                <Link to={ '/edit-memory/' + memory.id }>
                                    <i className="material-icons right" title="edit memory">edit</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
            <p className='center'>Loading Memories...</p>
        );
        return (
            <div className='container home'>
                <div className="row">
                    <div className="col s6 push-s6">
                        <h1>
                            <a id="scale-demo" href="/save-memory" className="btn-floating btn-small pull-right" title="add new memory">
                                <i className="material-icons">add</i>
                            </a>
                        </h1>
                    </div>
                    <div className="col s6 pull-s6">
                        <h3 className='cyan-text accent-4s'>My Memories</h3>
                    </div>
                </div>
                { memoriesList }
            </div>
        );
    }
}

export default Memories;
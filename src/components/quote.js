import React, { Component } from 'react';
import axios from 'axios';


class Quote extends Component {
    state = {
        quote: {}
    };
    
    componentDidMount() {
        if(localStorage.getItem('token') == null) {
            this.props.history.push('/login');
        }
        axios.get('https://quotes.rest/qod', { headers: { "Accept": "application/json" }})
            .then(data => {
                console.log(data.data);
                this.setState({
                    quote: data.data.contents.quotes[0]
                });
            })
            .catch(error => {
                console.log(error);
            }
        )
    }

    render() {
        const quote = this.state.quote ? (
            <div className="row">
                <div className="col s12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <h4 className="card-title">{ this.state.quote.title }</h4>
                            <hr />
                            <p className="flow-text quote">{ this.state.quote.quote }</p>
                            <br />
                            <h5 className="yellow-text">- { this.state.quote.author }</h5>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
            <div className='center mt-5'>Loading quote...</div>
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <br />
                        <h3 className='black-text accent-4s'>Quote of the Day</h3>
                    </div>
                </div>
                { quote }
            </div>
        );
    }
}

export default Quote;
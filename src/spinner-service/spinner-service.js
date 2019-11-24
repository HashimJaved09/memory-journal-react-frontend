import React, { Component } from 'react';
import Loader from 'react-loader-spinner';


export default class Spinner extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <Loader
            type="Plane"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
            visible={true}
            />
        );
    }
}
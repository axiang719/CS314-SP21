import React, { Component } from 'react';
import {  Button } from 'reactstrap';

export default class ListOfClicks extends Component { 
    constructor(props) {
        super(props);    
    }

    render() {
        return (
            <tbody className="text-center">
                {this.props.listOfClicks.map((place, index) => (
                    <tr key={index}>
                        <td>{place.address}</td>
                        <td>{place.latitude.toFixed(6)}</td>
                        <td>{place.longitude.toFixed(6)}</td>
                        <td>{place.distance}</td>
                        <td>
                            <Button id="xButton" color="primary" size="sm" onClick={this.props.removePlace.bind(this.props, index)} xs={1}>
                                X
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    }
}

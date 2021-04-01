import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class LoadTour extends Component {
    constructor(props) {
		super(props);
    }

    render() {
        return (
            <Button color="primary">Load</Button>
        );
    }
}
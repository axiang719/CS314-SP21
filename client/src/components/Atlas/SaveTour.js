import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Row, Col } from 'reactstrap';



export default class SaveTour extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return ( 
            <>
                <Button color="primary" >Save</Button>  
            </>
        );
    }
    
}
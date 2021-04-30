import React, { Component } from 'react';
import {  Button, Row } from 'reactstrap';

export default class TypeSearch extends Component {
    constructor(props) {
        super(props);

        this.fillTypeArray = this.fillTypeArray.bind(this);

        this.state = {};

    };

        render() {
            const {serverSettings, type} = this.props;
            const validTypes = serverSettings.serverConfig.type;
            const typeArray = type;

            return (
                <Row className="mt-1">
                    {validTypes.map((type, index) => {
                        return (
                            <Button 
                                outline = {!typeArray.includes(type)} 
                                key={index}
                                color="primary"
                                className="mr-1 mt-1"
                                size="sm"
                                onClick={() => this.fillTypeArray(type)}
                            >
                                {type}
                            </Button>
                        );
                    })}
                </Row>
            )
        }

        fillTypeArray(typeNames){
            const type = this.props.type;
            if(type.includes(typeNames)){
               const index = type.indexOf(typeNames);
               type.splice(index,1);
            } else{
               type.push(typeNames);
            }
            this.props.setType(type);
        }
    }

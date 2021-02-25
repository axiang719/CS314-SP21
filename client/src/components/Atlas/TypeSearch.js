import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, Dropdown,DropdownItem, Input, Form,FormGroup, FormFeedback} from 'reactstrap';


export default class TypeSearch extends Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.FillTypeArray = this.FillTypeArray.bind(this);
         this.state = {
            dropdownOpen: false
           
            }
        };

        render() {
            return (
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                    <DropdownToggle className="mt-1" color="primary" caret>Type</DropdownToggle>

                    <DropdownMenu>
                        <DropdownItem onClick = {() =>this.FillTypeArray("airport")}>airport</DropdownItem>
                        <DropdownItem onClick = {() =>this.FillTypeArray("balloonport")}>Balloonport</DropdownItem>
                        <DropdownItem onClick={() => this.FillTypeArray("helipad")}>Helipad</DropdownItem>
                        <DropdownItem onClick={() => this.FillTypeArray("other")}>Other</DropdownItem>
                       
                        </DropdownMenu>
                </Dropdown>
            );
        }

        FillTypeArray(typeNames){
            const type = this.props.type;
           if(type.includes(typeNames)){
               type.remove(typeNames);
           } else{
               type.add(typeNames)
           }
           this.props.setType(type);

            
        }

        

        toggleDropDown () {
            const isOpen = this.state.dropdownOpen;
            this.setState({ dropdownOpen: !isOpen });
        }
    
    
     
    }
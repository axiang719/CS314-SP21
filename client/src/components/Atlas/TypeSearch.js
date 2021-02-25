import React, { Component } from 'react';
import { DropdownToggle, DropdownMenu, Dropdown,DropdownItem, } from 'reactstrap';


export default class TypeSearch extends Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.FillTypeArray = this.FillTypeArray.bind(this);
        this.checkIfSelected = this.checkIfSelected.bind(this);
        this.state = {
            dropdownOpen: false
        }
    };

        render() {
            return (
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                    <DropdownToggle className="mt-1" color="primary" caret>Type</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem toggle={false} onClick={() => this.FillTypeArray("airport")}>Airport {this.checkIfSelected("airport")}</DropdownItem>
                        <DropdownItem toggle={false} onClick={() => this.FillTypeArray("balloonport")}>Balloonport {this.checkIfSelected("balloonport")}</DropdownItem>
                        <DropdownItem toggle={false} onClick={() => this.FillTypeArray("heliport")}>Heliport {this.checkIfSelected("heliport")}</DropdownItem>
                        <DropdownItem toggle={false} onClick={() => this.FillTypeArray("other")}>Other {this.checkIfSelected("other")}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )
        }

        FillTypeArray(typeNames){
            const type = this.props.type;
            if(type.includes(typeNames)){
               const index = type.indexOf(typeNames);
               type.splice(index,1);
            } else{
               type.push(typeNames);
            }
            this.props.setType(type);
        }

        checkIfSelected(typeName) {
            if(this.props.type.includes(typeName)) {
                return (
                    <> &#10003; </>
                )
            }
        }

        toggleDropDown () {
            const isOpen = this.state.dropdownOpen;
            this.setState({ dropdownOpen: !isOpen });
        }
    }
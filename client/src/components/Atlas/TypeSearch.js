import React, { Component } from 'react';
import { DropdownToggle, DropdownMenu, Dropdown,DropdownItem, Row} from 'reactstrap';


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
            const {serverSettings} = this.props;
            const validTypes = serverSettings.serverConfig.type;

            return (
                <Row className="mt-1">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                        <DropdownToggle color="primary" caret>Type</DropdownToggle>
                        <DropdownMenu>
                            {validTypes.map((type, index) => {
                                return <DropdownItem key={index} toggle={false} onClick={() => this.FillTypeArray(type)}>{type} {this.checkIfSelected(type)}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Row>
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
import React, { Component } from 'react';
import { DropdownToggle, DropdownMenu, Dropdown, DropdownItem} from 'reactstrap';
import styles from '../../static/styles/student-styles.scss'
import { BsFunnelFill } from "react-icons/bs"

export default class TypeDropdown extends Component {
    constructor(props) {
        super(props);

        this.fillTypeArray = this.fillTypeArray.bind(this);

        this.state = {};

    };

        render() {
            const validTypes = this.props.serverSettings.serverConfig.type;

            return (<Dropdown className="typeSearch text-white" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                    <DropdownToggle color="primary" caret><BsFunnelFill/></DropdownToggle>
                    <DropdownMenu>
                        {validTypes.map((type, index) => {
                            return <DropdownItem key={index} toggle={false} onClick={() => this.FillTypeArray(type)}>{type} {this.checkIfSelected(type)}</DropdownItem>
                        })}
                    </DropdownMenu>
                </Dropdown>
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

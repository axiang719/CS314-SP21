import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, Dropdown,DropdownItem, Input, Form,FormGroup, FormFeedback, InputGroupAddon} 
    from 'reactstrap';


export default class WhereSearch extends Component {

    constructor(props) {
        super(props);

        this.processOnChange = this.processOnChange.bind(this);
        this.processOnClickWhere = this.processOnClickWhere.bind(this);

        this.state = {
            whereValue: "",
            show: false,
        };
    };

    render() {
        const {show} = this.state;
		return (
			<div>
                <Button type= "submit" className="ml-1 mt-1 mb-1"  color="primary" onClick={()=>this.setState({show:!show})} > Where?</Button>
                {show && this.renderWhereInput()}
			</div>
		);
	}

    renderWhereInput(){
        const {whereValue} = this.state;
        return(
            <InputGroup>
			    <Input
				    placeholder = "Where?"
				    onChange={this.processOnChange}
				    value = {whereValue}
			    />
                <InputGroupAddon addonType="append" className="ml-1" onClick={this.processOnClickWhere}><Button>Add</Button></InputGroupAddon>
		    </InputGroup>
        );

    }

    processOnChange(onChangeEvent){
        const inputText = onChangeEvent.target.value;
        this.setState({whereValue : inputText});
    }

    processOnClickWhere(){
        const where = this.props.where;
        const {whereValue} = this.state;
        where.push(whereValue);
        this.props.setWhere(where);
    }

}
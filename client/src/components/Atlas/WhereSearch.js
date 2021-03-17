import React, { Component } from 'react';
import { Button, InputGroup, Input, InputGroupAddon} 
    from 'reactstrap';


export default class WhereSearch extends Component {

    constructor(props) {
        super(props);

        this.processOnChange = this.processOnChange.bind(this);
        this.processOnClickWhere = this.processOnClickWhere.bind(this);
        this.renderWhereButtons = this.renderWhereButtons.bind(this);

        this.state = {
            whereValue: "",
            show: false,
        };
    };

    render() {
        const {show} = this.state;
		return (
			<>
                <Button type= "button" className="ml-1 mr-1 mt-1 mb-1"  color="primary" onClick={()=>this.setState({show:!show})} > Where?</Button>
                {show && this.renderWhereButtons()}
                {show && this.renderWhereInput()}
			</>
		);
	}

    renderWhereInput(){
        const {whereValue} = this.state;
        return(
            <InputGroup>
			    <Input
                    onFocus = {()=>{this.props.processFocus("where");}}
				    placeholder = "Where?"
				    onChange={this.processOnChange}
				    value = {whereValue}
			    />
                <InputGroupAddon type={this.state.focus==="where"?"submit":"button"} addonType="append" onClick={this.processOnClickWhere}><Button>Add</Button></InputGroupAddon>
		    </InputGroup>
        );

    }

    renderWhereButtons() {
        return (
            <>
                {this.props.where.map((place, index) => (
                    <Button type="button" 
                            onClick={()=> this.processPlaceButtonClick(index)} 
                            className="mr-1 mt-1 mb-1 " 
                            key={index}>{place + " [x]"}
                    </Button>
                ))}
            </>
        )
    }

    processOnChange(onChangeEvent){
        const inputText = onChangeEvent.target.value;
        this.setState({whereValue : inputText});
    }

    processOnClickWhere(){
        const where = this.props.where;
        const {whereValue} = this.state;
        if (!where.includes(whereValue) && whereValue != "") {
            where.push(whereValue);
            this.props.setWhere(where);
            this.setState({whereValue: ""});
        }
    }

    processPlaceButtonClick(index) {
        const {where, setWhere} = this.props;
        where.splice(index, 1);
        setWhere(where);
    }
}
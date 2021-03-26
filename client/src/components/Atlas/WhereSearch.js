import React, { Component } from 'react';
import Select from 'react-select-virtualized'
import { Button, Col, InputGroup, Input, InputGroupAddon} 
    from 'reactstrap';


export default class WhereSearch extends Component {

    constructor(props) {
        super(props);

        this.processOnChangeWhere = this.processOnChangeWhere.bind(this);
        this.renderWhereInput = this.renderWhereInput.bind(this);
        this.getOptions = this.getOptions.bind(this);

        this.state = {
            whereValue: "",
            show: false,
            options: this.getOptions()
        };
    };

    getOptions() {
        const {serverSettings} = this.props;
        const where = serverSettings.serverConfig.where;
        let options = [];
        for(let i = 0; i < where.length; i++) {
            options.push({value: where[i], label: where[i]})
        }
        return options;
    }

    render() {      
        const {show} = this.state;
		return (
			<>
                <Button type= "button" className="ml-1 mr-1 mb-1"  color="primary" onClick={()=>this.setState({show:!show})} > Where?</Button>
                {show && this.renderWhereButtons()}
                {show && this.renderWhereInput()}
			</>
		);
	}

    renderWhereInput(){
        return(
            <Col sm={12}>
                <Select 
                    value={this.state.whereValue}
                    placeholder="location..."
                    options={this.state.options}
                    onChange={this.processOnChangeWhere}
                />
            </Col>
        );

    }

    renderWhereButtons() {
        return (
            <>
                {this.props.where.map((place, index) => (
                    <Button type="button" 
                            onClick={()=> this.processPlaceButtonClick(index)} 
                            className="mr-1 mb-1 " 
                            key={index}>{place + " [x]"}
                    </Button>
                ))}
            </>
        )
    }

    processOnChangeWhere(input){
        const whereValue = input.value
        const where = this.props.where;
        if (!where.includes(whereValue)) {
            where.push(whereValue);
            this.props.setWhere(where);
        }
        this.setState({whereValue: ""})
    }

    processPlaceButtonClick(index) {
        const {where, setWhere} = this.props;
        where.splice(index, 1);
        setWhere(where);
    }
}
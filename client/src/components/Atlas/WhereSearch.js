import React, { Component } from 'react';
import Select from 'react-select-virtualized'
import { Button, Row } from 'reactstrap';


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
        options = options.sort((current,next) => {return current.value >= next.value});
        return options;
    }

    render() {      
		return (
			<>
                {this.renderWhereButtons()}
                {this.renderWhereInput()}
			</>
		);
	}

    renderWhereInput(){
        return(
            <div className="mt-2">
                <Select 
                    value={this.state.whereValue}
                    placeholder="Filter by territory..."
                    options={this.state.options}
                    onChange={this.processOnChangeWhere}
                />
            </div>
        );

    }

    renderWhereButtons() {
        return (
            <Row className="mt-1">
                {this.props.where.map((place, index) => (
                    <Button type="button" 
                            onClick={()=> this.processPlaceButtonClick(index)} 
                            className="mr-1 mt-1"
                            size="sm"
                            key={index}>{place + " [x]"}
                    </Button>
                ))}
            </Row>
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
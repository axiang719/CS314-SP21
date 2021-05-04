import React, { Component } from 'react';
import { BsFilter } from 'react-icons/bs';
import { Select } from "react-select-virtualized"
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


export default class FilterTour extends Component {
    constructor(props) {
        super(props);

        this.getSearchOptions = this.getSearchOptions.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.filterOnClick = this.filterOnClick.bind(this);

        this.state = {
            searchOptions: [],
            modalToggle: false,
        }
    };

    render() {
        return(
            <>
                <BsFilter 
                    className="mr-2 mb-1 text-white"
                    onClick={ this.filterOnClick }
                    />
                {this.renderModal()}
            </>
        );
    }

    filterOnClick(){
        const { modalToggle } = this.state; 
        const { listOfClicks } = this.props;
        const searchOptions = this.getSearchOptions(listOfClicks);
        this.setState({modalToggle: !modalToggle, searchOptions});
    }

    renderModal(){
        const { searchOptions, modalToggle } = this.state;
        const toggle = () => {this.setState({modalToggle: !modalToggle})};
        
        return (
            <Modal
                isOpen={modalToggle}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>
                    Filter Tour
                </ModalHeader>
                <ModalBody>
                    Search:
                    <Select
                        options={searchOptions}
                    />
                </ModalBody>
            </Modal>
        );
    }

    getSearchOptions(searchArray) {
        const searchOptions = [];
        if (searchArray) {
            searchArray.forEach(item => {
                const name = item.name.substring(0, item.name.indexOf(","));
                searchOptions.push({value: name, label: name});   
            });
        }
        return searchOptions;
    }


}

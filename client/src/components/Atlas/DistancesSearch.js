import React, { Component } from 'react';
import { Button, InputGroup, Input, FormFeedback, Container, Row } from 'reactstrap';

import PlacesList from "./PlacesList";
import {LOG} from "../../utils/constants";
import * as findSchema from "../../../schemas/DistancesResponse";
import { isJsonResponseValid, sendServerRequest, getOriginalServerPort } from "../../utils/restfulAPI";

export default class DistancesSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
          DistancesRequest: {
             requestType: "distances",
             earthRadius: "",
             distances: []
          }
        };
     };

   addDistancesArrayElements = (accumulator, currentValue) => accumulator + currentValue;
   sumOfDistancesArray = this.state.distances.reduce(addDistancesArrayElements);
   

} 
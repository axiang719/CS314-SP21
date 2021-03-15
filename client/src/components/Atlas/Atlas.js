import React, { Component } from 'react';
import { Col, Container, Row, Button, Table } from 'reactstrap';

import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { control, latLng } from 'leaflet';
import Control from 'react-leaflet-control';
import { BsGeoAlt } from "react-icons/bs"


import CoordinatesInput from "./CoordinatesInput";
import ListOfClicks from "./ListOfClicks";
import DistancesSearch from "./DistancesSearch";

import ServerSettings from '../Margins/ServerSettings';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = L.latLng(40.5734, -105.0865);
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class Atlas extends Component {

    constructor(props) {

        super(props);
        
        this.handleMapClick = this.handleMapClick.bind(this);
        this.setMarker = this.setMarker.bind(this);
        this.clearList = this.clearList.bind(this);
        this.removePlace = this.removePlace.bind(this);
        this.requestUserLocation = this.requestUserLocation.bind(this);
        this.handleGeolocation = this.handleGeolocation.bind(this);
        this.reverseGeoCoding = this.reverseGeoCoding.bind(this);
        this.getStringMarkerPosition = this.getStringMarkerPosition.bind(this);
        this.returnToInitialTrip = this.returnToInitialTrip.bind(this);
        this.getPolylines = this.getPolylines.bind(this);
        
        this.state = {
            markerPosition: null,
            mapCenter: MAP_CENTER_DEFAULT,
            listOfClicks: [],
            address: "",
            totalDistance: 0
        };
    
    }

    componentDidMount(previousProps, previousState, snapShot){
       this.requestUserLocation();
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{ size: 10, offset: 1 }}>
                            {this.renderLeafletMap()}
                        </Col>
                    </Row>
                    {this.renderCoordinatesInput()}
                    <br></br>
                    <Row>
                        <Col sm={12} md={{ size: 10, offset: 1 }}>
                            <Table hover bordered size="sm">
                                <thead className="text-center">
                                    <tr>
                                        <th>Address</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                        <th>Distance to Next<br/>({this.state.totalDistance})</th>
                                        <th>
                                            <Button id="clear" color="primary" size="sm" onClick={this.clearList} 
                                            xs={1}>
                                                Clear
                                            </Button>
                                        </th>
                                    </tr>
                                </thead>
                                {this.renderList()}
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    renderCoordinatesInput() {
        return <CoordinatesInput setMarker={this.setMarker} 
                showMessage={this.props.showMessage}
                serverSettings={this.props.serverSettings}/>;
    }

    renderList() {
        return (
            <ListOfClicks
                listOfClicks = { this.state.listOfClicks }
                clearList = { this.clearList }
                removePlace = { this.removePlace }
            />
        );
    }

    clearList() {
        this.setState({listOfClicks: [], totalDistance: 0, priorMarkerPositions: []});
    }

    removePlace(index) {
        let newList = [];
        for (let i = 0; i < this.state.listOfClicks.length; i++) {
            if (i != index)
                newList.push(this.state.listOfClicks[i]);
        }
        this.setState({ listOfClicks: newList }, this.handleDistances);
    }

    renderLeafletMap() {
        return (
            <Map
                className={'mapStyle'}
                boxZoom={false}
                zoom={15}
                minZoom={MAP_MIN_ZOOM}
                maxZoom={MAP_MAX_ZOOM}
                maxBounds={MAP_BOUNDS}
                center={this.state.mapCenter}
                onClick={this.handleMapClick}
            >    
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
                {this.getMarker()}
                {this.getPolylines()}

                <Control position="bottomright">
                    {this.renderReturnMeButton()}
                    {this.renderFindMeButton()}
                </Control>
                {this.getPriorMarker()}

            </Map>
        );
    }
    renderFindMeButton() {
        return (
          <Button id="findMe" onClick={this.requestUserLocation} color="primary" block><BsGeoAlt/></Button>
        );
      }

    renderReturnMeButton(){
        return (
            <Button id="return" onClick={this.returnToInitialTrip} color="danger" block>Return</Button>
        );
    }

    requestUserLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.handleGeolocation, this.handleGeolocationError);
        }
    }

    returnToInitialTrip(){
        const {listOfClicks} = this.state;
        const location = listOfClicks[listOfClicks.length - 1]
        const latlng = {lat: location.latitude, lng: location.longitude}
        this.setState({markerPosition: latlng, mapCenter:latlng, address: location.address});
    }

    handleGeolocation(position) {
        const latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.setMarker(latlng);
        console.log(`The user is located at ${JSON.stringify(latlng)}.`);
    }

    handleGeolocationError() {
        console.log("Error retrieving the user's position.");
    }

    handleMapClick(mapClickInfo) {
        this.setMarker(mapClickInfo.latlng);
    }

    setMarker(latlng) {
        if (latlng != null) {
            
            this.reverseGeoCoding(latlng).then();
            this.setState({markerPosition: latlng, mapCenter: latlng});
        }
    }

    async handleDistances() {
        if(this.state.listOfClicks.length >= 2) {
            const distanceRequest = new DistancesSearch(this.getPlaces(), 6371);
            await distanceRequest.sendDistancesRequest();
            const distances = distanceRequest.getDistances();
            this.handleDistancesResponse(distances);
        }
    }

    getPlaces() {
        var places = [];
        for(var i = 0; i < this.state.listOfClicks.length; i++) {
            const place = {
                name: this.state.listOfClicks[i].address,
                latitude: this.state.listOfClicks[i].latitude.toString(),
                longitude: this.state.listOfClicks[i].longitude.toString()
            }
            places.unshift(place);
        }
        return places;
    }

    handleDistancesResponse(distances) {
        var newList = this.state.listOfClicks;
        var distanceSum = 0;
        var numPlaces = newList.length;
        for(var i = 0; i < numPlaces; i++) {
            newList[i].distance = distances[(numPlaces - 1) - i];
            distanceSum += distances[i];
        }
        this.setState({listOfClicks: newList, totalDistance: distanceSum});
    }

    getMarker() {
        if (this.state.markerPosition) {
            return (
                <Marker ref={(ref) => this.showMarkerPopup(ref)} position={this.state.markerPosition} icon={MARKER_ICON}>

                    <Popup offset={[0, -18]} className="font-weight-bold">
                        {this.getStringMarkerPosition(this.state.address)}
                    </Popup>
                </Marker>
            );
        }
    }

    getPriorMarker() {
        return this.state.listOfClicks.map((position,index) => (
            <Marker key={index} position={[position["latitude"],position["longitude"]]} icon={MARKER_ICON}></Marker>
        ))
    }

    getPolylines() {
        const {listOfClicks} = this.state;
        if (listOfClicks.length > 1) {
            let polylineArray = this.extractLines(listOfClicks);          
            return <Polyline positions={polylineArray}/>
        }
    }

    extractLines(listOfPlaces) {
        let polylineArray = [];
            const length = listOfPlaces.length;
            let lastPlace;
            
            for (let i = 0; i <= length; i++) {
                const currentPlace = listOfPlaces[i % length];
                
                if (lastPlace) {
                    const polyline = [[lastPlace.latitude, lastPlace.longitude], [currentPlace.latitude, currentPlace.longitude], [lastPlace.latitude, lastPlace.longitude]];
                    polylineArray.push(polyline);
                }
                lastPlace = currentPlace;
            }

        return polylineArray;
    }
    
        
    
    showMarkerPopup(ref) {
        if (ref) {
            ref.leafletElement.openPopup();
        }
    }

    getStringMarkerPosition() {
        return (
          <div>  
            {this.state.address}
            <br/>
            {this.state.markerPosition.lat.toFixed(8) + ", " + this.state.markerPosition.lng.toFixed(8)}
          </div>
        );
      }

    getLatLngText(latLng) {
        return latLng.lat.toFixed(6) + ', ' + latLng.lng.toFixed(6);
    }

    async reverseGeoCoding(coordinates) {
        const data = await ( await fetch(GEOCODE_URL+`${coordinates.lng},${coordinates.lat}`)).json();
        console.log(data);
        const addressLabel = (data.address !== undefined) ? data.address.LongLabel : "Unknown";
        const listOfClicks = this.state.listOfClicks;
        const place = {address: addressLabel, latitude: coordinates.lat, longitude: coordinates.lng, distance: 0};
        listOfClicks.unshift(place);
        this.setState({listOfClicks: listOfClicks, address: addressLabel}, this.handleDistances);
      }
}

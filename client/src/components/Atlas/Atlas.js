import React, { Component } from 'react';
import { Col, Container, Row, Button, Table } from 'reactstrap';

import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { control, latLng } from 'leaflet';
import Control from 'react-leaflet-control';
import { BsCursorFill, BsSearch } from "react-icons/bs"
import { isSupportedFeature } from "../../utils/restfulAPI";

import SearchInput from "./SearchInput";
import ListOfClicks from "./ListOfClicks";
import DistancesSearch from "./DistancesSearch";


const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = L.latLng(40.5734, -105.0865);
const MAP_ZOOM_DEFAULT = 15;
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class Atlas extends Component {

    constructor(props) {

        super(props);
        
        this.checkForFeature = this.checkForFeature.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.getPlaces = this.getPlaces.bind(this);
        this.setMarker = this.setMarker.bind(this);
        this.getPlaces = this.getPlaces.bind(this);
        this.setPlace = this.setPlace.bind(this);
        this.setTour = this.setTour.bind(this);
        this.clearList = this.clearList.bind(this);
        this.removePlace = this.removePlace.bind(this);
        this.handleGeolocation = this.handleGeolocation.bind(this);
        this.reverseGeoCoding = this.reverseGeoCoding.bind(this);
        this.centerMapToIndex = this.centerMapToIndex.bind(this);
        this.requestUserLocation = this.requestUserLocation.bind(this);
        this.checkForFeature = this.checkForFeature.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);

        this.state = {
            markerPosition: null,
            mapCenter: MAP_CENTER_DEFAULT,
            listOfClicks: [],
            address: "",
            totalDistance: 0,
            userLocation: null,
            zoom: MAP_ZOOM_DEFAULT,
            searchToggle: false
        };
    
    }

    componentDidMount(){
       this.requestUserLocation();
    }

    render() {
        const { searchToggle } = this.state;
        return (
            <Container>
                <Row>
                    <Col sm={12} md={{ size: 10, offset: 1 }}>
                        {this.renderLeafletMap()}
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={{ size: 10, offset: 1 }}>
                        {searchToggle && this.renderSearchInput()}
                    </Col>
                </Row>
                <Row className="text-center mt-2">
                    <Col sm={12} md={{ size: 10, offset: 1 }}>
                        {this.checkForFeature('distances') && <div className="text-right"> Total Distance: {this.state.totalDistance} mi.</div>}
                        {this.renderList()}
                    </Col>
                </Row>
            </Container>
        );
    }

    checkForFeature(feature){
        const config = this.props.serverSettings.serverConfig;
        if(config == null){
            return false;
        } else {
            return isSupportedFeature(config, feature, config.features);
        }
    }

    renderSearchInput() {
        return <SearchInput setMarker={this.setMarker} 
                showMessage={this.props.showMessage}
                serverSettings={this.props.serverSettings}
                checkForFeature={this.checkForFeature}/>;
    }

    renderList() {
        return (
            <ListOfClicks
                listOfClicks = { this.state.listOfClicks }
                setTour = {this.setTour}
                setPlace = { this.setPlace }
                getPlaces = {this.getPlaces}
                clearList = { this.clearList }
                removePlace = { this.removePlace }
                centerMapToIndex = { this.centerMapToIndex }
                checkForFeature = { this.checkForFeature }
                serverSettings = { this.props.serverSettings }
            />
        );
    }

    renderLeafletMap() {
        return (
            <Map
                className={'mapStyle'}
                boxZoom={false}
                zoom={this.state.zoom}
                minZoom={MAP_MIN_ZOOM}
                maxZoom={MAP_MAX_ZOOM}
                maxBounds={MAP_BOUNDS}
                viewport={{center: this.state.mapCenter}}
                onClick={this.handleMapClick}
            >    
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
                {this.getMarker()}
                {this.getPolylines()}

                <Control position="bottomright">
                    {this.renderMapButtons()}
                </Control>
            </Map>
        );
    }

    renderMapButtons() {
        return (
            <>
                <Button onClick={this.toggleSearch} size="sm" color="primary" className="mr-2"><BsSearch/></Button>
                <Button id="findMe" onClick={this.requestUserLocation} size="sm" color="primary"><BsCursorFill/></Button>
            </>
        );
    }

    toggleSearch() {
        const { searchToggle } = this.state;
        this.setState({searchToggle: !searchToggle});
    }

    showMarkerPopup(ref) {
        if (ref) {
            ref.leafletElement.openPopup();
        }
    }

    async reverseGeoCoding(coordinates) {
        const data = await ( await fetch(GEOCODE_URL+`${coordinates.lng},${coordinates.lat}`)).json();
        const address = (data.address !== undefined) ? data.address.LongLabel : "Unknown";
        return address;
    }

    handleGeolocation(position) {
        const latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.setMarker(latlng);
        console.log(`The user is located at ${JSON.stringify(latlng)}.`);
        if (this.state.userLocation == null) {
            this.setState({userLocation: position})
        }
    }

    handleGeolocationError() {
        console.log("Error retrieving the user's position.");
    }

     
    requestUserLocation() {
        const {userLocation} = this.state
        if (userLocation != null) {
            this.handleGeolocation(userLocation)
        }

        else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.handleGeolocation, this.handleGeolocationError);
        }
    }

    handleMapClick(mapClickInfo) {
        this.setMarker(mapClickInfo.latlng);
    }

    setMarker(latLng) {
        if (latLng != null) {
            this.setPlace(latLng);
            this.setState({markerPosition: latLng, 
                           mapCenter: latLng});
        }
    }

    setPlace(latLng) {
        const { listOfClicks } = this.state;
        this.reverseGeoCoding(latLng).then((name) => {
            const place = { latitude: latLng.lat, longitude: latLng.lng, name };
            listOfClicks.push(place);
            this.setState({ listOfClicks, address: name }, this.handleDistances);
        });
    }

    async setTour(places) {
        for(let i = 0; i < places.length; i++) {
            let place = places[i];

            if (place["name"] == null) {
                const latLng = {lat: place.latitude, lng: place.longitude};
                place["name"] = await this.reverseGeoCoding(latLng);
            }

            place["latitude"] = parseFloat(place["latitude"]);
            place["longitude"] = parseFloat(place["longitude"]);
            places[i] = place;
        };
        this.setState({listOfClicks: places}, this.handleDistances);
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

    handleDistancesResponse(distances) {
        const { listOfClicks } = this.state;
        var totalDistance = 0;
        var numPlaces = listOfClicks.length;
        for(var i = 0; i < numPlaces; i++) {
            listOfClicks[i].distance = distances[i];
            totalDistance += distances[i];
        }
        this.setState({listOfClicks, totalDistance});
    }

    async handleDistances() {
        if(this.state.listOfClicks.length >= 2 && this.checkForFeature('distances')) {
            const distanceRequest = new DistancesSearch(this.getPlaces(), 3539); 
            await distanceRequest.sendDistancesRequest(this.props.serverSettings.serverPort);
            const distances = distanceRequest.getDistances();
            this.handleDistancesResponse(distances);
        }
        else {
            this.setState({totalDistance: 0});
        }
    }

    centerMapToIndex(index){
        const {listOfClicks} = this.state;
        const location = listOfClicks[index]
        const latlng = {lat: location.latitude, lng: location.longitude}
        this.setState({markerPosition: latlng, mapCenter: latlng, address: location.name});
    }

    clearList() {
        this.setState({listOfClicks: [], totalDistance: 0, markerPosition: null});
    }

    removePlace(index) {
        let newList = [];
        for (let i = 0; i < this.state.listOfClicks.length; i++) {
            if (i != index)
                newList.push(this.state.listOfClicks[i]);
        }
        this.setState({ listOfClicks: newList }, this.handleDistances);
    }

    getPlaces() {
        var places = [];
        for(var i = 0; i < this.state.listOfClicks.length; i++) {
            const place = {
                name: this.state.listOfClicks[i].name,
                latitude: this.state.listOfClicks[i].latitude.toString(),
                longitude: this.state.listOfClicks[i].longitude.toString()
            }
            places.push(place);
        }
        return places;
    }
    
    getStringMarkerPosition() {
        return (
          <div>  
            {this.state.address} <br/>
            {"Lat:  " + this.state.markerPosition.lat.toFixed(2) + ","} <br/>
            {"Long: " + this.state.markerPosition.lng.toFixed(2)}
          </div>
        );
    }
}

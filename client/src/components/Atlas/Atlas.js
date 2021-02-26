import React, { Component } from 'react';
import { Col, Container, Row, Button, Table } from 'reactstrap';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { latLng } from 'leaflet';

import CoordinatesInput from "./CoordinatesInput";

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
        this.requestUserLocation = this.requestUserLocation.bind(this);
        this.handleGeolocation = this.handleGeolocation.bind(this);
        this.reverseGeoCoding = this.reverseGeoCoding.bind(this);
        this.getStringMarkerPosition = this.getStringMarkerPosition.bind(this);
        
        this.state = {
            markerPosition: null,
            mapCenter: MAP_CENTER_DEFAULT,
            listOfClicks: [],
            address:"" ,
            addressList:[]
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
                            {this.renderFindMeButton()}
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
            <tbody className="text-center">
                {this.state.listOfClicks.map((place, index) => (
                    <tr key={index}>
                        <td>{this.state.addressList[index]}</td>
                        <td>{place.lat.toFixed(6)}</td>
                        <td>{place.lng.toFixed(6)}</td>
                        <td>
                            <Button id="xButton" color="primary" size="sm" onClick={this.removePlace.bind(this, index)} xs={1}>
                                X
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    }

    clearList() {
        this.setState({ listOfClicks: [] });
    }

    removePlace(index) {
        let newList = [];
        for (let i = 0; i < this.state.listOfClicks.length; i++) {
            if (i != index)
                newList.push(this.state.listOfClicks[i]);
        }
        this.setState({ listOfClicks: newList });
    }

    renderLeafletMap() {
        return (
            <Map
                className={'mapStyle'}
                boxZoom={false}
                useFlyTo={true}
                zoom={15}
                minZoom={MAP_MIN_ZOOM}
                maxZoom={MAP_MAX_ZOOM}
                maxBounds={MAP_BOUNDS}
                center={this.state.mapCenter}
                onClick={this.handleMapClick}
            >
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
                {this.getMarker()}
            </Map>
        );
    }

    renderFindMeButton() {
        return (
          <Button id="findMe" onClick={this.requestUserLocation} color="primary" block>Find Me</Button>
        );
      }

    requestUserLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.handleGeolocation, this.handleGeolocationError);
        }
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
            this.state.listOfClicks.unshift(latlng);
            this.reverseGeoCoding(latlng).then();
            this.setState({markerPosition: latlng,mapCenter: latlng});
        }
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
        const addressList = this.state.addressList;
        addressList.unshift(addressLabel);
        this.setState({addressList :addressList, address: addressLabel});
      }
}

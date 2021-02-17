import React, { Component } from 'react';
import { Col, Container, Row, Button, Table } from 'reactstrap';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = L.latLng(40.5734, -105.0865);
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class Atlas extends Component {

    constructor(props) {

        super(props);
        
        this.setMarker = this.setMarker.bind(this);
        this.clearList = this.clearList.bind(this);
        this.requestUserLocation = this.requestUserLocation.bind(this);
        this.handleGeolocation = this.handleGeolocation.bind(this);
        
        this.state = {
            markerPosition: null,
            mapCenter: MAP_CENTER_DEFAULT,
            listOfClicks: []
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
                    <br></br>
                    <Table hover bordered small>
                        <thead>
                            <tr>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>
                                    <Button color="primary" size="sm" onClick={this.clearList} 
                                    xs={1}>
                                        Clear
                                    </Button>
                                </th>
                            </tr>
                        </thead>
                        {this.renderList()}
                    </Table>
                </Container>
            </div>

        );
    }

    renderList() {
        return (
            <tbody>
                {this.state.listOfClicks.map((place, index) => (
                    <tr>
                        <td>{place.lat.toFixed(6)}</td>
                        <td>{place.lng.toFixed(6)}</td>
                        <td>
                            <Button color="primary" size="sm" onClick={this.removePlace.bind(this, index)} xs={1}>
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
                onClick={this.setMarker}
            >
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
                {this.getMarker()}
                {this.requestUserLocation}
            </Map>
        );
    }

    renderFindMeButton() {
        return (
          <Button onClick={this.requestUserLocation} color="primary" block>Find Me</Button>
        );
      }

    requestUserLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.handleGeolocation, this.handleGeolocationError);
        }
      }

    handleGeolocation(position) {
        const latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.state.listOfClicks.unshift(latlng);
        this.setState({mapCenter: latlng, markerPosition: latlng});
        console.log(`The user is located at ${JSON.stringify(latlng)}.`);
    }

    handleGeolocationError() {
        console.log("Error retrieving the user's position.");
    }

    setMarker(mapClickInfo) {
        this.state.listOfClicks.unshift(mapClickInfo.latlng);
        this.setState({ markerPosition: mapClickInfo.latlng });
    }

    getMarker() {
        if (this.state.markerPosition) {
            return (
                <Marker ref={(ref) => this.showMarkerPopup(ref)} position={this.state.markerPosition} icon={MARKER_ICON}>
                    <Popup offset={[0, -18]} className="font-weight-bold">
                        {this.getLatLngText(this.state.markerPosition)}
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

    getLatLngText(latLng) {
        return latLng.lat.toFixed(6) + ', ' + latLng.lng.toFixed(6);
    }

    processConfigResponse(FindResponse) {
        if (!isJsonResponseValid(FindResponse, FindSchema)) {
            this.processServerConfigError("Configuration Response Not Valid. Check The Server.");
        } else {
            this.processServerConfigSuccess(FindResponse);
        }
    }
}


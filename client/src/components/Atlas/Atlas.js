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

        this.state = {
            markerPosition: null,
            listOfClicks: []
        };

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
                    <br></br>
                    <Col xs={{ size: 3, offset: 9 }}>
                        <Button color="primary" size = "lg" onClick={this.clearList} xs={1}>
                            Clear List
                        </Button>
                    </Col>
                    <Table hover bordered small>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
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
                        <td>{index+1}</td>
                        <td>{place.lat}</td>
                        <td>{place.lng}</td>
                    </tr>
                ))} 
            </tbody>
        );
    }


    clearList() {
        this.setState({ listOfClicks: [] });
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
                center={MAP_CENTER_DEFAULT}
                onClick={this.setMarker}
            >
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
                {this.getMarker()}
            </Map>
            
           
        );
    }

    setMarker(mapClickInfo) {
        this.state.listOfClicks.unshift(mapClickInfo.latlng);
        this.setState({ markerPosition: mapClickInfo.latlng});
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
}


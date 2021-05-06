import React, { Component } from 'react';
import { Col, Container, Row, Button, Table, Modal, ModalHeader, ModalBody} from 'reactstrap';

import { Map, Marker, Popup, TileLayer, Polyline, LayersControl} from 'react-leaflet';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Control from 'react-leaflet-control';
import { BsCursorFill, BsSearch, BsGearFill } from "react-icons/bs"
import { isSupportedFeature } from "../../utils/restfulAPI";

import SearchInput from "./SearchInput";
import ListOfClicks from "./ListOfClicks";
import DistancesSearch from "./DistancesSearch";
import MapSettings from "./MapSettings";


const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = L.latLng(40.5734, -105.0865);
const MAP_ZOOM_DEFAULT = 15;
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const MAP_LAYERSCONTROL_POSITION = "topright";

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
        this.selectNewStartingLocation = this.selectNewStartingLocation.bind(this);
        this.reverseList = this.reverseList.bind(this);
        this.rgbCallback = this.rgbCallback.bind(this);
        this.setLineWidth = this.setLineWidth.bind(this);
        this.setLineStyle = this.setLineStyle.bind(this);
        this.getPolyStyle = this.getPolyStyle.bind(this);
        this.turnLinesOff = this.turnLinesOff.bind(this);
        this.opacityCallBack = this.opacityCallBack.bind(this);
        this.addNoteToPlace = this.addNoteToPlace.bind(this);
        this.renderMapLayers = this.renderMapLayers.bind(this);

        this.mapRef = React.createRef();

        this.state = {
            markerPosition: null,
            mapCenter: MAP_CENTER_DEFAULT,
            listOfClicks: [],
            address: "",
            totalDistance: 0,
            userLocation: null,
            zoom: MAP_ZOOM_DEFAULT,
            searchToggle: false,
            rgb: '#11a1e8',
            lineWidth: "3",
            lineOpacity: "1",
            lineStyle: false,
            linesOn: true
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
                    <Col sm={12} md={{ size: 10, offset: 1 }}>
                        {searchToggle && this.renderSearchInput()}
                    </Col>
                </Row>
                <Row className="text-center mt-3">
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
                checkForFeature={this.checkForFeature}
                toggleSearch={this.toggleSearch}
                />;
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
                selectNewStartingLocation = { this.selectNewStartingLocation}
                reverseList = {this.reverseList}
                addNoteToPlace = {this.addNoteToPlace}
            />
        );
    }

    renderLeafletMap() {
        return (
            <Map
                ref={this.mapRef}
                className={'mapStyle'}
                boxZoom={false}
                zoom={this.state.zoom}
                minZoom={MAP_MIN_ZOOM}
                maxZoom={MAP_MAX_ZOOM}
                maxBounds={MAP_BOUNDS}
                viewport={{center: this.state.mapCenter}}
                onClick={this.handleMapClick}
            
            >    
                 {this.renderLayersControl()}
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION} />
                {this.getMarker()}
                {this.getPolylines(this.state.rgb, this.state.lineWidth, this.state.lineOpacity)}
                <Control position="bottomright">
                    {this.renderMapButtons()}
                </Control>
            </Map>

        );
    }

    renderMapButtons() {
        return (
            <>
                <Button onClick={this.toggleSearch} size="sm" color="primary" className="mr-2">
                    <BsSearch/>
                </Button>
                <Button id="findMe" onClick={this.requestUserLocation} size="sm" color="primary" className="mr-2">
                    <BsCursorFill/>
                </Button>
                <MapSettings
                    setLineWidth = {this.setLineWidth}
                    rgbCallback = {this.rgbCallback}
                    opacityCallBack = {this.opacityCallBack}
                    setLineStyle = {this.setLineStyle}
                    turnLinesOff = {this.turnLinesOff}
                />
            </>
        );
    }

    renderLayersControl() {
        return (
          <LayersControl position={MAP_LAYERSCONTROL_POSITION}>
              {this.renderMapLayers(true, 
                "OpenStreetMap.Mapnik", 
                "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              )}
              {this.renderMapLayers(false, 
                "OpenStreetMap.BlackAndWhite", 
                "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
                "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              )}
              {this.renderMapLayers(false, 
                "USGS.USImageryTopo", 
                "Tiles courtesy of the <a href=&quot;https://usgs.gov/&quot;>U.S. Geological Survey</a>",
                "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}"
              )}
              {this.renderMapLayers(false, 
                "Carto Dark", 
                "",
                "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              )}
            </LayersControl>
        )
      }
      
      renderMapLayers(checked, name, attribution, url) {
        /*LayersControl.BaseLayer with checked option is the map which is loaded on start*/
        return (
          <LayersControl.BaseLayer checked={checked} name={name}>
            <TileLayer attribution={attribution} url={url}/>
          </LayersControl.BaseLayer>
        )
      }


    rgbCallback(color){
        this.setState({rgb: color});
    }

    opacityCallBack(opacity){
        this.setState({lineOpacity: opacity});
    }

    setLineWidth(width){
        this.setState({lineWidth: width});
    }

    setLineStyle(check){
        this.setState({lineStyle: check});
    }

    turnLinesOff(check){
        this.setState({linesOn: check});
    }


    toggleSearch() {
        const { searchToggle } = this.state;
        this.setState({
            searchToggle: !searchToggle, 
            zoom: this.mapRef.current.leafletElement.getZoom()});
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
            this.setState({
                markerPosition: latLng, 
                mapCenter: latLng,
                zoom: this.mapRef.current.leafletElement.getZoom()
            });
        }
    }

    setPlace(latLng) {
        const { listOfClicks } = this.state;
        this.reverseGeoCoding(latLng).then((name) => {
            const place = {  notes: "", latitude: latLng.lat, longitude: latLng.lng, name};
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
        this.setState({
            listOfClicks: places, 
            zoom: this.mapRef.current.leafletElement.getZoom()}, 
            this.handleDistances
        );
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

    getPolyStyle(){
        if(this.state.lineStyle){
            return '10,20';
        }
        else {
            return '0,0';
        }
    }

    getPolylines(rgb, width, lineOpac) {
        const {listOfClicks} = this.state;
        if (listOfClicks.length > 1 && this.state.linesOn) {
            let polyStyle = this.getPolyStyle();
            let polylineArray = this.extractLines(listOfClicks);        
            return <Polyline positions={polylineArray} weight = {width} color= {rgb} dashArray = {polyStyle} opacity= {lineOpac}/> //color= 'red'/>
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
        this.setState({listOfClicks: [], totalDistance: 0, markerPosition: null,
            zoom: this.mapRef.current.leafletElement.getZoom()
        });
    }
    
    reverseList(){
        this.setState({
            listOfClicks: this.state.listOfClicks.reverse(),
            zoom: this.mapRef.current.leafletElement.getZoom()
        });
    }
    
    removePlace(index) {
        let newList = [];
	    let latlng = this.state.markerPosition;
            for (let i = 0; i < this.state.listOfClicks.length; i++) {
                if (i != index)
                    newList.push(this.state.listOfClicks[i]);
	        }
	    if (latlng != null && latlng.lat == this.state.listOfClicks[index].latitude && latlng.lng == this.state.listOfClicks[index].longitude) {
		    latlng = null;
	    }
        this.setState({ listOfClicks: newList, markerPosition: latlng , zoom: this.mapRef.current.leafletElement.getZoom()}, this.handleDistances);
    }

    getPlaces() {
        var places = [];
        for(var i = 0; i < this.state.listOfClicks.length; i++) {
        
            const place = {
                name: this.state.listOfClicks[i].name,
                latitude: this.state.listOfClicks[i].latitude.toString(),
                longitude: this.state.listOfClicks[i].longitude.toString(),
                notes: this.state.listOfClicks[i].notes
            }
            places.push(place);
        }
        return places;
    }

    selectNewStartingLocation(index){
        const {listOfClicks} = this.state;
        let tempArray = listOfClicks.slice(index);
        let list = tempArray.concat(listOfClicks.slice(0,index));
        this.setState({listOfClicks: list});
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

    addNoteToPlace(index,notes) {
        const newListOfClicks = this.state.listOfClicks
        newListOfClicks[index].notes = notes

        this.setState({listOfClicks: newListOfClicks})
    }
}

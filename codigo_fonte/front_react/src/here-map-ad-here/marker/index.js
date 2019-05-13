import { Component } from 'react';

class MarkerAdHERE extends Component {
    constructor(props) {
        super(props);
        this.marker = null;
    }

    componentDidUpdate(prevProps) {
        // update the lat and lng when it changes
        if (this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng) this.updateMarker();
    }

    componentWillUnmount() {
        const { map } = this.props;

        if (this.isEmpty(map)) return;
        map.removeObject(this.marker);
    }

    createMarker = () => {
        const { map } = this.props;

        if (this.marker) map.removeObject(this.marker);
        const marker = new window.H.map.Marker({ lat: this.props.lat, lng: this.props.lng })
        map.addObject(marker);
        this.marker = marker;

        this.zoomToMarker()
    };

    updateMarker = () => {
        this.marker.setPosition({
            lat: this.props.lat,
            lng: this.props.lng,
        });
        // this.zoomToMarker()
    };

    zoomToMarker = () => {
        const { map } = this.props;

        map.setZoom(18);
        map.setCenter(this.marker.getPosition());
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    }

    render() {
        const { map } = this.props;
        if (!this.isEmpty(map) && !this.marker) {
            this.createMarker();
        } else if (this.marker) {
            this.updateMarker();
        }
        return null;
    }
}

export default MarkerAdHERE;
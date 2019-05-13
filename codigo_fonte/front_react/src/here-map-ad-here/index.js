import React, { Component } from 'react';

class HereMapAdHERE extends Component {
  constructor(props) {
    super(props);

    if (this.props.onMapClick !== undefined) {
      this.props.onMapClick.bind(this);
    }

    this.state = {
      center: this.props.center,
      zoom: this.props.zoom,
      interactive: this.props.interactive === undefined ? true : this.props.interactive
    };
  }

  componentDidMount() {
    var platform = new window.H.service.Platform({
      app_id: "oZFjEHU1ylRxolutvlcv",
      app_code: "FlOstO_gPjTh-B4XrRiwyg",
      useCIT: true,
      useHTTPS: true
    });

    var defaultLayers = platform.createDefaultLayers();
    var map = new window.H.Map(document.getElementById('map'), defaultLayers.normal.map, {
      center: this.state.center,
      zoom: this.state.zoom,
      pixelRatio: 2
    });

    var _this = this;

    map.addEventListener('tap', function (evt) {
      var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      var lat = Number(coord.lat);
      var lng = Number(coord.lng);

      // alert(
      //   'Clicked at ' +
      //     Math.abs(coord.lat.toFixed(4)) +
      //     (coord.lat > 0 ? 'N' : 'S') +
      //     ' ' +
      //     Math.abs(coord.lng.toFixed(4)) +
      //     (coord.lng > 0 ? 'E' : 'W')
      // );

      if (_this.props.onMapClick !== undefined) {
        return _this.props.onMapClick({
          lat: lat,
          lng: lng
        });
      }
    });

    map.setBaseLayer(defaultLayers.terrain.traffic);
    // map.setBaseLayer(defaultLayers.terrain.map);

    if (this.state.interactive) {
      var behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      var ui = window.H.ui.UI.createDefault(map, defaultLayers, 'pt-BR');
      this.onMapLoaded(map, behavior, this.factory);
      ui.getControl('mapsettings').setVisibility(false)
      ui.getControl('zoom').setAlignment('top-right');
      this.restrictMap(map)
      return
    }

    this.onMapLoaded(map, null, this.factory);


  }

  onMapLoaded = (map, behavior, factory) => {
    this.setState({
      map,
      behavior,
      factory,
    });

    // this.props.onMapLoaded(map);
  };

  restrictMap(map) {

    var bounds = new window.H.geo.Rect(-1.485734, -48.514252, -1.204631, -48.418121);

    map.getViewModel().addEventListener('sync', function () {
      var center = map.getCenter();

      if (!bounds.containsPoint(center)) {
        if (center.lat > bounds.getTop()) {
          center.lat = bounds.getTop();
        } else if (center.lat < bounds.getBottom()) {
          center.lat = bounds.getBottom();
        }
        if (center.lng < bounds.getLeft()) {
          center.lng = bounds.getLeft();
        } else if (center.lng > bounds.getRight()) {
          center.lng = bounds.getRight();
        }
        map.setCenter(center);
      }
    });

    //Debug code to visualize where your restriction is
    // map.addObject(new window.H.map.Rect(bounds, {
    //   style: {
    //     fillColor: 'rgba(55, 85, 170, 0.1)',
    //     strokeColor: 'rgba(55, 85, 170, 0.6)',
    //     lineWidth: 8
    //   }
    // }
    // ));
  }


  render() {
    const { map, behavior, factory } = this.state;
    const { children } = this.props;
    return <div id="map" {...this.props} style={{ height: '100%', width: '100%' }} onMapLoaded={this.onMapLoaded}>
      {React.Children.map(children, child => {
        if (!child) return null;
        return React.cloneElement(child, { map, behavior, factory });
      })}
    </div>;
  }
}

export default HereMapAdHERE;

// == COMO USAR ==

// -- NO IMPORT --
// import HereMapAdHERE from '../../components/here-map-ad-here';

// -- NO CONSTRUTOR --
// this.state = {
//   center: {
//     lat: -1.3975684,
//     lng: -48.4752782
//   }
// };

// -- NO RENDER() --


/* <div style={{height: '100vh'}}>
<HereMapAdHERE
  center={this.state.center}
  zoom={12}
  onMapClick={(t) => console.log(t)}
/>
</div> */


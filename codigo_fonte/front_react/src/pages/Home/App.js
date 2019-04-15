import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import { HereMap, Marker } from "@wolfmatrix/react-here-maps";
import auth from '../../config/auth/index'


const style = {
  fontSize: "10px"
};

class App extends Component {

  state = {
    img: "",
    ruas: [],
    lista: [],
    details: false,
    mapProps: {
      lat: -1.45716,
      lng: -48.43464,
      zoom: 13
    }
  }

  componentDidMount() {

    this.getRuas()

  }

  clickMarker = async (e, index) => {
    e.preventDefault()

    // console.log(this.state.ruas[index].idRua)
    if (!this.state.details) {
      try {
        const data = await axios.get("http://localhost:3001/gethere/cruzamento/" + this.state.ruas[index].idRua, {
          headers: {
            Authorization: "Bearer " + auth.isAuth()
          }
        });
        console.log(data)
        this.setState({
          lista: data.data.data.rua_transversais,
          details: true
        })

      } catch (e) {
        console.log(e)
      }
    } else {

      var string = this.state.lista[index].pontosDeEncontro[0]
      var arrayOfStrings = string.split(" ");
      var string2 = arrayOfStrings[0].split(",")

      // console.log(parseFloat(string2[0]))

      // this.setState({
      //   mapProps: {
      //     lat: 1,
      //     lng: 1

      //     // lat: parseFloat(string2[0]),
      //     // long: parseFloat(string2[1]),
      //     // zoom: 14
      //   }
      // })
      // this.setState({
      //   mapProps: {
      //     lat:
      //   }
      // })
    }

  }

  getRuas = async () => {

    try {
      const data = await axios.get("http://localhost:3001/gethere/cruzamentos", {
        headers: {
          Authorization: "Bearer " + auth.isAuth()
        }
      });

      this.setState({
        ruas: data.data.data,
        lista: data.data.data,
        details: false
      })

      // console.log(data.data.data);

    } catch (e) {
      console.log(e)
    }

  }

  renderItems = () => {
    if (this.state.ruas.length === 0) {

    } else {
      if (!this.state.details) {
        return this.state.lista.map((value, index) => {
          if (index < 10) {
            // console.log('menor q 10')
            return (
              <p class="list-group-item list-group-item-action" onClick={(e) => this.clickMarker(e, index)}>{value.nomeRuaPrincipal}</p>
            )
          }
        })
      } else {
        // console.log(this.state.lista)
        return this.state.lista.map((value, index) => {
          if (index < 10) {
            // console.log('menor q 10')
            return (
              <p class="list-group-item list-group-item-action" onClick={(e) => this.clickMarker(e, index)}>{value.nomeRuaTransversal}</p>
            )
          }
        })
      }
    }
  }

  render() {

    return (
      <div className="App row mx-auto" >
        <div className="mapStyle">
          <HereMap
            initialCenter={{ lat: this.state.mapProps.lat, lng: this.state.mapProps.lng }}
            zoom={this.state.mapProps.zoom}
            setMinZoomOut={13}
            liveTrafficEnable={true}

            appConfig={{
              appId: "oZFjEHU1ylRxolutvlcv",
              appCode: "FlOstO_gPjTh-B4XrRiwyg"
            }}
          >
            {/* <Marker infoBubbleStyle={style} markerProps={[{ lat: this.state.mapProps.lat, lng: this.state.mapProps.lng }]} bounds /> */}
          </HereMap>
        </div>


        <section className="sectionCard mx-auto">
          <div className="card cardStyle">
            <div class="card-title" style={{ flexDirection: "row" }}>
              <h5> Ruas</h5>
            </div>
            <div class="list-group">
              {this.renderItems()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;

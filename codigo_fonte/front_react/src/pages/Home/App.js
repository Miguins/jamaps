import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import { HereMap } from "@wolfmatrix/react-here-maps";
import auth from '../../config/auth/index'

class App extends Component {

  state = {
    img: "",
    ruas: []
  }

  componentDidMount() {

    this.getRuas()

  }

  getRuas = async () => {


    try {
      const data = await axios.get("http://localhost:3001/gethere/cruzamentos", {
        headers: {
          Authorization: "Bearer " + auth.isAuth()
        }
      });

      this.setState({
        ruas: data.data.data
      })

      // console.log(data.data.data);

    } catch (e) {
      console.log(e)
    }
  }

  renderItems = () => {
    if (this.state.ruas.length === 0) {

    } else {

      return this.state.ruas.map((value, index) => {
        if (index < 10) {
          console.log('menor q 10')
          return (
            <p class="list-group-item list-group-item-action">{value.nomeRuaPrincipal}</p>
          )
        }
      })

    }
  }

  render() {

    return (
      <div className="App row mx-auto" >
        <div className="mapStyle">
          <HereMap
            initialCenter={{ lat: -1.45716, lng: -48.43464 }}
            zoom={13}
            setMinZoomOut={13}
            liveTrafficEnable={true}

            appConfig={{
              appId: "oZFjEHU1ylRxolutvlcv",
              appCode: "FlOstO_gPjTh-B4XrRiwyg"
            }}
          />
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

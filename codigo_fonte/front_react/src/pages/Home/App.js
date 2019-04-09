import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import { HereMap } from "@wolfmatrix/react-here-maps";


class App extends Component {

  state = {
    img: ""
  }

  getFlowLayer = async () => {
    // var url = "https://tiles.traffic.api.here.com/traffic/6.0/tiles/12/1496/2064/256/png32?app_id=oZFjEHU1ylRxolutvlcv&app_code=FlOstO_gPjTh-B4XrRiwyg"

    // try {
    //   const data = axios.get(url, {
    //     responseType: 'arraybuffer'
    //   });

    //   Promise.resolve(data).then((value) => {
    //     console.log(value)
    //     var test = new Buffer(value.data, 'binary').toString('base64')
    //     console.log(test)
    //     this.setState({
    //       img: test
    //     })
    //   })

    // const newResp = JSON.parse(data)
    // console.log(newResp)
    // this.setState({
    //   img: data
    // }
    // } catch (e) {
    //   console.log(e)
    // }

  }

  render() {
    return (
      <div className="App">

        <HereMap
          initialCenter={{ lat: -1.45716, lng: -48.43464 }}
          zoom={13}
          setMinZoomOut={13}
          liveTrafficEnable={true}
          style={{ width: "95%", height: "100vh" }}
          appConfig={{
            appId: "oZFjEHU1ylRxolutvlcv",
            appCode: "FlOstO_gPjTh-B4XrRiwyg"
          }}
        />

      </div>
    );
  }
}

export default App;

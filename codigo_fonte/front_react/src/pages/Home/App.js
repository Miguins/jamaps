import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
// import { HereMap, Marker } from "@wolfmatrix/react-here-maps";

import { GoLocation, GoArrowLeft, GoSearch } from 'react-icons/go'
import GoogleMapReact from 'google-map-react';
import auth from '../../config/auth/index'


const MapMarker = ({ text }) => {
  return (
    <GoLocation />
  )
}


class App extends Component {

  state = {
    busca: false,
    img: "",
    ruas: [],
    lista: [],
    details: false,
    center: {
      lat: -1.4476205,
      lng: -48.4736209,
    },
    zoom: 13,
    markerCenter: null,
    ruaAtual: null,
    paginaAtual: 0,
    ultimoPagina: 9,
    primeiroPagina: 0,
    paginaTotal: 0
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
        // console.log(data)
        this.setState({
          lista: data.data.data.rua_transversais,
          details: true,
          busca: false,
          ruaAtual: this.state.ruas[index].nomeRuaPrincipal,
          paginaAtual: 0,
          ultimoPagina: 9
        })

      } catch (e) {
        console.log(e)
      }
    } else {

      var string = this.state.lista[index].pontosDeEncontro

      var string3 = string[string.length - 1]
      // console.log(string)

      var arrayOfStrings = string3.split(" ");

      for (let index = 0; index < arrayOfStrings.length; index++) {

        console.log(arrayOfStrings[index])

      }

      var string2 = arrayOfStrings[0].split(",")

      var center = {
        lat: parseFloat(string2[0]),
        lng: parseFloat(string2[1]),
      }

      this.setState({
        center: center,
        zoom: 18,
        markerCenter: center,
      })
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

      var pageNumbers
      for (let i = 1; i <= Math.ceil(data.data.data.length / 9); i++) {
        pageNumbers++;
      }


      this.setState({
        ruas: data.data.data,
        lista: data.data.data,
        details: false,
        busca: false,
        paginaTotal: pageNumbers,
        ultimoPagina: 9
      })




      // console.log(data.data.data);

    } catch (e) {
      console.log(e)
    }

  }

  renderItems = () => {
    if (this.state.ruas.length === 0) {
      return null
    } else {
      if (!this.state.details) {
        if (this.state.busca) {
          return this.state.lista.map((value, index) => {
            if (index >= 9 * this.state.paginaAtual && index < this.state.ultimoPagina) {
              // console.log(value)
              return (
                // <p key={index} className="list-group-item list-group-item-action" onClick={(e) => this.clickMarker(e, index)}>{value.nomeRuaPrincipal}</p>
                <tr onClick={(e) => this.clickMarker(e, index)}>
                  <td key={index}>{value.nomeRuaPrincipal}</td>
                  <td key={index}>9.0</td>
                </tr>
              )
            }
            return null
          })
        }
        return this.state.ruas.map((value, index) => {
          if (index >= 9 * this.state.paginaAtual && index < this.state.ultimoPagina) {
            // console.log(value)
            return (
              // <p key={index} className="list-group-item list-group-item-action" onClick={(e) => this.clickMarker(e, index)}>{value.nomeRuaPrincipal}</p>
              <tr key={index} onClick={(e) => this.clickMarker(e, index)}>
                <td >{value.nomeRuaPrincipal}</td>
                <td >9.0</td>
              </tr>

            )
          }
          return null
        })
      } else {
        // console.log(this.state.lista)
        return this.state.lista.map((value, index) => {
          if (index >= 9 * this.state.paginaAtual && index < this.state.ultimoPagina) {
            // console.log('to aqui')
            return (
              // <p key={index} className="list-group-item list-group-item-action" onClick={(e) => this.clickMarker(e, index)}>{value.nomeRuaTransversal}</p>
              <tr key={index} onClick={(e) => this.clickMarker(e, index)}>
                <td >{value.nomeRuaTransversal}</td>
                <td >9.0</td>
              </tr>
            )
          }
          return null
        })
      }
    }
  }

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  }

  renderRua = () => {
    // console.log(this.state.ruaAtual)
    if (this.state.ruaAtual !== null) {
      // console.log("foi")
      return (
        <div>
          <button style={{ height: 40, width: 50 }} className="btn btn-light" onClick={() => this.setState({ ruaAtual: null, details: false })} ><GoArrowLeft /></button>
          <h5 className="text-titulo-clicked">{this.state.ruaAtual}</h5>
        </div>
      )
    } else {
      return <h5 className="text-titulo">Totens</h5>
    }
  }

  busca = (e) => {
    e.preventDefault()
    var array = []
    // var nomeRua
    this.state.ruas.map((rua, index) => {
      // console.log(rua.nomeRuaPrincipal)
      if (rua.nomeRuaPrincipal.toLowerCase().includes(this.refs.search.value.toLowerCase())) {
        // console.log("Contem");
        array.push(rua)
      }
      return null
    })
    console.log(array)
    this.setState({
      lista: array,
      ruaAtual: "Pesquisa",
      busca: true,
      details: false
    })
    return null
  }

  validarPagina = (e) => {
    const pagina = this.state.paginaAtual
    const ultimo = this.state.ultimoPagina
    if ((this.state.ruas.length / 9) - 1 > pagina) {

      this.setState({
        paginaAtual: pagina + 1,
        ultimoPagina: ultimo + 9
      })
    }

  }

  _pagination = (e) => {
    // e.preventDefault()

    for (let i = this.state.paginaAtual; i < this.state.paginaAtual + 2; i++) {
      return (
        <li>{i + 1}</li>
      )
    }


    // Logic for displaying todos
    // const indexOfLastTodo = this.state.paginaAtual * 9
    // const indexOfFirstTodo = indexOfLastTodo - 9

  }

  render() {

    return (
      <div className="App row mx-auto" >
        <div className="mapStyle">
          {/* {console.log(this.state.mapProps.lat)} */}

          <GoogleMapReact
            onChange={this._onChange}
            bootstrapURLKeys={{ key: "AIzaSyC2FHGrra6HIBgfKGo7-cnsDllhkQdbEUE" }}
            center={this.state.center}
            zoom={this.state.zoom}>

            {this.state.markerCenter ? <MapMarker lat={this.state.markerCenter.lat} lng={this.state.markerCenter.lng} /> : null}

          </GoogleMapReact>

          {/* <HereMap
            initialCenter={{ lat: this.state.center.lat, lng: this.state.center.lng }}
            zoom={this.state.zoom}
            setMinZoomOut={13}
            liveTrafficEnable={true}
            onChange={this._onChange}
            key={Math.random()}
            appConfig={{
              appId: "oZFjEHU1ylRxolutvlcv",
              appCode: "FlOstO_gPjTh-B4XrRiwyg"
            }}
          > */}
          {/* <Marker markerProps={[{ lat: -1.4493231, lng: -48.4827796 }]} />
            <Marker markerProps={[{ lat: -1.4326977, lng: -48.4660724 }]} />
            <Marker markerProps={[{ lat: -1.4343338, lng: -48.459534 }]} />
            <Marker markerProps={[{ lat: -1.4448104, lng: -48.4917312 }]} /> */}
          {/* </HereMap> */}

        </div>


        <section className="sectionCard">
          <div className="card card-style">
            <div className="card-title" >

              {this.renderRua()}

              <form className="form-inline search-form" style={{ marginTop: 5 }}>
                <input className="form-control search-home" ref="search" type="search" placeholder="Search" aria-label="Search" style={{ marginRight: 2 }} />
                <button className="btn btn-outline-success search-button" type="submit" onClick={(e) => this.busca(e)}><GoSearch /></button>
              </form>

            </div>
            <div className="list-group">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Rua</th>
                    <th scope="col">Tráfego</th>
                  </tr>
                </thead>
                <tbody>

                  {this.renderItems()}

                </tbody>
              </table>

              <nav aria-label="Page navigation example paginas">
                <ul className="pagination">
                  <li className="page-item">
                    <button className="page-link" onClick={(e) => null} aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </button>
                  </li>

                  {this._pagination()}

                  <li className="page-item">
                    <button className="page-link" onClick={(e) => this.validarPagina(e)} aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;

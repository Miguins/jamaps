import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import AdHereMap from '../../here-map-ad-here/index'
import Marker from '../../here-map-ad-here/marker/index'
import { GoArrowLeft, GoSearch } from 'react-icons/go'
import Pagination from 'react-js-pagination'
import auth from '../../config/auth/index'
import { withRouter } from 'react-router-dom'

class App extends Component {

  state = {
    activePage: 1,
    busca: false,
    img: "",
    ruas: [],
    lista: [],
    details: false,
    center: {
      lat: -1.4476205,
      lng: -48.4736209,
    },
    zoom: 14,
    markerCenter: null,
    ruaAtual: null,
    paginaAtual: 1,
    pageList: []
  }

  componentDidMount() {
    this.getRuas()
  }

  handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    this.setState({ paginaAtual: pageNumber });
  }

  clickMarker = async (e, index) => {
    e.preventDefault()

    // console.log(this.state.ruas[index].idRua)
    if (!this.state.details) {
      try {
        // var urlLocal = "http://localhost:3001/"
        var urlHeroku = "https://back-jamapas2.herokuapp.com/"
        const data = await axios.get(urlHeroku + "gethere/cruzamento/" + this.state.ruas[index].idRua, {
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
          paginaAtual: 1,
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
      // var urlLocal = "http://localhost:3001/"
      var urlHeroku = "https://back-jamapas2.herokuapp.com/"
      const data = await axios.get(urlHeroku + "gethere/cruzamentos", {
        headers: {
          Authorization: "Bearer " + auth.isAuth()
        }
      });

      var pageList = []


      for (var i = 0; i < data.data.data.length / 8; i++) {
        var itens = []
        for (var j = i * 8; j < (i * 8) + 8; j++) {
          if (data.data.data[j] !== undefined) {

            itens[j] = data.data.data[j]
          }
        }
        pageList[i] = itens
      }


      this.setState({
        ruas: pageList,
        lista: pageList,
        details: false,
        busca: false,
      })

      // console.log(data);

    } catch (e) {
      console.log(e)
    }

  }

  renderItems = () => {

    if (this.state.lista.length === 0) {
      return null
    }
    // console.log(this.state.lista)
    return this.state.lista[this.state.paginaAtual - 1].map((value, index) => {

      // arrayOfStrings 0 = ano e 1 = mes 
      var arrayOfStrings = value.created_at.split("-");
      // arrayOfStrings2 0 = dia
      var arrayOfStrings2 = arrayOfStrings[2].split("T");
      // arrayOfStrings3 0 = hora e 1 = minuto
      var arrayOfStrings3 = arrayOfStrings2[1].split(":");
      console.log(" Hora: " + arrayOfStrings3[0] + ":" + arrayOfStrings3[1] + "Dia: " + arrayOfStrings2[0] + " Mes: " + arrayOfStrings[1] + " Ano: " + arrayOfStrings[0])

      return (
        // <p key={index} className="list-group-item list-group-item-action" onClick={(e) => this.clickMarker(e, index)}>{value.nomeRuaTransversal}</p>
        <div key={index}
          style={{
            fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
            display: 'flex',
            position: 'relative',
            flexDirection: 'row',
            color: 'white',
            padding: 10,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            width: "100%",
            margin: 5,
            cursor: "pointer",
            background: "rgba(39, 46, 69, 0.6)",
            // color: "#fff",
            // border: "1px solid #6b37af",
            borderRadius: 6
          }}>



          <h4 style={{ marginBottom: 0, color: 'white' }}>{value.nomeRuaPrincipal}</h4>


          {/* <div style={{ display: 'flex', justifyContent: 'right', marginLeft: 15 }}>
                        <h4>{(rua.value / cont).toFixed(1)}</h4>
                    </div> */}

        </div>
      )

    })


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
          <button style={{ height: 40, width: 50 }} className="btn btn-light" onClick={() => this.setState({ ruaAtual: null, details: false, markerCenter: null })} ><GoArrowLeft /></button>
          <h5 className="text-titulo-clicked">{this.state.ruaAtual}</h5>
        </div>
      )
    } else {
      return <h5 className="text-titulo" style={{ color: "#fff" }}>Totens</h5>
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
    // console.log(array)
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

          <AdHereMap key={Math.random()} onChange={this._onChange} center={this.state.center} zoom={this.state.zoom} onMapLoaded={() => { }}>
            {this.state.markerCenter ? <Marker lat={this.state.markerCenter.lat} lng={this.state.markerCenter.lng} /> : null}
          </AdHereMap>

        </div>


        <section className="sectionCard" >
          <div className="card card-style" style={{ backgroundColor: 'rgb(32, 38, 60, 0.70)' }}>
            <div className="card-title" >

              {this.renderRua()}

              <form className="form-inline search-form" style={{ marginTop: 5 }}>
                <input className="form-control search-home" ref="search" type="search" placeholder="Search" aria-label="Search" style={{ marginRight: 2 }} />
                <button className="btn btn-outline-success search-button" type="submit" onClick={(e) => this.busca(e)}><GoSearch /></button>
              </form>

            </div>
            <div className="list-group">
              <div className="table table-hover">
                {/* <thead>
                  <tr>
                    <th scope="col">Rua</th>
                    <th scope="col">Tráfego</th>
                  </tr>
                </thead> */}
                {/* <tbody> */}

                {this.renderItems()}

                {/* </tbody> */}
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  activePage={this.state.paginaAtual}
                  itemsCountPerPage={8}
                  totalItemsCount={this.state.lista.length}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(App);

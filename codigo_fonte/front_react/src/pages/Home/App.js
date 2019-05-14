import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import AdHereMap from '../../here-map-ad-here/index'
import Marker from '../../here-map-ad-here/marker/index'
import { GoArrowLeft, GoSearch, GoInfo } from 'react-icons/go'
import Pagination from 'react-js-pagination'
import { withRouter } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { RotateSpinner } from 'react-spinners-kit';
import { IoIosArrowForward } from 'react-icons/io'

class App extends Component {

  state = {
    loading: true,
    loadingLista: false,
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
    pageList: [],
    oldList: [],
    listaTotem: [],
    activePage: 1
  }

  componentDidMount() {
    this.getRuas()
    this.getTotens()
    this.setState({
      loading: false
    })
  }

  handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    this.setState({ paginaAtual: pageNumber });
  }

  getTotens = async () => {

    try {
      // var urlLocal = "http://localhost:3001/"
      var urlHeroku = "https://back-jamapas2.herokuapp.com/"
      const data = await axios.get(urlHeroku + "totems", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('auth')
        }
      });

      var pageList = []


      for (var i = 0; i < data.data.data.length / 7; i++) {
        var itens = []
        for (var j = i * 7; j < (i * 7) + 7; j++) {
          if (data.data.data[j] !== undefined) {

            itens[j] = data.data.data[j]
          }
        }
        pageList[i] = itens
      }

      // console.log(pageList)

      this.setState({
        listaTotem: data.data.data,
        pageList: pageList,
      })

      // console.log(data);

    } catch (e) {
      console.log(e)
      this.setState({
        loading: false
      })
    }
  }

  getTransversais = async () => {

    // console.log(this.state.ruas[index].idRua)
    if (!this.state.details) {
      var oldList = this.state.lista
      try {
        // var urlLocal = "http://localhost:3001/"
        var urlHeroku = "https://back-jamapas2.herokuapp.com/"
        const data = await axios.get(urlHeroku + "gethere/cruzamento/" + this.state.ruaAtual.idRua, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('auth')
          }
        });
        var cont = 0
        data.data.data.rua_transversais.map((value) => {
          if (value.nomeRuaTransversal === data.data.data.rua_transversais[0].nomeRuaTransversal) {
            cont++
          }
        })

        // console.log(data)
        let counts = data.data.data.rua_transversais.reduce((prev, curr) => {
          let count = prev.get(curr.nomeRuaTransversal) || 0;
          // console.log(prev)
          prev.set(curr.nomeRuaTransversal, curr.nivelDeTrafego + count);
          return prev;
        }, new Map());

        // then, map your counts object back to an array
        let reducedObjArr = [...counts].map(([nomeRuaTransversal, trafego]) => {
          return { nomeRuaTransversal, trafego }
        })
        console.log(reducedObjArr)

        var pageList = []


        for (var i = 0; i < reducedObjArr.length / 8; i++) {
          var itens = []
          for (var j = i * 8; j < (i * 8) + 8; j++) {
            if (reducedObjArr[j] !== undefined) {

              itens[j] = reducedObjArr[j]
            }
          }
          pageList[i] = itens
        }

        this.setState({
          lista: pageList,
          details: true,
          busca: false,
          oldList: oldList
        })

      } catch (e) {
        console.log(e)
      }
    } else {

      var string = this.state.ruaAtual.pontosDeEncontro

      var string3 = string[string.length - 1]
      // console.log(string)

      var arrayOfStrings = string3.split(" ");

      for (let index = 0; index < arrayOfStrings.length; index++) {

        // console.log(arrayOfStrings[index])

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
          Authorization: "Bearer " + localStorage.getItem('auth')
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
        lista: pageList,
        details: false,
        busca: false,
      })

      // console.log(data);

    } catch (e) {
      console.log(e)
    }

  }

  renderTotens = () => {

    if (this.state.pageList.length === 0) {
      return null
    }

    return this.state.pageList[this.state.activePage - 1].map((totem, index) => {
      console.log(totem)
      return (


        <div key={index} style={{
          fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
          display: 'flex',
          position: 'relative',
          flexDirection: 'row',
          color: 'white',
          padding: 10,
          marginLeft: 10,
          marginRight: 10,
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          marginTop: 5,
          marginBottom: 5,
          cursor: "pointer",
          background: "rgba(39, 46, 69, 0.6)",
          // color: "#fff",
          // border: "1px solid #6b37af",
          borderRadius: 6
        }}
          onClick={() => {
            this.props.history.push({
              pathname: "/detalhes",
              state: {
                totem: totem
              }
            })
          }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: 0 }}>{totem.nome}</h3>
            <h6>{totem.ruaPrincipal} com {totem.ruaTransversal}</h6>
          </div>
        </div>

      )
    })


  }

  renderItems = () => {

    if (this.state.loadingLista) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
          <div className="loading">
            <RotateSpinner
              size={45}
              color="rgb(177, 77,198)"
              loading={this.state.loading}
            />
            {/* <h2 className="text-white">Carregando</h2> */}
          </div>
        </div>
      )
    }

    if (this.state.lista.length === 0) {
      return null
    }
    if (this.state.ruaAtual !== null) {
      return this.state.lista[this.state.paginaAtual - 1].map((value, index) => {


        return (
          // <p key={index} className="list-group-item list-group-item-action" onClick={(e) => this.clickMarker(e, index)}>{value.nomeRuaTransversal}</p> rgba(32, 38, 60, 0.7)
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
            }} onClick={this.state.ruaAtual !== null ? null : () => this.setState({
              ruaAtual: value
            }, () => this.getTransversais())}>

            <h4 style={{ marginBottom: 0, color: 'white' }}>{value.nomeRuaTransversal}</h4>

          </div>
        )

      })
    }
    // console.log(this.state.lista)
    return this.state.lista[this.state.paginaAtual - 1].map((value, index) => {


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
          }} onClick={() => this.setState({
            ruaAtual: value
          }, () => this.getTransversais())}>



          <h4 style={{ marginBottom: 0, color: 'white' }}>{value.nomeRuaPrincipal} {value.idRua.includes("+") ? "+" : "-"}</h4>


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
          <button style={{ position: 'absolute', top: 10, left: 25, background: 'transparent', color: "#ccc", borderColor: '#ccc' }} className="btn btn-light"
            onClick={() => this.setState({ ruaAtual: null, details: false, markerCenter: null, lista: this.state.oldList, oldList: [] })} ><GoArrowLeft style={{ height: 15, width: 15, }} /></button>
          <h5 style={{ color: "#fff", marginBottom: 5, marginTop: 1 }}>{this.state.ruaAtual.nomeRuaPrincipal}</h5>
        </div>
      )
    } else {
      return <h5 className="text-titulo" style={{ color: "#fff", marginBottom: 5 }}>Lista de Rua</h5>
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
    if (this.state.loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
          <div className="loading">
            <RotateSpinner
              size={45}
              color="rgb(177, 77,198)"
              loading={this.state.loading}
            />
            {/* <h2 className="text-white">Carregando</h2> */}
          </div>
        </div>
      )
    }

    return (
      <div className="App mx-auto" style={{ display: "flex", flexDirection: 'column', flexWrap: 'none' }} >

        <div style={{ flex: 1, marginBottom: 9, display: 'flex' }}>

          <div className="table-container" style={{ flex: 1, height: "100%", position: 'relative', background: "rgba(32, 38, 60, 0.7)", borderRadius: 6 }}>
            <div className="title-container" style={{ display: 'flex' }}>
              <h4 className="text-left text-white" style={{ flex: 4, marginTop: "4px", paddingTop: 10, paddingBottom: 6, paddingLeft: 20, paddingRifht: 10 }}>Totens destacados</h4>
              <div style={{ display: 'flex', justifyContent: 'right', color: '#fff', cursor: 'pointer' }} onClick={() => this.props.history.push("/totem")}>
                <h4 style={{ position: "absolute", right: 30, top: 12 }}>Ver mais</h4>
                <IoIosArrowForward style={{ height: 45, width: 25, position: "absolute", right: 5 }} />
              </div>
            </div>

            <div className="table table-hover" style={{ marginTop: "3px" }}>

              {this.state.pageList.length === 0 ?
                <div style={{ display: 'flex', justifyContent: 'center', color: '#fff', alignItems: 'center' }} onClick={() => this.props.history.push("/totem")}>
                  <h4 >Não há totens registrados</h4>
                </div> : this.renderTotens()}
            </div>
          </div>

        </div>
        <div style={{ flex: 1, display: 'flex' }}>
          <div className="mapStyle">
            {/* {console.log(this.state.mapProps.lat)} */}

            <AdHereMap key={Math.random()} onChange={this._onChange} center={this.state.center} zoom={this.state.zoom} onMapLoaded={() => { }}>
              {this.state.markerCenter ? <Marker lat={this.state.markerCenter.lat} lng={this.state.markerCenter.lng} /> : null}
            </AdHereMap>

          </div>


          <section className="sectionCard" style={{ height: '100%' }}>
            <div className="card card-style" style={{ backgroundColor: 'rgb(32, 38, 60, 0.70)', position: 'relative' }}>
              <ReactTooltip />
              <button style={{
                outline: 'none',
                right: 25,
                padding: 3,
                position: 'absolute',
                background: 'rgba(39, 46, 69, 0.0)',
                color: '#ddd',
                borderRadius: 6,
                borderColor: 'transparent'
              }} data-tip="Os símbolos + e - representam o sentido da rua baseado em suas coordenadas">
                <GoInfo style={{
                  width: 25,
                  height: 25
                }} />
              </button>
              <div className="card-title">

                {this.renderRua()}
                {/* 
                <form className="form-inline search-form" style={{ marginTop: 10 }}>
                  <input className="form-control search-home" ref="search" type="search" placeholder="Search" aria-label="Search" style={{ marginRight: 2 }} />
                  <button className="btn btn-outline-success search-button" type="submit" onClick={(e) => this.busca(e)}><GoSearch /></button>
                </form> */}

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
      </div >
    );
  }
}

export default withRouter(App);

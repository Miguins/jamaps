import React, { Component } from 'react'
import './index.css'
// import { GoLocation } from 'react-icons/go'
// import { XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart, PieChart, Pie } from 'recharts';
import axios from 'axios'
import auth from './../../config/auth/index';
import { IoIosArrowForward } from 'react-icons/io';
// import { Circle } from 'rc-progress';
import Pagination from "react-js-pagination";
import { withRouter } from 'react-router-dom';
import { RotateSpinner } from 'react-spinners-kit';

// const data02 = [
//     { name: 'A1', value: 7 },
//     { name: 'v', value: 3 }
// ];


class Totem extends Component {

    state = {
        loading: false,
        width: window.innerWidth,
        height: window.innerHeight,
        listaTotem: [],
        center: {
            lat: -1.4476205,
            lng: -48.4736209,
        },
        zoom: 13,
        editTotem: false,
        totemAtual: null,
        ruas: [],
        ruasTransversais: [],
        value: '',
        autocomplete: [],
        isEditing: false,
        ruaAtual: "",
        name: '',
        totemSelecionado: null,
        pageList: [],
        pageRuas: [],
        activePage: 1,
        activeRuas: 1,
        hover: false
    }

    handlePageChange = (pageNumber) => {
        // console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    handleRuasChange = (pageNumber) => {
        // console.log(`active page is ${pageNumber}`);
        this.setState({ activeRuas: pageNumber });
    }

    componentDidMount() {
        this.getRuas()
        this.getTotens()
        // this.getRuasTranversais()
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate = () => {
        // console.log(window.innerWidth)
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    getRuasTranversais = async () => {
        if (this.state.totemAtual === null) {
            // console.log("To nulo")
        } else {
            try {
                // var urlLocal = "http://localhost:3001/"
                var urlHeroku = "https://back-jamapas2.herokuapp.com/"
                const data = await axios.get(urlHeroku + "gethere/cruzamento/" + this.state.totemAtual.idRua, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('auth')
                    }
                });
                // console.log(data)

                if (data.data.data["rua_transversais"]) {
                    var string = data.data.data["rua_transversais"][0].pontosDeEncontro

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
                        ruasTransversais: data.data.data["rua_transversais"],
                        ruaAtual: data.data.data["rua_transversais"][0],
                        center: center,
                        zoom: 18,
                    })
                }


            } catch (e) {
                console.log(e)
            }
        }
    }

    getTotens = async () => {
        this.setState({
            loading: true
        })
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
                editTotem: false,
                pageList: pageList,
                loading: false
            })

            // console.log(data);

        } catch (e) {
            console.log(e)
            this.setState({
                loading: false
            })
        }
    }

    getRuas = async () => {

        this.setState({
            loading: true
        })

        try {
            // var urlLocal = "http://localhost:3001/"
            var urlHeroku = "https://back-jamapas2.herokuapp.com/"
            const data = await axios.get(urlHeroku + "gethere/cruzamentos", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('auth')
                }
            });

            // console.log(data)

            // let counts = data.data.data.reduce((prev, curr) => {
            //     let count = prev.get(curr.nomeRuaTransversal) || 0;
            //     prev.set(curr.nomeRuaTransversal, curr.nivelDeTrafego + count);
            //     return prev;
            // }, new Map());

            // // then, map your counts object back to an array
            // let reducedObjArr = [...counts].map(([key, value]) => {
            //     return { key, value }
            // })


            var pageList = []

            for (var i = 0; i < data.data.data.length / 11; i++) {
                var itens = []
                for (var j = i * 11; j < (i * 11) + 11; j++) {
                    if (data.data.data[j] !== undefined) {

                        itens[j] = data.data.data[j]
                    }
                }
                pageList[i] = itens
            }

            this.setState({
                ruas: data.data.data,
                pageRuas: pageList,
                loading: false
                // autocomplete: ruas,
                // details: false,
                // busca: false,
                // paginaTotal: pageNumbers,
                // ultimoPagina: 9
            })

            // console.log(data.data.data);

        } catch (e) {
            console.log(e)
            this.setState({
                loading: false
            })
        }

    }

    _onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });
    }

    autoComplete = (e, a) => {
        if (a === '') {
            this.setState({
                value: '',
                autocomplete: [],
                totemAtual: null
            })
        } else {
            // console.log(a.toLowerCase())
            // this.setState({
            //     autocomplete: this.state.ruas
            // })
            var ruas = []
            this.state.ruas.map((rua) => {
                if (ruas.length < 6) {
                    if (rua.nomeRuaPrincipal.toLowerCase().includes(a.toLowerCase())) {
                        ruas.push(rua)
                    }
                }
                return null
            })

            this.setState({
                value: a,
                autocomplete: ruas
            })
        }

    }

    _editTotem = async (e) => {
        e.preventDefault()
        // console.log(this.refs)
        if ((this.refs.nomeTotem !== '' || this.state.value !== '') || (this.refs.nomeTotem !== '' && this.state.value !== '')) {
            try {

                const requestBody = {
                    'nome': this.refs.nomeTotem.value,
                    'ruaPrincipal': this.state.value,
                    'ruaTransversal': this.state.totemAtual.ruaTransversal,
                    'latitude': this.state.totemAtual.latitude,
                    'longitude': this.state.totemAtual.longitude
                }

                // console.log(requestBody)
                // var urlLocal = "http://localhost:3001/"
                var urlHeroku = "https://back-jamapas2.herokuapp.com/"

                const options = {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        Authorization: "Bearer " + localStorage.getItem('auth')
                    },
                    params: requestBody,
                    // data: qs.stringify(data),
                    url: urlHeroku + "totem/" + this.state.totemAtual.id,
                };


                const data = await axios(options)

                // console.log(data)
                this.getTotens()

                // console.log("Adicionado pega crl")

                this.setState({
                    editTotem: false,
                    isEditing: false,
                    ruasTransversais: [],
                    value: "",
                    name: '',
                    totemAtual: null
                })

            } catch (e) {
                console.log(e)
            }
        }
    }

    renderTransversais = () => {
        if (this.state.totemAtual === null) {
            return <option></option>
        }
        // console.log(this.state.ruasTransversais)
        if (this.state.ruasTransversais.length === 0) {
            // console.log(this.state.totemAtual)
            return <option>{this.state.totemAtual.ruaTransversal}</option>
        }
        return this.state.ruasTransversais.map((rua, index) => {
            // console.log(rua)
            return <option key={index} value={index}>{rua.nomeRuaTransversal}</option>
        })

    }

    _addTotem = async (e) => {
        e.preventDefault()
        // console.log(this.refs)
        if ((this.refs.nomeTotem !== '' || this.state.value !== '') || (this.refs.nomeTotem !== '' && this.state.value !== '')) {
            try {
                var requestBody
                // console.log(typeof (this.state.ruaAtual))
                if (typeof this.state.ruaAtual === "object") {
                    requestBody = {
                        'nome': this.refs.nomeTotem.value,
                        'ruaPrincipal': this.state.value,
                        'ruaTransversal': this.state.ruaAtual.nomeRuaTransversal,
                        'latitude': this.state.center.lat,
                        'longitude': this.state.center.lng
                    }
                } else {
                    requestBody = {
                        'nome': this.refs.nomeTotem.value,
                        'ruaPrincipal': this.state.value,
                        'ruaTransversal': this.state.ruaAtual,
                        'latitude': this.state.center.lat,
                        'longitude': this.state.center.lng
                    }
                }



                // console.log(requestBody)
                // var urlLocal = "http://localhost:3001/"
                var urlHeroku = "https://back-jamapas2.herokuapp.com/"

                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        Authorization: "Bearer " + localStorage.getItem('auth')
                    },
                    params: requestBody,
                    // data: qs.stringify(data),
                    url: urlHeroku + "totem/register",
                };


                const data = await axios(options)
                // console.log(data)
                this.getTotens()

                // console.log("Adicionado pega crl")

                this.setState({
                    editTotem: false,
                    isEditing: false,
                    ruasTransversais: [],
                    value: "",
                    name: '',
                    totemAtual: null
                })

            } catch (e) {
                console.log(e)
            }
        }
    }

    renderItems = () => {
        return this.state.pageList[this.state.activePage - 1].map((totem, index) => {
            // console.log(totem.nome)
            return (


                <div key={index} style={{
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
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <IoIosArrowForward style={{ height: 45, width: 25, position: "absolute", right: 5 }} />
                    </div>
                </div>

            )
        })

    }

    renderRuas = () => {
        return this.state.pageRuas[this.state.activeRuas - 1].map((rua, index) => {
            return (


                <div key={index} style={{
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
                }}
                    onClick={() => {
                        this.props.history.push({
                            pathname: "/detalhes",
                            state: {
                                rua: rua
                            }
                        })
                    }}>



                    <h4 style={{ marginBottom: 0, color: 'white' }}>{rua.nomeRuaPrincipal}</h4>


                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <IoIosArrowForward style={{ height: 25, width: 25, position: "absolute", right: 5 }} />
                    </div>

                </div>
            )
        })


    }

    editButton = () => {

        this.setState({ editTotem: true })
    }

    render() {

        if (this.state.loading || this.state.ruas.length === 0) {
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
        } else {
            if (this.state.listaTotem.length === 0) {
                return (
                    <div style={{ height: "100vh", display: "flex" }}>
                        <div className="body-totem">
                            <div className="card-totem-style">
                                <div className="table-container" style={{ height: "100%", position: 'relative' }}>
                                    <h4 className="text-center text-white">Lista de Totens</h4>

                                    <div className="lista-vazia text-center">
                                        <h2 className="text-center text-white">Você não possui totens registrados</h2>
                                        <button type="submit" className="btn btn-sucess" style={{
                                            padding: 2,
                                            width: 90,
                                            height: 35,
                                            borderRadius: 8,
                                            background: "linear-gradient(to bottom, rgba(0, 172, 151, 0.9), rgba(21, 115, 113, 0.9))",
                                            borderColor: "transparent",
                                            color: "#eee", fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                        }} onClick={(e) => { this.props.history.push("/editar") }}>Adicionar</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="body-ruas">
                            <div className="card-ruas-style">

                                {/* <div className="separador"></div> */}
                                <div className="table-container" style={{ height: "100%", position: 'relative' }}>
                                    <div className="title-container" >
                                        <h4 className="text-left text-white" style={{ marginTop: "4px", marginBottom: 3 }}>Lista de Ruas</h4>
                                    </div>

                                    <div className="table table-hover" style={{ marginTop: "3px", position: 'relative' }}>

                                        {this.renderRuas()}

                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", position: 'absolute', bottom: 5, right: 0, left: 0 }}>
                                        <Pagination
                                            activePage={this.state.activeRuas}
                                            itemsCountPerPage={11}
                                            totalItemsCount={this.state.ruas.length}
                                            pageRangeDisplayed={5}
                                            onChange={this.handleRuasChange}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
            return (
                <div style={{ height: "100vh", display: "flex" }}>
                    <div className="body-totem">
                        <div className="card-totem-style">

                            {/* <div className="separador"></div> */}
                            <div className="table-container" style={{ height: "100%", position: 'relative' }}>
                                <div className="title-container">
                                    <h4 className="text-left text-white" style={{ marginTop: "4px" }}>Lista de Totens</h4>
                                    <button type="submit" className="btn btn-sucess" style={{
                                        padding: 2,
                                        width: 90,
                                        height: 35,
                                        borderRadius: 8,
                                        background: "linear-gradient(to bottom, rgba(0, 172, 151, 0.9), rgba(21, 115, 113, 0.9))",
                                        borderColor: "transparent",
                                        color: "#eee", fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                    }} onClick={(e) => { this.props.history.push("/editar") }}>Adicionar</button>
                                </div>

                                <div className="table table-hover" style={{ marginTop: "3px" }}>
                                    {/* <thead>
                                        <tr>
                                            <th className="text-center text-white" scope="col">Nome</th>
                                            <th className="text-center text-white" scope="col">Rua Principal</th>
                                            <th className="text-center text-white" scope="col">Rua Transversal</th>
                                            <th className="text-center text-white" scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody> */}
                                    {this.renderItems()}
                                    {/* {() => { console.log("renderizando"); this.renderItems() }} */}
                                    {/* </tbody> */}
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", position: 'absolute', bottom: 5, right: 0, left: 0 }}>
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={7}
                                        totalItemsCount={this.state.listaTotem.length}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="body-ruas">
                        <div className="card-ruas-style">

                            
                            <div className="table-container" style={{ height: "100%", position: 'relative' }}>
                                <div className="title-container" >
                                    <h4 className="text-left text-white" style={{ marginTop: "4px", marginBottom: 3 }}>Lista de Ruas</h4>
                                </div>

                                <div className="table table-hover" style={{ marginTop: "3px", position: 'relative' }}>

                                    {this.renderRuas()}

                                </div>
                                <div style={{ display: "flex", justifyContent: "center", position: 'absolute', bottom: 5, right: 0, left: 0 }}>
                                    <Pagination
                                        activePage={this.state.activeRuas}
                                        itemsCountPerPage={11}
                                        totalItemsCount={this.state.ruas.length}
                                        pageRangeDisplayed={5}
                                        onChange={this.handleRuasChange}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div >
            )


        }
    }
}

export default withRouter(Totem)
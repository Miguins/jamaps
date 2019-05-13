import React, { Component } from 'react'
import './index.css'
import { withRouter } from 'react-router-dom'
import * as Autocomplete from 'react-autocomplete'
import { IoMdArrowBack } from 'react-icons/io'
import auth from '../../../config/auth/index'
import AdHereMap from '../../../here-map-ad-here/index'
import Marker from '../../../here-map-ad-here/marker/index'
import axios from 'axios'
import { ToastsContainer, ToastsStore } from 'react-toasts';


class Editar extends Component {



    state = {
        totemAtual: null,
        autocomplete: [],
        value: '',
        center: {
            lat: -1.4476205,
            lng: -48.4736209,
        },
        ruasTransversais: [],
        ruaAtual: null,
        zoom: 13,
        name: '',
        ruas: [],
        editing: false
    }

    componentDidMount() {
        this.getRuas()
        this.getProps()
    }

    getProps = () => {
        // console.log(this.props)
        if (this.props.location.state === undefined) {
            console.log("Nao definido")
        } else {
            this.setState({
                totemAtual: this.props.location.state,
                center: {
                    lat: this.props.location.state.latitude,
                    lng: this.props.location.state.longitude
                },
                zoom: 18,
                name: this.props.location.state.nome,
                value: this.props.location.state.ruaPrincipal,
                editing: true
            })
        }
    }

    sum(obj) {
        var sum = '';
        for (var el in obj) {
            if (obj.hasOwnProperty(el)) {
                sum += obj[el];
            }
        }
        return sum;
    }

    isBigEnough(value) {
        return value === 10;
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

            var uniq = []

            data.data.data.map((rua, index) => {
                if (uniq.length === 0) {
                    uniq.push(rua)
                } else {

                }

            })
            console.log(uniq)

            var sample = { a: '1', b: '2', c: '3' }
            var summed = this.sum(sample);
            // console.log("sum: " + summed);

            // console.log(data.data.data)
            let idRuas = ""
            let counts = data.data.data.reduce((prev, curr) => {
                let count = prev.get(curr.idRua) || 0;
                // console.log(prev)
                prev.set(curr.nomeRuaPrincipal, curr.idRua + count);
                return prev;
            }, new Map());

            // then, map your counts object back to an array
            let reducedObjArr = [...counts].map(([key, value]) => {
                return { key, value }
            })

            // console.log(reducedObjArr)

            this.setState({
                ruas: data.data.data,
                // autocomplete: ruas,
                // details: false,
                // busca: false,
                // paginaTotal: pageNumbers,
                // ultimoPagina: 9
            })

            // console.log(data.data.data);

        } catch (e) {
            console.log(e)
        }

    }

    getRuasTranversais = async () => {
        if (this.state.totemAtual === null) {
            console.log("To nulo")
        } else {
            try {
                // var urlLocal = "http://localhost:3001/"
                var urlHeroku = "https://back-jamapas2.herokuapp.com/"
                const data = await axios.get(urlHeroku + "gethere/cruzamento/" + this.state.totemAtual.idRua, {
                    headers: {
                        Authorization: "Bearer " + auth.isAuth()
                    }
                });
                console.log(data)

                if (data.data.data["rua_transversais"]) {
                    var string = data.data.data["rua_transversais"][0].pontosDeEncontro

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

    bi(value) {
        return value.nomeRuaPrincipal === "Avenida Visconde De Souza Franco"
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
        if (this.refs.nomeTotem.value !== '') {
            try {

                const requestBody = {
                    'nome': this.refs.nomeTotem.value,
                    'ruaPrincipal': this.state.value,
                    'ruaTransversal': this.state.totemAtual.ruaTransversal,
                    'latitude': this.state.totemAtual.latitude,
                    'longitude': this.state.totemAtual.longitude,
                    'idRuaTransversal': this.state.ruaAtual.cruzamentoId,
                }

                // console.log(requestBody)

                // var urlLocal = "http://localhost:3001/"
                var urlHeroku = "https://back-jamapas2.herokuapp.com/"

                const options = {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        Authorization: "Bearer " + auth.isAuth()
                    },
                    params: requestBody,
                    // data: qs.stringify(data),
                    url: urlHeroku + "totem/" + this.state.totemAtual.id,
                };


                const data = await axios(options)

                console.log(data)

                ToastsStore.success("Totem alterado com sucesso", 2500, "text-white")

                this.props.history.goBack()

                // console.log("Adicionado pega crl")

            } catch (e) {
                console.log(e)
                ToastsStore.error(
                    <div>
                        <h1>Error</h1>
                    </div>
                )
            }
        }
    }

    _addTotem = async (e) => {
        e.preventDefault()
        // console.log(this.refs)
        if ((this.refs.nomeTotem !== '' || this.state.value !== '') || (this.refs.nomeTotem !== '' && this.state.value !== '')) {
            try {
                var requestBody
                console.log(this.state.ruaAtual)
                if (typeof this.state.ruaAtual === "object") {
                    requestBody = {
                        'nome': this.refs.nomeTotem.value,
                        'ruaPrincipal': this.state.value,
                        'ruaTransversal': this.state.ruaAtual.nomeRuaTransversal,
                        'latitude': this.state.center.lat,
                        'longitude': this.state.center.lng,
                        'idRuaTransversal': this.state.ruaAtual.cruzamentoId,
                    }
                    console.log("Rua 1: " + this.state.ruaAtual)
                } else {
                    requestBody = {
                        'nome': this.refs.nomeTotem.value,
                        'ruaPrincipal': this.state.value,
                        'ruaTransversal': this.state.ruaAtual,
                        'latitude': this.state.center.lat,
                        'longitude': this.state.center.lng
                    }
                    console.log("Rua 2: " + this.state.ruaAtual)
                }



                console.log(requestBody)

                // var urlLocal = "http://localhost:3001/"
                var urlHeroku = "https://back-jamapas2.herokuapp.com/"

                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        Authorization: "Bearer " + auth.isAuth()
                    },
                    params: requestBody,
                    // data: qs.stringify(data),
                    url: urlHeroku + "totem/register",
                };


                const data = await axios(options)

                // console.log(data)

                this.props.history.goBack()


            } catch (e) {
                console.log(e)
            }
        }
    }

    renderTransversais = () => {
        // console.log(this.state.ruasTransversais)
        let counts = this.state.ruasTransversais.reduce((prev, curr) => {
            let count = prev.get(curr.nomeRuaTransversal) || 0;
            prev.set(curr.nomeRuaTransversal, curr.nivelDeTrafego + count);
            return prev;
        }, new Map());

        // then, map your counts object back to an array
        let reducedObjArr = [...counts].map(([key, value]) => {
            return { key, value }
        })
        console.log(this.state.ruas.filter(this.bi))

        if (this.state.totemAtual === null) {
            return <option></option>
        }
        // console.log(this.state.ruasTransversais)
        if (this.state.ruasTransversais.length === 0) {
            // console.log(this.state.totemAtual)
            return <option>{this.state.totemAtual.ruaTransversal}</option>
        }
        return reducedObjArr.map((rua, index) => {
            // console.log(rua)

            return <option key={index} value={index}>{rua.key}</option>
        })

    }

    render() {
        if (this.state.editing === false) {
            return (
                <div className="details-container">
                    <div className="container-editar" style={{ marginTop: 5 }}>
                        <button className="btn btn-back" style={{ marginTop: 0 }} onClick={() => this.props.history.goBack()} > <IoMdArrowBack color={"white"} /> </button>
                        <h2 className="text-center txt-menu" style={{ marginTop: 0 }}>Adicionar</h2>
                    </div>

                    <form style={{ marginTop: 3 }}>
                        <div className="form-group">
                            <label className="form-label label-text" htmlFor="exampleInputEmail1">Nome</label>
                            <input ref="nomeTotem" type="text" className="form-control input-text" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                        </div>

                        <div className="md-form">
                            <label className="form-label active" htmlFor="form-autocomplete">Rua Principal</label>

                            <Autocomplete
                                ref="ruaPrincipal"
                                menuStyle={{
                                    borderRadius: '3px',
                                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    padding: '2px 0',
                                    fontSize: '90%',
                                    position: 'fixed',
                                    overflow: 'auto',
                                    maxHeight: '50%',
                                }}
                                inputProps={{ style: { width: '100%', height: 30, borderRadius: 3, border: 'solid', borderColor: '#fff', padding: '2px 0', } }}
                                wrapperStyle={{ width: '100%', borderRadius: 3, height: 30 }}
                                getItemValue={(item) => item.nomeRuaPrincipal}
                                items={this.state.autocomplete}
                                renderItem={(item, isHighlighted) =>
                                    <div key={item.idRua} style={{ background: isHighlighted ? 'lightgray' : '#222', width: '100%', color: isHighlighted ? 'black' : 'white' }}>
                                        {item.nomeRuaPrincipal}
                                    </div>
                                }
                                value={this.state.value}
                                onChange={(e, a) => this.autoComplete(e, a)}
                                onSelect={(val, item) => {
                                    this.setState({
                                        value: val,
                                        totemAtual: item,
                                    }, () => {
                                        console.log(this.state)
                                        this.getRuasTranversais()
                                    })
                                }
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="exampleFormControlSelect1">Ruas transversais</label>
                            <select className="form-control" id="exampleFormControlSelect1" onChange={(e, index) => {

                                var string = this.state.ruasTransversais[e.target.value].pontosDeEncontro

                                var string3 = string[string.length - 1]
                                // console.log(string)

                                var arrayOfStrings = string3.split(" ");



                                var string2 = arrayOfStrings[0].split(",")

                                var center = {
                                    lat: parseFloat(string2[0]),
                                    lng: parseFloat(string2[1]),
                                }

                                console.log(this.state.ruasTransversais[e.target.value])

                                this.setState({
                                    center: center,
                                    zoom: 18,
                                    ruaAtual: this.state.ruasTransversais[e.target.value]
                                })
                            }}>
                                {this.state.ruasTransversais.length === 0 ? <option> </option> : this.renderTransversais()}
                            </select>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="form-label">Latitude</label>
                                <input type="text" className="form-control" placeholder="Latitude" value={this.state.center.lat} disabled />
                            </div>
                            <div className="col">
                                <label className="form-label">Longitude</label>
                                <input type="text" className="form-control" placeholder="Longitude" value={this.state.center.lng} disabled />
                            </div>
                        </div>
                        <div className="btn-container">
                            <button type="submit" style={{
                                marginTop: 5,
                                padding: 2,
                                width: 160,
                                height: 35,
                                borderRadius: 8,
                                backgroundColor: "linear-gradient(to bottom, rgba(0, 172, 151, 0.9), rgba(21, 115, 113, 0.9))",
                                borderColor: "transparent",
                                color: "#eee", fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                background: "linear-gradient(to bottom, rgba(0, 172, 151, 0.9), rgba(21, 115, 113, 0.9))",
                            }} onClick={(e) => { this._addTotem(e) }}>Aplicar Modificações</button>
                        </div>
                        <div className="totem-map-container">
                            <AdHereMap key={Math.random()} center={this.state.center} zoom={this.state.zoom} >
                                {/* {this.state.markerCenter ? <Marker lat={this.state.markerCenter.lat} lng={this.state.markerCenter.lng} /> : null} */}
                            </AdHereMap>
                        </div>
                    </form>
                </div>
            )
        }
        console.log(this.state.totemAtual)

        return (
            <div className="details-container">
                <div className="container-editar" style={{ marginTop: 5 }}>
                    <button className="btn btn-back" style={{ marginTop: 0 }} onClick={() => this.props.history.goBack()} > <IoMdArrowBack color={"white"} /> </button>
                    <h2 className="text-center txt-menu" style={{ marginTop: 0 }} >Editar</h2>
                </div>
                <form style={{ marginTop: 3 }} >
                    <div className="form-group">
                        <label className="form-label label-text" htmlFor="exampleInputEmail1">Nome</label>
                        <input type="text" ref="nomeTotem" className="form-control input-text" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label " htmlFor="exampleInputPassword1">Rua Principal</label>
                        <input type="text" ref="ruaPrincipal" className="form-control input-text" id="exampleInputEmail2" aria-describedby="emailHelp1" value={this.state.value} disabled />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="exampleFormControlSelect1">Ruas transversais</label>

                        <select className="form-control" id="exampleFormControlSelect1" onChange={(e, index) => {

                            var string = this.state.ruasTransversais[e.target.value].pontosDeEncontro

                            var string3 = string[string.length - 1]
                            // console.log(string)

                            var arrayOfStrings = string3.split(" ");



                            var string2 = arrayOfStrings[0].split(",")

                            var center = {
                                lat: parseFloat(string2[0]),
                                lng: parseFloat(string2[1]),
                            }

                            console.log(this.state.ruasTransversais[0])

                            this.setState({
                                center: center,
                                zoom: 18,
                                ruaAtual: this.state.ruasTransversais[e.target.value]
                            })
                        }}>
                            {this.renderTransversais()}
                        </select>


                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Latitude</label>
                            <input type="text" className="form-control" placeholder="Latitude" value={this.state.totemAtual.latitude} disabled />
                        </div>
                        <div className="col">
                            <label className="form-label">Longitude</label>
                            <input type="text" className="form-control" placeholder="Longitude" value={this.state.totemAtual.longitude} disabled />
                        </div>
                    </div>
                    <div className="btn-container">
                        <button type="submit" style={{
                            marginTop: 5,
                            padding: 2,
                            width: 160,
                            height: 35,
                            borderRadius: 8,
                            backgroundColor: "linear-gradient(to bottom, rgba(0, 172, 151, 0.9), rgba(21, 115, 113, 0.9))",
                            background: "linear-gradient(to bottom, rgba(0, 172, 151, 0.9), rgba(21, 115, 113, 0.9))",
                            borderColor: "transparent",
                            color: "#eee", fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                        }} onClick={(e) => this._editTotem(e)}>Aplicar Modificações</button>
                    </div>
                    <div className="totem-map-container">
                        {console.log(this.state.zoom)}
                        <AdHereMap key={Math.random()} center={this.state.center} zoom={this.state.zoom} >
                            <Marker lat={this.state.center.lat} lng={this.state.center.lng} />
                        </AdHereMap>
                    </div>
                </form>
                <ToastsContainer store={ToastsStore} />
            </div >
        )
    }

}

export default withRouter(Editar)
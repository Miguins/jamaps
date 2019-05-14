import React, { Component } from 'react'
import './index.css'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import { AreaChart, XAxis, YAxis, Tooltip, Area, BarChart, Bar, Cell, CartesianGrid, Legend, ReferenceLine, } from 'recharts'
import { GoPencil, GoTrashcan } from 'react-icons/go'
import { IoIosArrowBack } from 'react-icons/io'
import { Circle } from 'rc-progress';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Scheduler from './scheduler.js'
import { RotateSpinner } from 'react-spinners-kit';
import {

} from 'recharts';



const btnClicked = {
    outline: 'none',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 12,
    paddingBottom: 12,
    margin: 7,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: 24,
    color: "rgb(240, 240, 240)",
    borderColor: "rgb(185, 45,232)",
    background: "linear-gradient(to bottom, rgb(177, 77,198), rgb(185, 45,232))",
    fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
}

class Detalhes extends Component {



    state = {
        accessToken: '',
        width: window.innerWidth,
        totem: [],
        dataDia: [],
        dataSemana: [],
        trafegoMedio: 0,
        semanaSelected: false,
        rua: [],
        openTotem: '',
        dadosScheduler: [],
        dadosDemo: []
    }

    componentDidMount() {
        // console.log(this)
        this.getAccessToken()
        this.getTotem()
        if (this.props.location.state.rua !== undefined) {
            this.getDadosRua()
        }
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate = () => {
        // console.log(window.innerWidth)
        this.setState({ width: window.innerWidth });
    }

    getAccessToken = async () => {

        try {

            var bodyForm = new FormData()

            bodyForm.set('client_id', '1HGBE2fUm2hYC67B')
            bodyForm.set('client_secret', '6babe2c5031e4b4c9506edf4da1ece9b')
            bodyForm.set('grant_type', 'client_credentials')

            const data = await Axios.post("https://www.arcgis.com/sharing/rest/oauth2/token", bodyForm, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // console.log(data)
            this.setState({
                accessToken: data.data.access_token
            })

        } catch (e) {
            console.log(e)
            this.props.history.push("")
        }

    }

    getAnalisys = (value) => {

        this.state.rua.rua_transversais.map((rua, index) => {
            if (index === value) {
                // console.log(index)
                // console.log(rua)

                var string = rua.pontosDeEncontro

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


                var bodyFormData2 = new FormData();
                bodyFormData2.set('studyAreas',
                    '[{"geometry":{"x":' + center.lng + ',"y":' + center.lat + '}}]');
                bodyFormData2.set('dataCollections', '["KeyFacts"]');
                bodyFormData2.set('studyAreasOptions', '{"areaType":"RingBuffer","bufferUnits":"esriKilometers","bufferRadii":[1]}');
                bodyFormData2.set('returnGeometry', 'false');
                bodyFormData2.set('f', 'json');
                bodyFormData2.set('token', this.state.accessToken);

                Axios.post("https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/Enrich",
                    bodyFormData2,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                ).then(res => {
                    console.log(res)
                    console.log(res.data.results[0].value.FeatureSet[0].features[0].attributes)

                    var a = []

                    res.data.results[0].value.FeatureSet[0].features[0].attributes.map((ab) => {
                        console.log(ab)
                    })

                    // this.setState({
                    //     dadosDemo: 
                    // })
                })

            }
        })



    }

    removeItem = async (id) => {

        if (window.confirm('Deseja realmente excluir o item?')) {
            // this.onCancel(item)
            try {
                // var urlLocal = "http://localhost:3001/"
                var urlHeroku = "https://back-jamapas2.herokuapp.com/"
                const data = await Axios.delete(urlHeroku + "totem/delete/" + this.props.location.state.totem.id, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('auth')
                    }
                });
                // console.log(data)

                this.props.history.goBack()

            } catch (e) {
                console.log(e)
            }
        }

    }

    getTotem = async () => {
        try {
            // console.log(this.props.location.state.totem.id)
            // var urlLocal = "http://localhost:3001/"
            var urlHeroku = "https://back-jamapas2.herokuapp.com/"
            const data = await Axios.get(urlHeroku + "totem/" + this.props.location.state.totem.id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('auth')
                }
            })

            console.log(data)

            this.setState({
                totem: data.data.data
            }, () => this.getTrafego())



        } catch (e) {
            console.log(e)
        }
    }

    getDadosRua = async () => {
        try {
            // console.log(this.props.location.state.totem.id)
            // var urlLocal = "http://localhost:3001/"
            var urlHeroku = "https://back-jamapas2.herokuapp.com/"
            const data = await Axios.get(urlHeroku + "gethere/cruzamento/" + this.props.location.state.rua.idRua, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('auth')
                }
            })

            // console.log(data)

            this.setState({
                rua: data.data.data
            })

            this.getTrafego()

        } catch (e) {
            console.log(e)
        }
    }

    isToday = (value) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        if (value.mes === mm) {
            if (value.dia == dd) {
                return value
            }
        }
    }

    getTrafego = async () => {
        if (this.props.location.state.rua !== undefined) {
            var trafegoMedio = 0
            var cont = 0
            this.state.rua.rua_transversais.map((rua, index) => {
                trafegoMedio += rua.nivelDeTrafego
                cont++
                return null
            })
            this.setState({
                trafegoMedio: trafegoMedio / cont
            })
        } else {
            try {

                var urlHeroku = "https://back-jamapas2.herokuapp.com/"
                const data = await Axios.get(urlHeroku + "gethere/cruzamento/" + this.props.location.state.totem.idRuaTransversal, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('auth')
                    }
                })

                var dados = []

                data.data.data.rua_transversais.map((rua, index) => {
                    if (rua.nomeRuaTransversal === this.props.location.state.totem.ruaTransversal) {

                        // arrayOfStrings 0 = ano e 1 = mes 
                        var arrayOfStrings = rua.created_at.split("-");
                        // arrayOfStrings2 0 = dia
                        var arrayOfStrings2 = arrayOfStrings[2].split("T");
                        // arrayOfStrings3 0 = hora e 1 = minuto
                        var arrayOfStrings3 = arrayOfStrings2[1].split(":");

                        var horaFormata = (parseInt(arrayOfStrings3[0]) - 3) < 0 ? parseInt(arrayOfStrings3[0]) - 3 + 24 : parseInt(arrayOfStrings3[0]) - 3
                        var diaFormata = horaFormata > 20 && horaFormata < 24 ? parseInt(arrayOfStrings2[0]) - 1 : parseInt(arrayOfStrings2[0])

                        console.log(" Hora: " + horaFormata + ":" + arrayOfStrings3[1] + " Dia: " + diaFormata + " Mes: " + arrayOfStrings[1] + " Ano: " + arrayOfStrings[0])
                        // console.log(rua.nivelDeTrafego)
                        var d = {
                            mes: arrayOfStrings[1],
                            dia: diaFormata,
                            hora: horaFormata + ":" + arrayOfStrings3[1],
                            trafego: rua.nivelDeTrafego
                        }
                        dados.push(d)
                    }
                })

                var hoje = dados.filter(this.isToday)

                var semana = dados.filter((dado) => {
                    console.log(hoje[0])
                    return parseInt(dado.dia) >= (parseInt(hoje[0].dia) - 7)
                })

                let counts = semana.reduce((prev, curr) => {
                    let count = prev.get(curr.dia) || 0;
                    // console.log(prev)
                    prev.set(curr.dia, curr.trafego + count);
                    return prev;
                }, new Map());

                // then, map your counts object back to an array
                let reducedObjArr = [...counts].map(([key, value]) => {
                    return { key, value }
                })

                var sem = [
                    {
                        dia: (reducedObjArr[reducedObjArr.length - 1].key - 6) + "/05",
                        trafego: 0
                    },
                    {
                        dia: (reducedObjArr[reducedObjArr.length - 1].key - 5) + "/05",
                        trafego: 0
                    },
                    {
                        dia: (reducedObjArr[reducedObjArr.length - 1].key - 4) + "/05",
                        trafego: 0
                    },
                    {
                        dia: (reducedObjArr[reducedObjArr.length - 1].key - 3) + "/05",
                        trafego: 0
                    },
                    {
                        dia: (reducedObjArr[reducedObjArr.length - 1].key - 2) + "/05",
                        trafego: 0
                    },
                    {
                        dia: (reducedObjArr[reducedObjArr.length - 1].key - 1) + "/05",
                        trafego: 0
                    },
                    {
                        dia: (reducedObjArr[reducedObjArr.length - 1].key) + "/05",
                        trafego: 0
                    },
                ]


                reducedObjArr.map((a) => {
                    console.log(a)
                    var b = {
                        dia: a.key,
                        trafego: (a.value / 24).toFixed(1)
                    }
                    for (var i = 0; i < sem.length; i++) {
                        if (a.key === sem[i].dia) {
                            sem[i] = b
                        }
                    }
                })

                this.setState({
                    dadosScheduler: dados,
                    dataDia: hoje.filter((b) => {
                        if (parseInt(b.hora.split(":")[0]) >= (parseInt(hoje[hoje.length - 1].hora.split(":")[0]) / 2)) {
                            return b
                        }
                    }),
                    dataSemana: sem,
                    trafegoMedio: hoje[hoje.length - 1].trafego
                })


            } catch (e) {
                console.log(e)
            }
        }
    }

    getUnique(arr, comp) {

        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e =>
                arr[e]
            ).map(e => arr[e]);

        return unique;
    }

    renderRuas = () => {
        var value = ''
        var cont = 0
        this.state.rua.rua_transversais.map((rua, index) => {
            // console.log(rua)
            // console.log(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(rua.created_at))
            if (value === '') {
                value = rua.nomeRuaTransversal
                cont++
            } else if (value === rua.nomeRuaTransversal) {
                cont++
            }
            return null
        })

        // first, convert data into a Map with reduce
        let counts = this.state.rua.rua_transversais.reduce((prev, curr) => {
            let count = prev.get(curr.nomeRuaTransversal) || 0;
            prev.set(curr.nomeRuaTransversal, curr.nivelDeTrafego + count);
            return prev;
        }, new Map());

        // console.log(counts)

        // then, map your counts object back to an array
        let reducedObjArr = [...counts].map(([key, value]) => {
            return { key, value }
        })

        console.log(reducedObjArr)


        return reducedObjArr.map((rua, index) => {
            // console.log
            return (
                <div key={index}
                    onClick={() => this.getAnalisys(index)}
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



                    <h4 style={{ marginBottom: 0, color: 'white', flex: 6 }}>{rua.key}</h4>


                    <div style={{ display: 'flex', justifyContent: 'right', flex: 1 }}>
                        <h4>Tráfego: {(rua.value / cont).toFixed(1)}</h4>
                    </div>

                </div>
            )
        })
    }

    editar = () => {
        this.props.history.push({
            pathname: "/editar",
            state: this.state.totem
        })
    }

    render() {
        // console.log(this.props.location.state.rua)
        if (this.props.location.state.rua !== undefined) {

            return (
                <div style={{
                    // background: "rgba(48, 66, 156, 0.3)",
                    fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                    display: 'flex',
                    textAlign: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }
                }>
                    <h1 style={{ color: "#DDD", marginTop: 10 }}>{this.props.location.state.rua.nomeRuaPrincipal}</h1>
                    <div style={{ display: 'flex', }}>
                        {/* Gráfico do tráfego por hora do dia */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            position: 'relative',
                            justifyContent: 'center',
                            width: "100%",
                            height: "60%"
                        }}>
                            <div style={{
                                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 10,
                                marginLeft: 10,
                                marginBottom: 10,
                                marginRight: 10,
                                width: "60%",
                                flexDirection: 'column',
                                color: 'white',
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                cursor: "pointer",
                                background: "rgba(32, 38, 60, 0.6)",
                                borderRadius: 6
                            }}>
                                <h4 style={{ color: "rgb(98, 103, 134)" }}>Demografia</h4>
                                {/* <AreaChart width={this.state.width * 0.55} height={250} data={this.state.semanaSelected ? this.state.dataSemana : this.state.dataDia}
                                    margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                            <stop offset="95%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="rgb(98, 103, 134)" />
                                    <YAxis stroke="rgb(98, 103, 134)" /> 
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="trafego" stroke="rgb(114, 39,163)" strokeWidth={1.5} dot={{ stroke: 'rgb(98, 103, 134)', strokeWidth: 1.5 }} fillOpacity={1} fill="url(#colorUv)" />
                                </AreaChart> */}
                                <BarChart
                                    width={this.state.width * 0.55}
                                    height={250}
                                    data={this.state.dadosDemo}
                                    stackOffset="sign"
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Bar dataKey="PAGE01_CY" fill="#8884d8" stackId="stack" />
                                    <Bar dataKey="PAGE02_CY" fill="#82ca9d" stackId="stack" />
                                    {/* <Bar dataKey="PAGE03_CY" fill="#8884d8" stackId="stack" />
                                    <Bar dataKey="PAGE04_CY" fill="#82ca9d" stackId="stack" />
                                    <Bar dataKey="PAGE05_CY" fill="#8884d8" stackId="stack" /> */}
                                </BarChart>

                                <div style={{
                                    display: 'flex'
                                }}>
                                    {/* <button style={
                                        this.state.semanaSelected ? {
                                            outline: 'none',
                                            paddingLeft: 25,
                                            paddingRight: 25,
                                            paddingTop: 12,
                                            paddingBottom: 12,
                                            margin: 7,
                                            // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                            // borderRadius: 24,
                                            color: "rgb(240, 240, 240)",
                                            borderColor: "transparent",
                                            background: "transparent",
                                            fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                        }
                                            :
                                            btnClicked} onClick={(e) => {
                                                e.preventDefault()
                                                this.setState({
                                                    semanaSelected: false
                                                })
                                            }}>Dia</button>
                                    <button style={
                                        !this.state.semanaSelected ? {
                                            outline: 'none',
                                            paddingLeft: 25,
                                            paddingRight: 25,
                                            paddingTop: 12,
                                            paddingBottom: 12,
                                            margin: 7,
                                            // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                            // borderRadius: 24,
                                            color: "rgb(240, 240, 240)",
                                            borderColor: "transparent",
                                            background: "transparent",
                                            fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                        }
                                            :
                                            btnClicked} onClick={(e) => {
                                                e.preventDefault()
                                                this.setState({
                                                    semanaSelected: true
                                                })
                                            }}>Semana</button> */}
                                </div>
                            </div>


                            <div style={{
                                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                display: 'flex',
                                flexDirection: 'column',
                                color: 'white',
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                width: "25%",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10,
                                cursor: "pointer",
                                background: "rgba(32, 38, 60, 0.6)",
                                borderRadius: 6,
                                justifyContent: "center",
                                alignItems: "center",
                                height: "200px"
                            }}>
                                {/* Tráfego Média */}


                                <h4 style={{ color: "rgb(98, 103, 134)" }}>Tráfego</h4>
                                <Circle style={{
                                    width: "75%",
                                    height: "75%",
                                    color: 'rgb(98, 103, 134)'
                                }} percent={this.state.trafegoMedio.toFixed(1) * 10} strokeWidth="5" strokeColor="rgb(181, 44, 231)" trailColor="rgb(98, 103, 134)" />
                                <h1 style={{ position: "absolute", marginTop: 14, fontSize: 50, color: 'rgb(240, 240, 240)' }}>
                                    {this.state.trafegoMedio.toFixed(1)}
                                </h1>
                            </div>


                        </div>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {this.state.rua.length !== 0 ? this.renderRuas() : <div className="body-login text-center mx-auto">
                            <div className="loading">
                                <RotateSpinner
                                    size={45}
                                    color="#ffc107"
                                    loading={this.state.loading}
                                />
                                {/* <h2 className="text-white">Carregando</h2> */}
                            </div>
                        </div>}
                    </div>
                    <ToastsContainer store={ToastsStore} />
                </div>
            )
        }
        return (
            <div style={{
                // background: "rgba(48, 66, 156, 0.3)",
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                display: 'flex',
                textAlign: "center",
                justifyContent: "center",
                position: 'relative',
                flexDirection: "column",
            }
            }>
                <h1 style={{ color: "#DDD", marginTop: 10 }}>{this.state.totem.nome}</h1>
                <div style={{ display: 'flex', }}>
                    {/* Gráfico do tráfego por hora do dia */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        position: 'relative',
                        justifyContent: 'center',
                        width: "100%",
                        height: "60%"
                    }}>
                        <div style={{
                            fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                            marginLeft: 10,
                            marginBottom: 10,
                            marginRight: 10,
                            width: "60%",
                            flexDirection: 'column',
                            color: 'white',
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                            cursor: "pointer",
                            background: "rgba(32, 38, 60, 0.6)",
                            borderRadius: 6
                        }}>
                            <h4 style={{ color: "rgb(98, 103, 134)" }}>Performance</h4>
                            <AreaChart width={this.state.width * 0.55} height={250} data={this.state.semanaSelected ? this.state.dataSemana : this.state.dataDia}
                                margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                        <stop offset="95%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey={this.state.semanaSelected ? "dia" : "hora"} stroke="rgb(98, 103, 134)" />
                                {/* <YAxis stroke="rgb(98, 103, 134)" /> */}
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <Tooltip />
                                <Area type="monotone" dataKey="trafego" stroke="rgb(114, 39,163)" strokeWidth={1.5} dot={{ stroke: 'rgb(98, 103, 134)', strokeWidth: 1.5 }} fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                            <div style={{
                                display: 'flex'
                            }}>
                                <button style={
                                    this.state.semanaSelected ? {
                                        outline: 'none',
                                        paddingLeft: 25,
                                        paddingRight: 25,
                                        paddingTop: 12,
                                        paddingBottom: 12,
                                        margin: 7,
                                        // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                        // borderRadius: 24,
                                        color: "rgb(240, 240, 240)",
                                        borderColor: "transparent",
                                        background: "transparent",
                                        fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                    }
                                        :
                                        btnClicked} onClick={(e) => {
                                            e.preventDefault()
                                            this.setState({
                                                semanaSelected: false
                                            })
                                        }}>Dia</button>
                                {/* <button style={
                                    !this.state.semanaSelected ? {
                                        outline: 'none',
                                        paddingLeft: 25,
                                        paddingRight: 25,
                                        paddingTop: 12,
                                        paddingBottom: 12,
                                        margin: 7,
                                        // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                        // borderRadius: 24,
                                        color: "rgb(240, 240, 240)",
                                        borderColor: "transparent",
                                        background: "transparent",
                                        fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                    }
                                        :
                                        btnClicked} onClick={(e) => {
                                            e.preventDefault()
                                            this.setState({
                                                semanaSelected: true
                                            })
                                        }}>Semana</button> */}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                display: 'flex',
                                flexDirection: 'column',
                                color: 'white',
                                // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                width: "100%",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10,
                                cursor: "pointer",
                                // background: "rgba(32, 38, 60, 0.6)",
                                borderRadius: 6,
                                justifyContent: "center",
                                alignItems: "center",
                                height: "20%",
                                background: 'rgba(32, 38, 60, 0.6)'
                            }}>
                                <h4 style={{ margin: 0 }}>{this.props.location.state.totem.ruaPrincipal}</h4>
                                <h4 style={{ margin: 0 }}>{"com " + this.props.location.state.totem.ruaTransversal}</h4>
                            </div>
                            <div style={{
                                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                display: 'flex',
                                flexDirection: 'column',
                                color: 'white',
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                width: "100%",
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10,
                                cursor: "pointer",
                                background: "rgba(32, 38, 60, 0.6)",
                                borderRadius: 6,
                                justifyContent: "center",
                                alignItems: "center",
                                height: "80%"
                            }}>
                                {/* Tráfego Média */}
                                <h4 style={{ color: "rgb(98, 103, 134)" }}>Tráfego Atual</h4>
                                <Circle style={{
                                    width: "75%",
                                    height: "75%",
                                    color: 'rgb(98, 103, 134)'
                                }} percent={this.state.trafegoMedio.toFixed(1) * 10} strokeWidth="5" strokeColor="rgb(181, 44, 231)" trailColor="rgb(98, 103, 134)" />
                                <h1 style={{ position: "absolute", marginTop: 14, fontSize: 50, color: 'rgb(240, 240, 240)' }}>
                                    {this.state.trafegoMedio.toFixed(1)}
                                </h1>
                            </div>
                        </div>

                    </div>

                </div>

                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: "center"
                }}>
                    {this.state.dadosScheduler !== [] ?
                        // console.log(this.state.dadosScheduler)
                        <Scheduler
                            dados={this.state.dadosScheduler} />
                        : null
                    }
                </div>


                <button style={{
                    marginLeft: 8,
                    top: 0,
                    left: 0,
                    position: 'absolute',
                    padding: 2,
                    marginRight: 10,
                    width: 80,
                    height: 30,
                    borderRadius: 8,
                    background: "linear-gradient(to bottom, rgba(0, 172, 151, 0.9), rgba(21, 115, 113, 0.9))",
                    borderColor: "transparent",
                    color: "#eee"
                }} onClick={() => this.props.history.goBack()}><IoIosArrowBack />Voltar</button>

                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0
                }} >
                    <button style={{
                        padding: 2,
                        marginRight: 10,
                        width: 80,
                        height: 30,
                        borderRadius: 8,
                        background: "linear-gradient(to bottom, rgba(0, 172, 151, 0.9), rgba(21, 115, 113, 0.9))",
                        borderColor: "transparent",
                        color: "#eee"
                    }} onClick={() => this.editar()}><GoPencil />Editar</button>
                    <button style={{
                        padding: 2,
                        width: 90,
                        height: 30,
                        borderRadius: 8,
                        background: "linear-gradient(to bottom, rgba(232, 35, 126, 0.9), rgba(171, 46, 110, 0.9))",
                        borderColor: "transparent",
                        color: "#eee"
                    }} onClick={() => this.removeItem()}><GoTrashcan />Remover</button>
                </div>

                <ToastsContainer store={ToastsStore} />
            </div >
        )
    }
}

export default withRouter(Detalhes)
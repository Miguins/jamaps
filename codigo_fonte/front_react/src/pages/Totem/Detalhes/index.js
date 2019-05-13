import React, { Component } from 'react'
import './index.css'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import auth from '../../../config/auth/index'
import { AreaChart, XAxis, Tooltip, Area } from 'recharts'
import { GoPencil, GoTrashcan } from 'react-icons/go'
import { IoIosArrowBack } from 'react-icons/io'
import { Circle } from 'rc-progress';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Scheduler from './scheduler.js'
import { RotateSpinner } from 'react-spinners-kit';

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
        width: window.innerWidth,
        totem: [],
        data: [
            {
                name: "Domingo",
                trafego: 2.1
            },
            {
                name: "Segunda",
                trafego: 7
            },
            {
                name: "Terça",
                trafego: 7.2
            },
            {
                name: "Quarta",
                trafego: 6.9
            },
            {
                name: "Quinta",
                trafego: 8.3
            },
            {
                name: "Sexta",
                trafego: 8.6
            },
            {
                name: "Sabado",
                trafego: 6.3
            },

        ],
        trafegoMedio: 0,
        semanaSelected: false,
        rua: []
    }

    componentDidMount() {
        // console.log(this)
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


    removeItem = async (id) => {

        if (window.confirm('Deseja realmente excluir o item?')) {
            // this.onCancel(item)
            try {
                // var urlLocal = "http://localhost:3001/"
                var urlHeroku = "https://back-jamapas2.herokuapp.com/"
                const data = await Axios.delete(urlHeroku + "totem/delete/" + this.props.location.state.totem.id, {
                    headers: {
                        Authorization: "Bearer " + auth.isAuth()
                    }
                });
                console.log(data)

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
                    Authorization: "Bearer " + auth.isAuth()
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
                    Authorization: "Bearer " + auth.isAuth()
                }
            })

            console.log(data)

            this.setState({
                rua: data.data.data
            })

            this.getTrafego()

        } catch (e) {
            console.log(e)
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
                const data = await Axios.get(urlHeroku + "gethere/cruzamento/" + this.props.location.state.totem.idRua, {
                    headers: {
                        Authorization: "Bearer " + auth.isAuth()
                    }
                })

                console.log(data)

                // this.setState({
                //     rua: data.data.data
                // })


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
            console.log(rua)
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

        // then, map your counts object back to an array
        let reducedObjArr = [...counts].map(([key, value]) => {
            return { key, value }
        })

        console.log(reducedObjArr);



        return reducedObjArr.map((rua, index) => {
            return (
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



                    <h4 style={{ marginBottom: 0, color: 'white' }}>{rua.key}</h4>


                    <div style={{ display: 'flex', justifyContent: 'right', marginLeft: 15 }}>
                        <h4>{(rua.value / cont).toFixed(1)}</h4>
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
                                <h4 style={{ color: "rgb(98, 103, 134)" }}>Performance</h4>
                                <AreaChart width={this.state.width * 0.55} height={250} data={this.state.data}
                                    margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                            <stop offset="95%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="rgb(98, 103, 134)" />
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
                                            }}>Semana</button>
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
                            <AreaChart width={this.state.width * 0.55} height={250} data={this.state.data}
                                margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                        <stop offset="95%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="rgb(98, 103, 134)" />
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
                                        }}>Semana</button>
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
                                height: "20%"
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

                </div>

                <Scheduler />

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
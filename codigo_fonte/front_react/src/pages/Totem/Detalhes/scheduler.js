import React, { Component } from 'react'
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'

import { RotateSpinner } from 'react-spinners-kit';

class Scheduler extends Component {

    state = {
        width: window.innerWidth,
        dados: [],
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
        dia: 1,
        loading: true
    }

    componentDidMount() {
        window.addEventListener("resize", this.updatePredicate);
        console.log(this.props.dados)
        if (this.props.dados.length !== 0) {
            this.setState({
                dados: this.props.dados
            }, this.setState({
                loading: false
            }))
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    componentDidUpdate() {
        if (this.props.dados.length > 0) {
            if (this.state.dados.length === 0) {
                this.setState({
                    dados: this.props.dados
                }, () => {
                    this.setState({
                        loading: false
                    })
                })
            }
        }
    }

    updatePredicate = () => {
        // console.log(window.innerWidth)
        this.setState({ width: window.innerWidth });
    }


    renderDias = () => {
        if (this.state.dados.length !== 0) {



            return [1, 2, 3, 4, 5,
                6, 7, 8, 9, 10,
                11, 12, 13, 14,
                15, 16, 17, 18,
                19, 20, 21, 22,
                23, 24, 25, 26,
                27, 28, 29, 30,
                31].map(dia => {
                    // console.log(dia)
                    return (
                        <button style={this.state.dia === dia ? {
                            outline: 'none',
                            flex: 1,
                            color: '#ddd',
                            padding: 7,
                            borderRadius: 200,
                            borderColor: "linear-gradient(to bottom, rgb(177, 77,198), rgb(185, 45,232))",
                            background: "linear-gradient(to bottom, rgb(177, 77,198), rgb(185, 45,232))"
                        } : {
                                flex: 1, color: '#ddd', padding: 7, borderColor: "transparent",
                                background: "transparent", outline: 'none',
                            }} onClick={() => this.setState({ dia: dia })} >
                            {dia}
                        </button>
                    )
                })

        }
        return null

        // return this.state.dados.map((dia, index) => {
        //     console.log(dia)
        //     // return (
        //     //     <button key={index} style={this.state.dia === dia ? {
        //     //         outline: 'none',
        //     //         flex: 1,
        //     //         color: '#ddd',
        //     //         padding: 7,
        //     //         borderRadius: 200,
        //     //         borderColor: "linear-gradient(to bottom, rgb(177, 77,198), rgb(185, 45,232))",
        //     //         background: "linear-gradient(to bottom, rgb(177, 77,198), rgb(185, 45,232))"
        //     //     } : {
        //     //             flex: 1, color: '#ddd', padding: 7, borderColor: "transparent",
        //     //             background: "transparent", outline: 'none',
        //     //         }} onClick={() => this.setState({ dia: dia })} >
        //     //         {dia.dia}
        //     //     </button>
        //     // )
        // })


    }

    renderHeader = () => {

        return (
            <div style={{
                display: 'flex',
                width: '100%',
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            }}>

                {/* <button style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    flex: 1,
                    background: 'transparent',
                    color: "#ddd",
                    borderTopColor: "transparent"
                }}
                    type="submit">
                    Outromes
                </button> */}


                <div style={{
                    flex: 2,
                    paddingTop: 10,
                    paddingBottom: 10,
                }}>
                    <h3 style={{
                        color: '#ddd'
                    }}>{this.state.dados.length === 0 ? null : "Maio"}</h3>
                </div>

                {/* <button style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    flex: 1,
                    background: 'transparent',
                    color: "#ddd"
                }}
                    type="submit">
                    proximo
                    </button> */}

            </div>
        )
    }

    isDay = (value) => {
        return value.dia === this.state.dia
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

            <div style={{
                marginRight: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                flexDirection: 'column',
                background: 'rgba(32, 38, 60, 0.6)',
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
            }}>
                {/* Barra do topo */}
                {this.renderHeader()}
                {/* Barra de dias */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    {this.renderDias()}
                </div>

                <div style={{
                    marginLeft: 5,
                    display: 'flex',
                    paddingBottom: -5,
                    marginBottom: 5,
                    width: '95%',
                    height: '45vh',
                    background: 'rgba(32, 38, 60, 0.6)',
                }}>
                    {
                        this.state.dados.length === 0
                            ? <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
                                <div className="loading">
                                    <RotateSpinner
                                        size={45}
                                        color="rgb(177, 77,198)"
                                        loading={this.state.loading}
                                    />
                                    {/* <h2 className="text-white">Carregando</h2> */}
                                </div>
                            </div> : this.state.dados.filter(this.isDay).length === 0 ?
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#ddd',
                                    paddingBottom: 30
                                }}>
                                    <h4>Não há dados nesta data</h4>
                                </div>
                                : <AreaChart width={this.state.width * 0.835} height={250}
                                    data={this.state.dados.filter(this.isDay)}
                                    margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                            <stop offset="95%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="hora" stroke="rgb(98, 103, 134)" />
                                    <YAxis stroke="rgb(98, 103, 134)" hide domain={[0, 10]} />
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <Tooltip />
                                    <Area type="monotone" dataKey="trafego" stroke="rgb(114, 39,163)" strokeWidth={1.5} dot={{ stroke: 'rgb(98, 103, 134)', strokeWidth: 1.5 }} fillOpacity={1} fill="url(#colorUv)" />
                                </AreaChart>
                    }

                </div>
            </div>
        )
    }

}

export default Scheduler
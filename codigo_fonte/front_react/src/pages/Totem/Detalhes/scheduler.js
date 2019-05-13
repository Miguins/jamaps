import React, { Component } from 'react'
import { AreaChart, XAxis, Tooltip, Area } from 'recharts'

class Scheduler extends Component {

    state = {
        width: window.innerWidth,
        dados: [
            {
                mes: 'Janeiro',
                dias: [
                    {
                        dia: '1',
                        trafego: [
                            {
                                hora: "16:00",
                                trafego: 7
                            },
                            {
                                hora: "17:00",
                                trafego: 4
                            },
                            {
                                hora: "18:00",
                                trafego: 5
                            },
                            {
                                hora: "19:00",
                                trafego: 6
                            },
                            {
                                hora: "20:00",
                                trafego: 1
                            },
                            {
                                hora: "21:00",
                                trafego: 9
                            },
                            {
                                hora: "22:00",
                                trafego: 8
                            },
                            {
                                hora: "23:00",
                                trafego: 7
                            }
                        ]
                    },
                    {
                        dia: '2',
                        trafego: [
                            {
                                hora: "16:00",
                                trafego: 3
                            },
                            {
                                hora: "17:00",
                                trafego: 6
                            },
                            {
                                hora: "18:00",
                                trafego: 4
                            },
                            {
                                hora: "19:00",
                                trafego: 9
                            },
                            {
                                hora: "20:00",
                                trafego: 1
                            },
                            {
                                hora: "21:00",
                                trafego: 4
                            },
                            {
                                hora: "22:00",
                                trafego: 7
                            },
                            {
                                hora: "23:00",
                                trafego: 1
                            }
                        ]
                    },
                    {
                        dia: '3',
                        trafego: 7
                    },
                    {
                        dia: '4',
                        trafego: 7
                    },
                    {
                        dia: '5',
                        trafego: 7
                    },
                    {
                        dia: '6',
                        trafego: 7
                    },
                    {
                        dia: '7',
                        trafego: 7
                    },
                    {
                        dia: '8',
                        trafego: 7
                    },
                    {
                        dia: '9',
                        trafego: 7
                    },
                    {
                        dia: '10',
                        trafego: 7
                    },
                    {
                        dia: '11',
                        trafego: 7
                    },
                    {
                        dia: '12',
                        trafego: 7
                    },

                    {
                        dia: '13',
                        trafego: 7
                    },
                    {
                        dia: '14',
                        trafego: 7
                    },
                    {
                        dia: '15',
                        trafego: 7
                    },
                    {
                        dia: '16',
                        trafego: 7
                    },
                    {
                        dia: '17',
                        trafego: 7
                    },
                    {
                        dia: '18',
                        trafego: 7
                    },
                    {
                        dia: '19',
                        trafego: 7
                    },
                    {
                        dia: '20',
                        trafego: 7
                    },
                    {
                        dia: '21',
                        trafego: 7
                    },
                    {
                        dia: '22',
                        trafego: 7
                    },
                    {
                        dia: '23',
                        trafego: 7
                    },
                    {
                        dia: '24',
                        trafego: 7
                    },
                    {
                        dia: '25',
                        trafego: 7
                    },
                    {
                        dia: '26',
                        trafego: 7
                    },
                    {
                        dia: '27',
                        trafego: 7
                    },
                    {
                        dia: '28',
                        trafego: 7
                    },
                    {
                        dia: '29',
                        trafego: 7
                    },
                    {
                        dia: '30',
                        trafego: 7
                    },
                    {
                        dia: '31',
                        trafego: 7
                    }
                ],

            },
            {
                mes: 'Fevereiro',
                dias: [],
            }
        ],
        dia: {
            dia: '1',
            trafego: [
                {
                    hora: "16:00",
                    trafego: 7
                },
                {
                    hora: "17:00",
                    trafego: 4
                },
                {
                    hora: "18:00",
                    trafego: 5
                },
                {
                    hora: "19:00",
                    trafego: 6
                },
                {
                    hora: "20:00",
                    trafego: 1
                },
                {
                    hora: "21:00",
                    trafego: 9
                },
                {
                    hora: "22:00",
                    trafego: 8
                },
                {
                    hora: "23:00",
                    trafego: 7
                }
            ]
        },

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
    }

    componentDidMount() {
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate = () => {
        // console.log(window.innerWidth)
        this.setState({ width: window.innerWidth });
    }


    renderDias = () => {
        return this.state.dados[0].dias.map((dia, index) => {
            return (
                <button key={index} style={this.state.dia === dia ? {
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
                    {dia.dia}
                </button>
            )
        })
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
                    }}>{this.state.dados[0].mes}</h3>
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

    render() {
        return (

            <div style={{
                marginRight: 10,
                display: 'flex',
                width: '100%',
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
                    marginLeft: 6,
                    marginRight: 6
                }}>
                    {this.renderDias()}
                </div>

                <div style={{
                    display: 'flex',
                    width: '100%',
                    height: '40vh',
                    background: 'rgba(32, 38, 60, 0.6)',
                }}>
                    <AreaChart width={this.state.width * 0.95} height={250} data={this.state.dia.trafego}
                        margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="rgb(51, 36,87)" stopOpacity={0.9} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="hora" stroke="rgb(98, 103, 134)" />
                        {/* <YAxis stroke="rgb(98, 103, 134)" /> */}
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <Tooltip />
                        <Area type="monotone" dataKey="trafego" stroke="rgb(114, 39,163)" strokeWidth={1.5} dot={{ stroke: 'rgb(98, 103, 134)', strokeWidth: 1.5 }} fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </div>
            </div>
        )
    }

}

export default Scheduler
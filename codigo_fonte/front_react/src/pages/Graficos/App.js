import React, { Component } from 'react';
import './App.css'
import axios from 'axios'
import auth from '../../config/auth/index'
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line, AreaChart } from 'recharts';
import { FiSearch, FiArrowLeft } from 'react-icons/fi'

// ------- GRAFICO ---------
const dataTrending = [{
    name: "nome da rua", media: 1732, valorAtual: 1900, projecao: ((1900 + 1732) / 2)
},
{
    name: "nome da rua", media: 1201, valorAtual: 932, projecao: ((1201 + 932) / 2)
},
{
    name: "nome da rua", media: 1326, valorAtual: 1398, projecao: ((1398 + 1326) / 2)
},
{
    name: "nome da rua", media: 627, valorAtual: 829, projecao: ((829 + 627) / 2)
},
{
    name: "nome da rua", media: 739, valorAtual: 1029, projecao: ((1029 + 739) / 2)
},
{
    name: "nome da rua", media: 593, valorAtual: 1263, projecao: ((1263 + 593) / 2)
},

];



class App2 extends Component {

    state = {
        isDesktop: false,
        width: window.innerWidth,
        img: "",
        ruas: [],
        lista: [],
        pesquisa: false,
        ruaAtual: null,
        dataSemana: [
            {
                "name": "Domingo",
                "Semana Atual": 4000,
                "Semana Anterior": 2400,
                "amt": 2400
            },
            {
                "name": "Segunda",
                "Semana Atual": 3000,
                "Semana Anterior": 1398,
                "amt": 2210
            },
            {
                "name": "Terça",
                "Semana Atual": 2000,
                "Semana Anterior": 9800,
                "amt": 2290
            },
            {
                "name": "Quarta",
                "Semana Atual": 2780,
                "Semana Anterior": 3908,
                "amt": 2000
            },
            {
                "name": "Quinta",
                "Semana Atual": 1890,
                "Semana Anterior": 4800,
                "amt": 2181
            },
            {
                "name": "Sexta",
                "Semana Atual": 2390,
                "Semana Anterior": 3800,
                "amt": 2500
            },
            {
                "name": "Sabado",
                "Semana Atual": 3490,
                "Semana Anterior": 4300,
                "amt": 2100
            }
        ]
    }

    componentDidMount() {
        this.getRuas()
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate = () => {
        // console.log(window.innerWidth)
        this.setState({ width: window.innerWidth });
    }

    getRuas = async () => {


        try {
            const data = await axios.get("http://localhost:3001/gethere/cruzamentos", {
                headers: {
                    Authorization: "Bearer " + auth.isAuth()
                }
            });

            this.setState({
                ruas: data.data.data
            })

            // console.log(data.data.data);

        } catch (e) {
            console.log(e)
        }
    }

    _click = (e) => {
        e.preventDefault()

        // this.setState({
        //     dataSemana: [{
        //         "name": "Domingo",
        //         "uv": 4000,
        //         "pv": 2400,
        //         "amt": 2400
        //     },
        //     {
        //         "name": "Segunda",
        //         "uv": 3000,
        //         "pv": 1398,
        //         "amt": 2210
        //     },
        //     {
        //         "name": "Terça",
        //         "uv": 2000,
        //         "pv": 9800,
        //         "amt": 2290
        //     },
        //     {
        //         "name": "Quarta",
        //         "uv": 2780,
        //         "pv": 3908,
        //         "amt": 2000
        //     },
        //     {
        //         "name": "Quinta",
        //         "uv": 1890,
        //         "pv": 4800,
        //         "amt": 2181
        //     },
        //     {
        //         "name": "Sexta",
        //         "uv": 2390,
        //         "pv": 3800,
        //         "amt": 2500
        //     },
        //     {
        //         "name": "Sabado",
        //         "uv": 3,
        //         "pv": 4,
        //         "amt": 2
        //     }]
        // })
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
            pesquisa: true,
        })

    }

    renderRua = () => {
        // console.log(this.state.ruaAtual)
        if (this.state.pesquisa) {
            // console.log("foi")
            return (
                <div>
                    <button style={{ height: 40, width: 50 }} className="btn btn-light" onClick={() => this.setState({ ruaAtual: null, pesquisa: false })} ><FiArrowLeft /></button>
                    <h5 className="text-titulo-clicked">{this.state.ruaAtual}</h5>
                </div>
            )
        } else {
            return <h5> Pesquisar ruas</h5>
        }
    }

    renderItems = () => {
        if (this.state.ruas.length === 0) {
            return
        } else {
            // console.log(this.state.ruas)

            if (this.state.pesquisa) {
                console.log(this.state.lista)
                return this.state.lista.map((value, index) => {
                    if (index < 5) {
                        // console.log('menor q 5')
                        return (
                            <p class="list-group-item list-group-item-action" onClick={(e) => this._click(e)}>{value.nomeRuaPrincipal}</p>
                        )
                    }
                    return null
                })
            }

            return this.state.ruas.map((value, index) => {
                if (index < 5) {
                    // console.log('menor q 5')
                    return (
                        <p class="list-group-item list-group-item-action" onClick={(e) => this._click(e)}>{value.nomeRuaPrincipal}</p>
                    )
                }
                return null
            })

        }
    }

    render() {
        return (
            <div className="App2" >

                {/* <div style={{ flexDirection: "row", width: 500, margin: 0 }}> */}
                {/* TODO Informações principais da pagina 
                            Ex:
                            -> Movimentação da cidade
                            -> Ruas mais movimentada */}
                <div className="row">
                    {/* TODO grafico de tendencias */}

                    <AreaChart width={(this.state.width * 7.5) / 10} height={350} data={this.state.dataSemana}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="Semana Atual" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="Semana Anterior" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>

                    <section className="sectionCard">
                        <div className="card cardStyle">
                            <div class="card-title" style={{ flexDirection: "row" }}>
                                {this.renderRua()}
                                <form className="form-inline" style={{ marginTop: 5 }}>
                                    <input className="form-control" ref="search" type="search" placeholder="Search" aria-label="Search" style={{ marginRight: 2 }} />
                                    <button className="btn btn-outline-success" type="submit" onClick={(e) => this.busca(e)}><FiSearch /></button>
                                </form>
                            </div>
                            <div className="list-group">
                                {this.renderItems()}
                            </div>
                        </div>
                    </section>
                </div>


                <ComposedChart className="graf-tend " width={this.state.width} height={200} data={dataTrending}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Area type="monotone" dataKey="media" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="valorAtual" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="projecao" stroke="#ff7300" />
                </ComposedChart>

                {/* </div> */}



            </div>
        );
    }
}

export default App2;
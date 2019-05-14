import React, { Component } from 'react'
import Axios from 'axios'
import auth from '../../config/auth/index'
import { withRouter } from 'react-router-dom'
import { RotateSpinner } from 'react-spinners-kit'

class Register extends Component {

    state = {
        loading: false
    }

    _login = (e) => {
        this.props.history.push("/")
    }

    _register = async (e) => {
        e.preventDefault()

        this.setState({
            loading: true
        })

        try {
            // const response = await Axios.get('http://localhost:8080/api/logins', {
            //     email: this.refs.user.value,
            //     password: this.refs.senha.value
            // })

            // var urlLocal = "http://localhost:3001/"
            var urlHeroku = "https://back-jamapas2.herokuapp.com/"

            const response = await Axios.post(urlHeroku + 'auth/register', {
                username: this.refs.user.value,
                password: this.refs.senha.value
            })

            // console.log(response.data.code)

            console.log(response)

            if (response.status === 201) {
                console.log(this)
                auth.login(() => {
                    this.props.history.push("/")
                    this.setState({
                        loading: false
                    })
                })

            }

        } catch (e) {
            console.log(e)
        }


    }

    render() {
        if (this.state.loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', background: "rgb(26,28,49" }}>
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

            return (
                <div style={{ background: "rgb(26,28,49", height: '100vh' }}>
                    <div className="container" >
                        <div className="row">
                            <div className="col-sm-11 col-md-11 col-lg-11 mx-auto">
                                <div className="card card-signin my-5 col-sm-7 mx-auto" style={{ background: "rgba(32, 38, 60, 0.7)" }}>
                                    <div className="card-body align-items-center">

                                        <h2 className="text-monospace text-center" style={{ padding: 30, paddingTop: 20, color: '#fff' }}>Registrar</h2>

                                        <form className="form-signin col-sm" onSubmit={(e) => this._register(e)}>
                                            <div className="form-label-group">
                                                <input style={{ background: "rgba(39, 46, 69, 0.6)", color: "#fff", borderColor: "#fff" }} type="text" ref="user" id="validationTooltipUsername" className="form-control" placeholder="Username" required="required" autoFocus />
                                                <label style={{ color: "#fff" }} htmlFor="validationTooltipUsername">Username</label>

                                            </div>

                                            <div className="form-label-group">
                                                <input style={{ background: "rgba(39, 46, 69, 0.6)", color: "#fff", borderColor: "#fff" }} type="password" ref="senha" id="inputPassword" className="form-control" placeholder="Senha" required />
                                                <label style={{ color: "#fff" }} htmlFor="inputPassword">Senha</label>
                                            </div>


                                            <button style={{ background: "rgb(19, 136, 8)", borderColor: "rgb(19, 136, 8)" }} className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" >Registrar</button>

                                            <button style={{ color: "rgb(19, 136, 8)" }} type="button" className="btn btn-link btn-cadastro text-uppercase" onClick={() => this.props.history.push("/")}>Já tenho conta. Quero entrar</button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

export default withRouter(Register)
import React, { Component } from 'react'
import './index.css'
import Image from '../../images/JamapsLOGO-01.png'
import Axios from 'axios'
import auth from '../../config/auth/index'
import { RotateSpinner } from 'react-spinners-kit'

class Login extends Component {

    state = {
        loading: false,
        error: false
    }

    componentWillUnmount() {

    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    _login = async (e) => {
        e.preventDefault()

        // console.log('cliquei')

        try {
            // const response = await Axios.get('http://localhost:8080/api/logins', {
            //     email: this.refs.user.value,
            //     password: this.refs.senha.value
            // })
            // console.log('Antes do await')

            // var urlLocal = "http://localhost:3001/"
            var urlHeroku = "https://back-jamapas2.herokuapp.com/"

            this.setState({
                loading: true
            })
            const response = await Axios.post(urlHeroku + 'auth/login', {
                username: this.refs.user.value,
                password: this.refs.senha.value
            })

            // console.log(response.data.code)

            console.log(response)

            if (response.status === 200) {
                // console.log(this)
                // auth.setToken()
                localStorage.setItem('auth', response.data.access_token);
                // auth.login(() => {

                this.props.history.push("/home")
                // })

            }
            this.setState({
                loading: false
            })



        } catch (e) {
            console.log(e)
            this.setState({
                loading: false,
                error: true
            }, this.sleep(1000))
        }

    }

    _register = (e) => {
        this.props.history.push("/register")
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
                <div className="body-login" style={{ background: "rgb(26,28,49" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-11 col-md-11 col-lg-11 mx-auto">
                                <div className="card card-signin my-5">
                                    <div className="card-body row align-items-center">

                                        <div className="div-logo-jamaps col-sm">
                                            <img onLoad={() => this.setState({ loading: false })} src={Image} alt="" className="img-fluid" />
                                        </div>

                                        <form className="form-signin col-sm" onSubmit={(e) => this._login(e)}>
                                            <div className="form-label-group" >
                                                <input type="text" ref="user" id="validationDefaultUsername" className="form-control" placeholder="Username" required="required" autoFocus />
                                                <label htmlFor="validationDefaultUsername">Username</label>
                                            </div>

                                            <div className="form-label-group">
                                                <input type="password" ref="senha" id="inputPassword" className="form-control" placeholder="Senha" required />
                                                <label htmlFor="inputPassword">Senha</label>
                                            </div>

                                            {this.state.error ? <div style={{ textAlign: 'center', color: 'red' }}>
                                                Usuário ou senha inválidos.
                                            </div> : null}


                                            <div className="custom-control custom-checkbox mb-3">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Lembrar senha</label>
                                            </div>
                                            <button className="btn btn-lg btn-primary btn-sm btn-block text-uppercase" type="submit">Entrar</button>

                                            <button type="button" className="btn btn-link btn-cadastro text-uppercase" onClick={(e) => this._register(e)}>Não possui cadastro? clique aqui</button>

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
export default Login
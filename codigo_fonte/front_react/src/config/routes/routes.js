import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { PrivateRoute } from '../../components/PrivateRoute/index'

import Home from '../../pages/Home/App'
import Graficos from '../../pages/Graficos/App'
import Login from '../../pages/Login/index'
import Register from '../../pages/Register/index'
import Totem from '../../pages/Totem/index'
import auth from '../auth/index'

import { MdMenu, MdHome, MdGraphicEq } from 'react-icons/md'
import { GoArrowDown } from 'react-icons/go'
import './routes.css'


import Image from '../../images/JamapsLOGO-01.png'
import { Menu, Segment, Sidebar } from 'semantic-ui-react'


class Main extends Component {

    state = {
        hover: false,
        visible: false,
        visibleRight: false
    }

    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })

    handleHideRightClick = () => this.setState({ visibleRight: false })
    handleShowRightClick = () => this.setState({ visibleRight: true })
    handleSidebarRightHide = () => this.setState({ visibleRight: false })

    _logoff(e) {
        auth.logout(() => {
            this.props.history.push("/")
        })
    }

    hoverOn() {
        if (this.state.visible === false) {
            console.log('abriu')
            this.handleShowClick()
        } else {
            console.log('fecha')
            this.handleHideClick()
        }
    }

    hoverRight() {
        if (this.state.visibleRight === false) {
            console.log('abriu')
            this.handleShowRightClick()
        } else {
            console.log('fecha')
            this.handleHideRightClick()
        }
    }

    upperCasePrimeiraLetra(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    NavTitle = ({ match }) => {
        // console.log(match)
        return (
            <div className="top-bar" >
                <button style={{ height: 40, width: 60 }} className="btn btn-light btn-menu" onClick={(e) => this.hoverOn()}><MdMenu /></button>
                <p className="text-titulo">{this.upperCasePrimeiraLetra(match.params.id)}</p>
            </div>
        )
    }

    SidebarContent = () => {
        // console.log(match)
        return (
            <Router>
                <Sidebar.Pushable as={Segment} >

                    <Sidebar
                        as={Menu}
                        animation='push'
                        icon='labeled'
                        inverted
                        // onHide={this.handleSidebarHide}
                        className="sidebar-style"
                        vertical
                        visible={this.state.visible}
                        width='thin'>

                        <div className="">
                            <img src={Image} alt="" className="img-fluid" />
                        </div>
                        <h2 className="text-white" >JAMAPS</h2>

                        <Link to={{ pathname: "/home" }} className="text-white" ><Menu.Item><MdHome />Home</Menu.Item></Link>
                        <Link to="/graficos"><Menu.Item ><MdGraphicEq />Graficos</Menu.Item></Link>
                        <Link to="/totem"><Menu.Item ><MdGraphicEq />Totens</Menu.Item></Link>
                        <Link to="/" onClick={(e) => this._logoff(e)} ><Menu.Item><GoArrowDown />Logoff</Menu.Item> </Link>


                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic className="no-padding">
                            <div className="body-home" style={{ flexDirection: "column" }}>
                                <Route path="/:id" component={this.NavTitle} />
                                {/* <div style={{ backgroundColor: '#000', width: '100%', height: 1 }}></div> */}
                            </div>

                            <div style={{ flexDirection: 'row' }}>
                                <div style={{ background: '#ddd' }} className="page-content">
                                    <PrivateRoute path="/home" component={Home} />
                                    <PrivateRoute path="/graficos" component={Graficos} />
                                    <PrivateRoute path="/totem" component={Totem} />
                                </div>
                            </div>

                            <div className="footer-content">
                                <h6>&#9400; Não pode desfuder o que já está fudido - Jamal, 2018</h6>
                            </div>


                        </Segment>
                    </Sidebar.Pusher>



                </Sidebar.Pushable>
            </Router >
        )
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/home" component={this.SidebarContent} />
                <PrivateRoute path="/graficos" component={this.SidebarContent} />
                <PrivateRoute path="/totem" component={this.SidebarContent} />
            </Router>
        )
    }
}


export default Main
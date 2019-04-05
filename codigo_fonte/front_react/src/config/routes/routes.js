import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { PrivateRoute } from '../../components/PrivateRoute/index'

import Home from '../../components/Home/App'
import Graficos from '../../components/Graficos/App'
import Login from '../../components/Login/index'
import Register from '../../components/Register/index'
import auth from '../auth/index'

import './routes.css'

function _logoff(e) {
    auth.logout(() => {
        this.props.history.push("/")
    })
}

function SidebarContent() {
    return (
        <Router>
            <div>
                <Link to="/home" >Home</Link>
                <Link to="/graficos">Graficos</Link>

                <Link to="/" onClick={(e) => _logoff(e)} >Logoff</Link>
            </div>
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/graficos" component={Graficos} />
        </Router>
    )
}

function Main() {
    return (
        <Router>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/home" component={SidebarContent} />
        </Router>
    )
}


export default Main
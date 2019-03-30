import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Home from '../../components/Home/App'
import Graficos from '../../components/Graficos/App'

import './routes.css'

const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/graficos",
        component: Graficos
    }
];

function Sidebar() {
    return (
        <Router>
            <div className="pageBody">
                {/* Renderiza a SideBar */}
                <div
                    className="navBody">

                    <ul className="list">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/1">1</Link>
                        </li>
                        <li>
                            <Link to="/graficos">Graficos</Link>
                        </li>
                    </ul>

                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                        />
                    ))}
                </div>

                {/* Renderiza os componentes */}
                <div style={{ flex: 1, padding: "10px" }}>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))}
                </div>
            </div>
        </Router>
    );
}



export default Sidebar;
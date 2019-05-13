import React from 'react'

class RouteLineAdHERE extends React.Component {

    componentDidUpdate(prevProps) {
        const { shape } = this.props
        if (this.didShapeChange(prevProps.shape, shape)) {
            this.addRouteLineToMap()
        }
    }

    componentWillUnmount() {
        const { map } = this.props;

        if (map && this.routeLine) {
            map.removeObject(this.routeLine)
        }
    }

    didShapeChange = (prevShape, nextShape) => {
        const diff = nextShape.filter((coord, i) => {
            if (coord && prevShape && prevShape[i]) {
                return coord !== prevShape[i]
            }
            return true
        })
        return Boolean(diff.length)
    }

    addRouteLineToMap() {
        const { map } = this.props

        const { shape, strokeColor, lineWidth } = this.props

        const linestring = new window.H.geo.LineString()
        shape.forEach(point => {
            const [lat, lng] = point.split(',')
            linestring.pushLatLngAlt(Number(lat), Number(lng), 1)
        })

        const routeLine = new window.H.map.Polyline(linestring, {
            style: { strokeColor, lineWidth },
        })

        if (map) {
            if (this.routeLine) {
                map.removeObject(this.routeLine)
            }
            map.addObject(routeLine)

            this.routeLine = routeLine
        }
    }

    render() {
        const { map } = this.props

        if (map && !this.routeLine) {
            this.addRouteLineToMap()
        }

        return null
    }
}

export default RouteLineAdHERE
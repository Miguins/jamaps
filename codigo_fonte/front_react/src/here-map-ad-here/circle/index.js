import React from 'react'

export class CircleAdHERE extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
            this.setCenter({
                lat: prevProps.lat,
                lng: prevProps.lng,
            })
        }

        if (prevProps.radius && prevProps.radius !== this.props.radius) {
            this.setRadius(prevProps.radius)
        }
    }

    componentWillUnmount() {
        const { map } = this.props

        if (map && this.circle) {
            map.removeObject(this.circle)
        }
    }

    addCircleToMap() {
        const { map } = this.props

        const { lat, lng, strokeColor, lineWidth, fillColor, radius } = this.props

        const circle = new window.H.map.Circle(
            {
                lat,
                lng,
            },
            radius,
            {
                style: {
                    fillColor,
                    lineWidth,
                    strokeColor,
                },
            },
        )
        if (map) {
            map.addObject(circle)

            this.circle = circle
        }
    }

    setCenter(point) {
        if (this.circle) {
            this.circle.setCenter(point)
        }
    }

    setRadius(radius) {
        if (this.circle) {
            this.circle.setRadius(radius)
        }
    }

    render() {
        const { map } = this.props

        if (map && !this.circle) {
            this.addCircleToMap()
        }

        return null
    }
}

export default CircleAdHERE
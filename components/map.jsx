"use client"

import { useState, useEffect, useRef } from "react"
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { TailSpin } from "react-loader-spinner"

const MapComponent = ({ center, zoom, className }) => {
    const ref = useRef()
    const markerRef = useRef()

    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
            center,
            zoom,
        })

        markerRef.current = new window.google.maps.Marker({
            position: center,
            map: map,
        })

        return () => {
            // Clean up the marker on component unmount
            markerRef.current.setMap(null)
        }
    }, [zoom, center])

    return (
        <div
            className={`w-full h-[400px] rounded-t-[30px] z-0 ${className}`}
            ref={ref}
            id='map'
        />
    )
}

const ErrorComponent = () => {
    console.error("occured error in MapComponent")
}

const Map = ({ className = "" }) => {
    const [center, setCenter] = useState({})
    const [allowedPosition, setAllowPosition] = useState(false)
    useEffect(() => {
        const success = (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude

            setCenter({ lat, lng })
            setAllowPosition(true)
        }
        const error = (error) => {
            console.log(error)
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error)
        } else {
            alert("Unable to retrieve your location, browser not supported")
        }
    }, [])

    const render = (status) => {
        if (status === Status.LOADING)
            return (
                <TailSpin
                    height='80'
                    width='80'
                    color='#4fa94d'
                    ariaLabel='tail-spin-loading'
                    radius='1'
                    wrapperStyle={{}}
                    wrapperClass=''
                    visible={true}
                />
            )
        else if (status === Status.FAILURE) return <ErrorComponent />
        return null
    }

    return (
        <>
            {allowedPosition && (
                <Wrapper
                    apiKey={process.env.GOOGLE_MAPS_API_KEY}
                    render={render}
                >
                    <MapComponent
                        className={className}
                        center={center}
                        zoom={15}
                    />
                </Wrapper>
            )}
        </>
    )
}

export default Map

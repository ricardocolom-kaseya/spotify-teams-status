import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAuth(code) {

    const [accessToken, setAccessToken] = useState()

    useEffect(() => {
        axios.post("http://localhost:4000/login", {
            code
        }).then(res => {

            setAccessToken(res.data.accessToken)
            window.history.pushState({}, null, "/")

        }).catch(
            () => { window.location = "/" }
        )
    }, [code])

    return accessToken
}

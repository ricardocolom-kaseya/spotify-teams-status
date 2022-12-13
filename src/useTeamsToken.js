import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function useTeamsToken() {

    const [isValid, changeIsValid] = useState(false)

    function checkValidity(modalToken) {
        console.log(modalToken)
        let body = {}
        axios.put("http://localhost:4000/status", body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${modalToken}`
            }
        }).then(res => {
            if (res.data == 'OK') {
                console.log(res.data)
                changeIsValid(true)
            }
            else {
                changeIsValid(false)
            }
        }).catch((err) => {
            console.log(err.response.status)
            changeIsValid(false)
            console.log("Token is invalid or expired, please copy a new one")
        })
    }

    return { checkValidity, isValid, changeIsValid }
}

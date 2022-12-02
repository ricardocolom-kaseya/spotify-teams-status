import React from 'react'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a248cdcebd804022917a3c7fc1d66d76&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-playback-state%20user-read-currently-playing`

export default function Login() {
  return (
    <div>
        <a href={AUTH_URL}>Log in</a>
    </div>
  )
}

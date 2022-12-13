import React, { useState, useEffect } from 'react'
import useAuth from './useAuth'

import axios from 'axios'
import SpotifyWebApi from "spotify-web-api-node"
import { Button, HStack, VStack, Text, Box, Image } from '@chakra-ui/react'

import useInterval from './useInterval'

import SongCard from './components/SongCard'
import StatusBar from './components/StatusBar'

import useTeamsToken from './useTeamsToken'

const spotifyApi = new SpotifyWebApi({
  clientId: "a248cdcebd804022917a3c7fc1d66d76",
})

export default function Dashboard({ code }) {

  const accessToken = useAuth(code)

  const [teamsToken, setTeamsToken] = useState(localStorage.getItem('teamsToken'))

  const [userName, setUserName] = useState("No name")
  const [playingTrack, setPlayingTrack] = useState(
    {
      name: "No song playing",
      artists: [""],
      album_name: "None",
      img: null,
      id: "",
    }
  )

  const [isPlaying, setIsPlaying] = useState(false)

  const [pushToTeams, setPushToTeams] = useState(window.localStorage.getItem("pushToTeams"))

  function outputSongToConsole() {
    let artists = []

    playingTrack.artists.forEach(artist => {
      artists.push(artist)
    });

    let out = {
      name: playingTrack.name,
      album_name: playingTrack.album_name,
      artists,
      img: playingTrack.img,
      id: playingTrack.id,
    }

    console.log(JSON.stringify(out, null, 2))
  }

  function pauseOrResumeSong() {
    if (isPlaying) {
      spotifyApi.pause()
        .then(function () {
          console.log("Pause")
        }, function (err) {
          console.log('Something went wrong!', err)
        })
    }
    else {
      spotifyApi.play()
        .then(function () {
          // console.log("Pause")
        }, function (err) {
          console.log('Something went wrong!', err)
        })
    }
  }

  function previousSong() {
    spotifyApi.skipToPrevious()
      .then(function () {
        // console.log("Previous")
      }, function (err) {
        console.log('Something went wrong!', err)
      })
  }

  function nextSong() {
    spotifyApi.skipToNext()
      .then(function () {
        // console.log("Next")
      }, function (err) {
        console.log('Something went wrong!', err)
      })
  }

  function forcePushToTeams() {
    if (accessToken == undefined)
      return;
    // Only do a push if the user is listening to a song.
    spotifyApi.getMyCurrentPlaybackState()
      .then(function (playbackData) {
        //console.log(playbackData)
        if (playbackData.body != null && playbackData.body.is_playing) {
          //console.log(playingTrack)
          let message = { "trackInfo": playingTrack.artists[0] + " - " + playingTrack.name };

          console.log("Pushing to teams -> " + message.trackInfo)
          axios.put("http://localhost:4000/status", message, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${teamsToken}`
            }
          }).then(response => {
            //console.log(response)
          }).catch((err) => console.log(err))
        }
      }, function (err) { console.log('Something went wrong!', err) })
  }

  function getUserInfo() {
    spotifyApi.getMe()
      .then(function (data) {
        setUserName(data.body.display_name)
        return data.body;
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  }

  function getCurrentSong() {

    // Only change the song info if the user is currently listening to a song.
    spotifyApi.getMyCurrentPlaybackState()
      .then(function (playbackData) {
        if (playbackData.body != null && playbackData.body.is_playing) {
          setIsPlaying(true)
          // Get the currently playing track.
          spotifyApi.getMyCurrentPlayingTrack()
            .then(function (trackData) {
              if (trackData.body != null) {
                let name = trackData.body.item.name
                let artists = []
                trackData.body.item.artists.forEach(artist => {
                  artists.push(artist.name)
                });
                let album_name = trackData.body.item.album.name
                let img = trackData.body.item.album.images[0].url
                let id = trackData.body.item.id

                // Only call setPlayingTrack if the current track id is different from the one in the state
                if (id != playingTrack.id) {
                  setPlayingTrack(
                    {
                      name: name,
                      artists: artists,
                      album_name: album_name,
                      img: img,
                      id: id
                    }
                  )
                }
              }
            }, function (err) {
              console.log('Something went wrong!', err);
            })
        }
        else
          setIsPlaying(false)
      }, function (err) {
        console.log('Something went wrong!', err)
      })
  }

  useEffect(() => {
    //console.log(accessToken)
    if (accessToken != undefined) {
      spotifyApi.setAccessToken(accessToken)
      getCurrentSong();
      getUserInfo();
    }

  }, [accessToken])

  useInterval(() => getCurrentSong(), 1000)

  useEffect(() => {
    if (accessToken != undefined && teamsToken != undefined) {
      console.log("Track changed")
      if (pushToTeams)
        forcePushToTeams()
    }
  }, [playingTrack])

  useEffect(() => {
    if (accessToken != undefined && pushToTeams) {
      forcePushToTeams()
    }
  }, [pushToTeams])

  useEffect(() => {
    if (accessToken != undefined && teamsToken != undefined) {
      forcePushToTeams()
    }
  }, [teamsToken])

  const DashboardContent = () => {
    if (accessToken != undefined) {
      return (
        <VStack w="100vw" h="100vh" justify="center" align="center" spacing="6">
          <Text fontSize="2xl">Hey, {userName}</Text>
          <VStack borderRadius="lg" spacing="0" boxShadow="xl" w="lg">
            <SongCard playingTrack={playingTrack} isPlaying={isPlaying} setIsPlaying={setIsPlaying} pauseOrResumeSong={pauseOrResumeSong} />
            <Box w="100%" h="2px" bg="gray.800" />
            <StatusBar teamsToken={teamsToken} setTeamsToken={setTeamsToken} isPlaying={isPlaying} pauseOrResumeSong={pauseOrResumeSong} setPushToTeams={setPushToTeams} previousSong={previousSong} nextSong={nextSong} useTeamsToken={useTeamsToken} />
          </VStack>
          <Button onClick={() => {
            outputSongToConsole();
          }}>Output song information to console</Button>
        </VStack>
      )
    }
  }

  return (
    <DashboardContent />
  )
}

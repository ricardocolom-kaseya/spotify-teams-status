import React, { useState, useEffect } from 'react'
import useAuth from './useAuth'

import SpotifyWebApi from "spotify-web-api-node"
import { Button, HStack, VStack, Text, Box, Image, Checkbox, useInterval } from '@chakra-ui/react'
import axios from 'axios'

import userInterval from './useInterval'

const spotifyApi = new SpotifyWebApi({
  clientId: "a248cdcebd804022917a3c7fc1d66d76",
})

const SongCard = ({ playingTrack }) => {

  let allArtists = "";

  if ((playingTrack.artists).length > 1) {
    playingTrack.artists.forEach(name => {
      if ((playingTrack.artists).indexOf(name) != playingTrack.artists.length - 1)
        allArtists += name + ", "
      else
        allArtists += name
    });
  }
  else
    allArtists = playingTrack.artists[0]

  return (
    <Box bg="gray.700" minW="sm" maxW="lg" borderRadius="lg">
      <HStack p="3" spacing="2" w="100%" align="center">
        <Image src={playingTrack.img} w="128px" h="128px" fallbackSrc='https://via.placeholder.com/128/FFFFFF/000000' objectFit="contain" borderRadius="md" />
        <VStack w="100%" align="left" spacing="0" px="4">
          <Text fontSize="xl" fontWeight="bold">{playingTrack.name}</Text>
          <Text fontSize="lg">{allArtists}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default function Dashboard({ code }) {

  const accessToken = useAuth(code)

  const [userName, setUserName] = useState("No name")
  const [playingTrack, setPlayingTrack] = useState(
    {
      name: "None",
      artists: ["None"],
      album_name: "None",
      img: null,
      id: "",
    }
  )

  const [pushToTeams, changePushToTeams] = useState(window.localStorage.getItem("pushToTeams"))

  const TEAMS_TOKEN = "eyJ0eXAiOiJKV1QiLCJub25jZSI6InJxNjVOcnNPZmhiOWlIZVQtdGs1WFo1c3kxN1g1Zk10RGZRRXR4Vi12a28iLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL3ByZXNlbmNlLnRlYW1zLm1pY3Jvc29mdC5jb20vIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTFjZDM0MzYtNjA2Mi00MTY5LWExYmQtNzllZmRjZmQ4YTVlLyIsImlhdCI6MTY3MDM0NDEyNiwibmJmIjoxNjcwMzQ0MTI2LCJleHAiOjE2NzA0MTc5NTQsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFXU3MrR3pGeFNEekJ2OTk0UFd1b3NRd3laZnB0R2l0c1VnSnNXQkRhRFVZNWJUUi80SEpIYnJVMVVQaDRhanhxY29QWGpFeGtYaGNtZDVFdlRCWURUY1JNVTl2KzlYR2lnaGZmZEVZdncvRT0iLCJhbXIiOlsicHdkIiwid2lhIiwibWZhIl0sImFwcGlkIjoiNWUzY2U2YzAtMmIxZi00Mjg1LThkNGItNzVlZTc4Nzg3MzQ2IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJDb2xvbSIsImdpdmVuX25hbWUiOiJSaWNhcmRvIiwiaXBhZGRyIjoiMTcwLjU1LjE0NS4yNDIiLCJuYW1lIjoiUmljYXJkbyBDb2xvbSIsIm9pZCI6IjIxMGFmODZmLWFhMzctNGU0Yi04MTA5LTcxZDZkY2Q0MjdhMCIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xMTM3MTA1OTYtMzExODI0MDU4LTczMDczNTY0MC0yOTcyNyIsInB1aWQiOiIxMDAzMjAwMjQ2RTIwOTlEIiwicmgiOiIwLkFTd0FOalROb1dKZ2FVR2h2WG52M1AyS1hpZk5jQjRIUjRsRmpzV2IwZ3hIS2tZc0FEdy4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJxcGtyUF9zNmI2MDVvOURJTm80SGhYRTJYU0M3SUktRUNqSlFrT1FmQXZ3IiwidGlkIjoiYTFjZDM0MzYtNjA2Mi00MTY5LWExYmQtNzllZmRjZmQ4YTVlIiwidW5pcXVlX25hbWUiOiJyaWNhcmRvLmNvbG9tQGthc2V5YS5jb20iLCJ1cG4iOiJyaWNhcmRvLmNvbG9tQGthc2V5YS5jb20iLCJ1dGkiOiJ5b29aekFzZXdFaTVDRk5YY19oMUFBIiwidmVyIjoiMS4wIiwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfc3NtIjoiMSJ9.Rq41F2CtMwkDTl2kK-G99mH_IIRjROWPrgZEFgT0yFQm-sIyQFKDZV1QdEgABaSMICNZQym-uGVfrtWyUdvDzF0z5cv52BQ1Zl62eYVRO3zQsOhOHdzNvD680eocjpTRyxcZGpB3KHyll-fbXA6UeIrKdM_4iSamFbXL_VNS-_MFdf5NUYuvdNnBVwOVkgtvpXMTM8ZFsFE6bgTdvI-zdJqFPZyKPcSZIidkXxT9wK2zfucNMdfUFx1sVKWrtHN5SJIhxJCkA2DrxPbvcHyd71QDiWJhPY-O-QyyYmMGHjE8GpNA5kfbrN5W0IysdBKNXGnseAFWnpeDQVRG7BTURA"

  function outputSongToConsole() {
    let artists = []

    console.log(playingTrack.artists)

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

  function forcePushToTeams() {
    // Only do a push if the user is listening to a song.
    spotifyApi.getMyCurrentPlaybackState()
      .then(function (playbackData) {
        //console.log(playbackData)
        if (playbackData.body != null && playbackData.body.is_playing) {
          //console.log(playingTrack)
          let message = { "message": "[𝗦𝗽𝗼𝘁𝗶𝗳𝘆] 𝗟𝗶𝘀𝘁𝗲𝗻𝗶𝗻𝗴 𝘁𝗼: " + playingTrack.artists[0] + " - " + playingTrack.name };

          console.log("Pushing to teams...")
          console.log(message.message)
          axios.put("http://localhost:4000/status", message, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${TEAMS_TOKEN}`
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

                //console.log(artists[0].name + " - " + name)
              }
            }, function (err) {
              console.log('Something went wrong!', err);
            })
        }
      }, function (err) {
        console.log('Something went wrong!', err)
      })
  }

  useEffect(() => {
    if (accessToken != undefined) {
      console.log(accessToken)
      spotifyApi.setAccessToken(accessToken)
      getUserInfo();
    }

  }, [accessToken])

  useInterval(() => getCurrentSong(), 1000)

  useInterval(() => forcePushToTeams(), (pushToTeams) ? 10000 : null)

  useEffect(() => {
    console.log("Track changed")
  }, [playingTrack])

  const DashboardContent = () => {
    if (accessToken != undefined) {
      return (
        <VStack w="100vw" h="100vh" justify="center" align="center" spacing="6">
          <Text fontSize="2xl">Hey, {userName}</Text>
          <SongCard playingTrack={playingTrack} />
          <Box bg="gray.700" minH="16" borderRadius="lg">
            <HStack p="4" px="8" w="100%" h="100%" align="center" justify="center">
              <Checkbox size="lg" colorScheme="purple" spacing="4" onChange={(e) => { changePushToTeams(e.target.checked); window.localStorage.setItem("pushToTeams", e.target.checked) }} defaultChecked={window.localStorage.getItem("pushToTeams") == "true" ? true : false}>
                <Text>Auto push to Teams</Text>
              </Checkbox>
            </HStack>
          </Box>
          <Button onClick={() => { forcePushToTeams() }}>Force push to teams</Button>
          <Button onClick={() => { outputSongToConsole() }}>Output to console</Button>
        </VStack>
      )
    }
  }

  return (
    <div>
      {/* <Text pos="absolute" top="0" right="0">
        {accessToken}
      </Text> */}

      {DashboardContent()}
    </div>
  )
}

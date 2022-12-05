import React, { useState, useEffect } from 'react'
import useAuth from './useAuth'

import SpotifyWebApi from "spotify-web-api-node"
import { Button, HStack, VStack, Text, Box, Image, Checkbox } from '@chakra-ui/react'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
  clientId: "a248cdcebd804022917a3c7fc1d66d76",
})

const SongCard = ({ playingTrack }) => {

  return (
    <Box bg="gray.700" minW="sm" maxW="lg" borderRadius="lg">
      <HStack p="3" spacing="6" w="100%" align="center">
        <Image src={playingTrack.img} w="128px" h="128px" fallbackSrc='https://via.placeholder.com/128' objectFit="contain" />
        <VStack w="100%" align="left" spacing="0">
          <Text fontSize="xl" fontWeight="bold">{playingTrack.name}</Text>
          <Text fontSize="lg">{playingTrack.artists[0].name}</Text>
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
      artists: "None",
      album_name: "None",
      img: null,
      id: "",
    }
  )

  const [pushToTeams, changePushToTeams] = useState(window.localStorage.getItem("pushToTeams"))

  const TEAMS_TOKEN = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlFSMklsMmxFNVFHYU4tOHM1VW1MYXNoaXp4WkpUbmZIVG5PVF85bVdEYkkiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FwaS5zcGFjZXMuc2t5cGUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTFjZDM0MzYtNjA2Mi00MTY5LWExYmQtNzllZmRjZmQ4YTVlLyIsImlhdCI6MTY3MDI1NDIxNiwibmJmIjoxNjcwMjU0MjE2LCJleHAiOjE2NzAzMjk1NTMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVVFBdS84VEFBQUFjcjJlREtiOGxzYkQxTjVNZHFsa0tsb3BTa2VqTVUyT0xJQUZrQlEwdXU4TThwY1JkdHlvS0M3b2x4T08xcXYxS2JXT0pJU1VtS2ZSTUV1M2ppMkxzUT09IiwiYW1yIjpbInB3ZCIsIndpYSIsIm1mYSJdLCJhcHBpZCI6IjVlM2NlNmMwLTJiMWYtNDI4NS04ZDRiLTc1ZWU3ODc4NzM0NiIsImFwcGlkYWNyIjoiMCIsImF1dGhfdGltZSI6MTY3MDI1NDUxMywiZmFtaWx5X25hbWUiOiJDb2xvbSIsImdpdmVuX25hbWUiOiJSaWNhcmRvIiwiaXBhZGRyIjoiMTcwLjU1LjE0NS4yNDIiLCJuYW1lIjoiUmljYXJkbyBDb2xvbSIsIm9pZCI6IjIxMGFmODZmLWFhMzctNGU0Yi04MTA5LTcxZDZkY2Q0MjdhMCIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xMTM3MTA1OTYtMzExODI0MDU4LTczMDczNTY0MC0yOTcyNyIsInB1aWQiOiIxMDAzMjAwMjQ2RTIwOTlEIiwicmgiOiIwLkFTd0FOalROb1dKZ2FVR2h2WG52M1AyS1hsZjlGY3hzTEJkQnFJeURzZFZyUzc0c0FEdy4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWQiOiI5ZmE5OGU5NS05NDVjLTRiOGItYTNhNS1mZjRkY2E3ZjUyNDUiLCJzdWIiOiJsUUVZRHdPdkt1RU5acU80aTJfQ2tOamZXNFhCTlZxQ0NINE9IdFBnV1NzIiwidGlkIjoiYTFjZDM0MzYtNjA2Mi00MTY5LWExYmQtNzllZmRjZmQ4YTVlIiwidW5pcXVlX25hbWUiOiJyaWNhcmRvLmNvbG9tQGthc2V5YS5jb20iLCJ1cG4iOiJyaWNhcmRvLmNvbG9tQGthc2V5YS5jb20iLCJ1dGkiOiJiTzN5Z3NLMTkwaWZUdk1YaUVUSEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfc3NtIjoiMSJ9.FyNjE3wFitx9xDHt-g-u0pu0ML3zxNBSMXyIq6b6emPALggYCr224fActO7flMToPG_MAPS_xBoyUBBjfBorFr-D02AICCDqwNO-HRY771yd5kPaDt4ySX1srEnJhBgKdmwk8KK0tN2W3v32IIRg-OCGpB5C-ZeGen6UkFWyvY6hZ1FQCD1r1Tqz7i1M6Enu7K0Aqj05DLV8wxfRFkGSXsrjZ5hF-vRSrdRC7d0WWXsuL9rf8O97L2gtenfANPfMHBbc4PHGQGK8JKvpwAdfXt458nz_KaTOAOAD1BSQU1sLhIXwzb8cg8ZhnbN_uQdmu5S3YRagApID_7Dy_oJipQ"

  function forcePushToTeams() {

    // Only do a push if the user is listening to a song.
    spotifyApi.getMyCurrentPlaybackState()
      .then(function (playbackData) {
        //console.log(playbackData)
        if (playbackData.body != null && playbackData.body.is_playing) {
          //console.log(playingTrack)
          let message = { "message": "[𝗦𝗽𝗼𝘁𝗶𝗳𝘆] 𝗟𝗶𝘀𝘁𝗲𝗻𝗶𝗻𝗴 𝘁𝗼: " + playingTrack.artists[0].name + " - " + playingTrack.name };
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

    //console.log(playingTrack)

    // Only change the song info if the user is currently listenint to a song.
    spotifyApi.getMyCurrentPlaybackState()
      .then(function (playbackData) {
        if (playbackData.body != null && playbackData.body.is_playing) {
          // Get the currently playing track.
          spotifyApi.getMyCurrentPlayingTrack()
            .then(function (trackData) {
              if (trackData.body != null) {
                let name = trackData.body.item.name
                let artists = trackData.body.item.artists
                let album_name = trackData.body.item.album.name
                let img = trackData.body.item.album.images[0].url
                let id = trackData.body.item.id

                // Only call setPlayingTrack if the current track id is different from the one in the state
                if(id != playingTrack.id)
                {
                  console.log(id)
                  console.log(playingTrack)
                  setPlayingTrack(
                    {
                      name, artists, album_name, img, id
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
      getCurrentSong();

      const getSongInterval = setInterval(() => { getCurrentSong()}, 1000);

      return () => clearInterval(getSongInterval)
    }

  }, [accessToken])
  useEffect(() => {

    console.log("useEffect triggered")

    if (pushToTeams) {
      // this interval is being reset too fast, since this useEffect runes every second due to playingTrack being a dependeny, the interval never has time to get to the 10 seconds.

      // Try running the function NOT in an anonymous call
      const pushToTeamsInterval = setInterval(() => forcePushToTeams(), 10000)

      return () => clearInterval(pushToTeamsInterval)
    }
  }, [pushToTeams, playingTrack])

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
        </VStack>
      )
    }
    else
      return (<Text>No token</Text>)
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

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
    <Box bg="gray.700" w="sm" borderRadius="lg">
      <HStack p="3" spacing="6" w="100%" align="center">
        <Image src={playingTrack.img} boxSize="30%" fallbackSrc='https://via.placeholder.com/128' />
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
      img: null
    }
  )

  const [pushToTeams, changePushToTeams] = useState(false)

  const TEAMS_TOKEN = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkdUdlVueXNjZDg1bW43aTdHM0xRdDk1RmtQVWdrTFJUaGoxSEhaQmhQdjgiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL3ByZXNlbmNlLnRlYW1zLm1pY3Jvc29mdC5jb20vIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTFjZDM0MzYtNjA2Mi00MTY5LWExYmQtNzllZmRjZmQ4YTVlLyIsImlhdCI6MTY3MDAxMzI5MywibmJmIjoxNjcwMDEzMjkzLCJleHAiOjE2NzAwOTMyOTgsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUE0MGpKVGxnSHlKZm9WRU5UVGZMODVDT3ZEMEo1eHZUY2NtTHpXNm5QNkY4N3NSRFUxUjA2YTJMc05HaUJqZ0ZwUlo0Q1NpWUNIL3dHSFh2TXRhSy9ISnNxVmZldytRaDVTQ0tpckxZTkFmST0iLCJhbXIiOlsicHdkIiwid2lhIiwibWZhIl0sImFwcGlkIjoiNWUzY2U2YzAtMmIxZi00Mjg1LThkNGItNzVlZTc4Nzg3MzQ2IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJDb2xvbSIsImdpdmVuX25hbWUiOiJSaWNhcmRvIiwiaXBhZGRyIjoiNTAuMTg1LjEyOS42NSIsIm5hbWUiOiJSaWNhcmRvIENvbG9tIiwib2lkIjoiMjEwYWY4NmYtYWEzNy00ZTRiLTgxMDktNzFkNmRjZDQyN2EwIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTExMzcxMDU5Ni0zMTE4MjQwNTgtNzMwNzM1NjQwLTI5NzI3IiwicHVpZCI6IjEwMDMyMDAyNDZFMjA5OUQiLCJyaCI6IjAuQVN3QU5qVE5vV0pnYVVHaHZYbnYzUDJLWGlmTmNCNEhSNGxGanNXYjBneEhLa1lzQUR3LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6InFwa3JQX3M2YjYwNW85RElObzRIaFhFMlhTQzdJSS1FQ2pKUWtPUWZBdnciLCJ0aWQiOiJhMWNkMzQzNi02MDYyLTQxNjktYTFiZC03OWVmZGNmZDhhNWUiLCJ1bmlxdWVfbmFtZSI6InJpY2FyZG8uY29sb21Aa2FzZXlhLmNvbSIsInVwbiI6InJpY2FyZG8uY29sb21Aa2FzZXlhLmNvbSIsInV0aSI6IjZNOFBpU1BTTjBheUFDOV9vVnQ3QUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfY2MiOlsiQ1AxIl0sInhtc19zc20iOiIxIn0.X4sdHgOctbdB8yzLru-gbDa7rrA1n9_N37UHQPxI7gMHpcZGumzTQKR7oKiIgzjh0IaqGQ-5hkYjmaGMqMz22hgwJokcg6tSBl3a2INrn_B3d7hXNn4RBqaITrxwQVoCSYwLyg7wsW5QHaBEnogNsPJc3rm7o3so2m1qBtXU1LmNCtwgtMEKw397CVd9jcVIk08XnIr6mc88mPcBMCPEZx0duZNKOWo31IosLesrmhHbQcKHouzFVUSqxtmsKG3SDDSSCgk4WGcf67rQuNmm4Lf38YRjuq7eB5Hzf-6w9ZerbKeNd--4nT890rftAFhZnWZUHlpF3FL3by9Rsyaa_g"

  function forcePushToTeams() {
    let message = playingTrack.name;
    axios.put("http://localhost:4000/status", message, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TEAMS_TOKEN}`
      }
    }).then(response => {
      console.log(response)
    }).catch((err) => console.log(err))
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
    spotifyApi.getMyCurrentPlayingTrack()
      .then(function (data) {
        let name = data.body.item.name
        let artists = data.body.item.artists
        let album_name = data.body.item.album.name
        let img = data.body.item.album.images[0].url

        setPlayingTrack(
          {
            name, artists, album_name, img
          }
        )
      }, function (err) {
        console.log('Something went wrong!', err);
      })
  }

  useEffect(() => {
    if (accessToken != undefined) {
      console.log(accessToken)
      spotifyApi.setAccessToken(accessToken)
      getUserInfo();
      const interval = setInterval(() => { getCurrentSong() }, 1000);

      return () => clearInterval(interval)
    }

  }, [accessToken])

  const DashboardContent = () => {
    if (accessToken != undefined) {
      return (
        <VStack w="100vw" h="100vh" justify="center" align="center" spacing="6">
          <Text fontSize="2xl">Hey, {userName}</Text>
          <SongCard playingTrack={playingTrack} />
          <Box bg="gray.700" minH="16" borderRadius="lg">
            <HStack p="4" px="8" w="100%" h="100%" align="center" justify="center">
              <Checkbox size="lg" colorScheme="purple" spacing="4">
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

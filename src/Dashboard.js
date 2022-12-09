import React, { useState, useEffect } from 'react'
import useAuth from './useAuth'

import axios from 'axios'
import SpotifyWebApi from "spotify-web-api-node"
import { Button, HStack, VStack, Text, Box, Image, Checkbox, IconButton, Icon, Divider, LightMode, useDisclosure, Heading, Input } from '@chakra-ui/react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'
import { SiMicrosoftteams, SiTampermonkey } from 'react-icons/si'
import { MdSave } from 'react-icons/md'

import useInterval from './useInterval'
import TeamsSnippet from './TeamsSnippet'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

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
    <HStack bg="gray.700" spacing="2" w="100%" align="center" p="3" borderTopRadius="lg">
      <Image src={playingTrack.img} w="128px" h="128px" fallbackSrc='https://via.placeholder.com/128/FFFFFF/000000' objectFit="contain" borderRadius="md" />
      <VStack w="100%" align="left" spacing="0" px="4">
        <Text fontSize="xl" fontWeight="bold">{playingTrack.name}</Text>
        <Text fontSize="lg">{allArtists}</Text>
      </VStack>
    </HStack>
  )
}

const StatusBar = ({ teamsToken, setTeamsToken, isPlaying, pauseOrResumeSong, setPushToTeams, previousSong, nextSong }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [modalToken, setModalToken] = useState("")
  const [doSave, setDoSave] = useState(false)

  function onTrySave() {
    console.log("Trying to save...")
    let message = {}
    axios.put("http://localhost:4000/status", message, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${modalToken}`
      }
    }).then(res => {
      if (res.data == 'OK') {
        console.log(res.data)
        setDoSave(true)
        onClose();
      }
    }).catch((err) => {
      console.log(err.response.status)
      console.log("Token is invalid or expired, please copy a new one")
    })
  }

  const teamsButton = () => {
    if (teamsToken) {
      return (
        <HStack w="100%" justify="space-around">
          <Button colorScheme="purple" size="sm" variant="ghost" p="0">
            <LightMode>
              <Checkbox size="md" colorScheme="purple" spacing="4" p="4" onChange={(e) => { setPushToTeams(e.target.checked); window.localStorage.setItem("pushToTeams", e.target.checked) }} defaultChecked={window.localStorage.getItem("pushToTeams") == "true" ? true : false}>
                <Text color="white">Push to Teams</Text>
              </Checkbox>
            </LightMode>
          </Button>
          <LightMode>
            <Button colorScheme="red" _hover={{ backgroundColor: '#00000025' }} _active={{backgroundColor: '#00000050'}} variant="outline" size="sm" onClick={() => { setTeamsToken(undefined) }} color="red.500">
              Reset Token
            </Button>
          </LightMode>
        </HStack>
      )
    }
    else {
      return (
        <>
          <LightMode>
            <Button colorScheme="purple" bg="#444791" size="sm" variant="solid" onClick={onOpen}>
              <HStack>
                <Icon as={SiMicrosoftteams} w="20px" h="20px" color="white" />
                <Text color="white">Get your Teams status token</Text>
              </HStack>
            </Button>
          </LightMode>
          <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl" onCloseComplete={() => {
            if (doSave) {
              setDoSave(false)
              setTeamsToken(modalToken)
            }
          }}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Get your Teams status token</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="6">
                  <Heading size="md">What is this?</Heading>
                  <Text>Every Microsoft Teams user has a unique token that is used to make changes to your current status. This token is reset about every day or so.</Text>
                  <Text>I wrote a script to make it easy to get your token after logging in to Microsoft Teams on your browser.</Text>
                  <LightMode>
                    <HStack spacing="2" w="80%" justifyContent="space-between">
                      <Button colorScheme="blackAlpha" _hover={{bg: '#272e3d'}} size="sm" variant="solid" w="216px" onClick={() => window.open('https://greasyfork.org/en/scripts/456296-microsoft-teams-status-token-grabber')}>
                        <HStack w="100%">
                          <Icon as={SiTampermonkey} w="20px" h="20px" color="white" />
                          <Text color="white" w="100%">Get the script</Text>
                        </HStack>
                      </Button>
                      <Button colorScheme="purple" bg="#444791" size="sm" variant="solid" w="216px" onClick={() => window.open("https://teams.microsoft.com")}>
                        <HStack w="100%">
                          <Icon as={SiMicrosoftteams} w="20px" h="20px" color="white" />
                          <Text color="white" w="100%">Log in to Microsoft Teams</Text>
                        </HStack>
                      </Button>
                    </HStack>
                  </LightMode>
                  <TeamsSnippet />
                  <HStack w="100%">
                    <Input w="100%" variant="outline" placeholder='Paste your teams token here' onChange={(e) => setModalToken(e.target.value)} />
                    <Button variant="outline" colorScheme="blue" rightIcon={<Icon as={MdSave} w={4} h={4} />} onClick={onTrySave}>Save</Button>
                  </HStack>
                </VStack>
              </ModalBody>
            </ModalContent>
            <ModalFooter>
              <LightMode>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </LightMode>
            </ModalFooter>
          </Modal>
        </>
      )
    }
  }

  return (
    <VStack w="100%" bg="gray.700" borderBottomRadius="lg" p="2">
      <HStack w="100%" spacing="0" justify="center">
        <IconButton variant="ghost" icon={<Icon as={FaStepBackward} />} onClick={() => previousSong()} />
        <IconButton variant="ghost" icon={isPlaying ? <Icon as={FaPause} /> : <Icon as={FaPlay} />} onClick={() => pauseOrResumeSong()} />
        <IconButton variant="ghost" icon={<Icon as={FaStepForward} />} onClick={() => nextSong()} />
      </HStack>
      <HStack w="100%" justify="center" pb="2">
        {teamsButton()}
      </HStack>
    </VStack>
  )
}

export default function Dashboard({ code }) {

  const accessToken = useAuth(code)
  const [teamsToken, setTeamsToken] = useState(undefined)

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
    if (accessToken != undefined) {
      // console.log(accessToken)
      spotifyApi.setAccessToken(accessToken)
      getCurrentSong();
      getUserInfo();
    }

  }, [accessToken])

  useInterval(() => getCurrentSong(), 1000)

  useEffect(() => {
    console.log("Track changed")

    if (teamsToken != undefined) {
      if (pushToTeams)
        forcePushToTeams()
    }
  }, [playingTrack])

  useEffect(() => {
    if (pushToTeams)
      forcePushToTeams()
  }, [pushToTeams])

  useEffect(() => {
    if (teamsToken != undefined) {
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
            <StatusBar teamsToken={teamsToken} setTeamsToken={setTeamsToken} isPlaying={isPlaying} pauseOrResumeSong={pauseOrResumeSong} setPushToTeams={setPushToTeams} previousSong={previousSong} nextSong={nextSong} />
          </VStack>
          <Button onClick={() => {
            outputSongToConsole();
          }}>Output song information to console</Button>
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

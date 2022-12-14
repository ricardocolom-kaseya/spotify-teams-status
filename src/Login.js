import React, { useState } from 'react'
import { VStack, Heading, Text, Button, LightMode, Box, Avatar, AvatarBadge, HStack, Textarea, Divider, useColorMode } from '@chakra-ui/react'
import { ArrowForwardIcon, EditIcon, PhoneIcon, ChatIcon, UpDownIcon, StarIcon, CheckIcon } from '@chakra-ui/icons'
import { faker } from "@faker-js/faker"

import { pickRandomSong } from './SongList'

import ToggleColorButton from './components/ToggleColorButton'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a248cdcebd804022917a3c7fc1d66d76&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-playback-state%20user-read-currently-playing%20user-modify-playback-state`

export default function Login() {

  const { colorMode, toggleColorMode } = useColorMode()

  const [randomSong, setRandomSong] = useState(pickRandomSong())
  const [randomName, setRandomName] = useState(faker.name.firstName() + " " + faker.name.lastName());

  return (
    <>
      <ToggleColorButton toggleColorMode={toggleColorMode} />
      <VStack h="100vh" w="100vw" justify="center" spacing="12">
        <Heading as="h1" size="xl" m="4">Spotify x Microsoft Teams Status</Heading>
        <VStack spacing="6">
          <Box w="540px" minH="2xs" bg={colorMode === 'light' ? "gray.50" : "gray.700"} borderRadius="xl" boxShadow="md">
            <VStack m="6" h="100%" spacing="0" align="center">
              <VStack w="90%" spacing="0" pb="4">
                <HStack w="100%" spacing="8" py="3">
                  <Box align="center">
                    <Avatar size="xl" name={randomName}>
                      <AvatarBadge boxSize="42px" bg="green.500" borderColor={colorMode === 'light' ? "gray.50" : "gray.700"}>
                        <CheckIcon w="16px" h="16px" color="white" />
                      </AvatarBadge>
                    </Avatar>
                  </Box>
                  <VStack align="left" spacing="1">
                    <Text fontWeight="bold" fontSize="xl">{randomName}</Text>
                    <VStack align="left" spacing="0" color={colorMode === 'light' ? "gray.500" : "gray.300"}>
                      <Text fontSize="lg">Product Manager</Text>
                      <Text fontSize="lg">R&D</Text>
                      <Text fontSize="lg">Available</Text>
                    </VStack>
                  </VStack>
                </HStack>
                <HStack w="100%" justify="left" color={colorMode === 'light' ? "gray.500" : "gray.300"}>
                  <Box p="3" pl="2" py="2">
                    <ChatIcon w="24px" h="24px" />
                  </Box>
                  <Box p="3" py="2">
                    <UpDownIcon w="24px" h="24px" />
                  </Box>
                  <Box p="3" py="2">
                    <StarIcon w="24px" h="24px" />
                  </Box>
                  <Box p="3" py="2">
                    <PhoneIcon w="24px" h="24px" />
                  </Box>
                </HStack>
              </VStack>
              <Box w="100%" py="3">
                <Box h="1px" w="100%" bg="gray.800" />
              </Box>
              <VStack pt="3" w="100%">
                <Box p="3" align="center" justify="center" w="100%" borderWidth="1px" borderRadius="lg" borderColor="gray.300" boxShadow="md">
                  <HStack w="100%" justify="space-between">
                    <Box h="112px" w="6px" borderRadius="6px" bg="gray.600" />
                    <Box bg={colorMode === 'light' ? "gray.200" : "gray.700"} w="56px" h="56px" borderRadius="56px" align="center" justify="center">
                      <EditIcon h="100%" w="24px" color={colorMode === 'light' ? "gray.500" : "gray.300"} />
                    </Box>
                    <VStack w="80%" align="left">
                      <HStack spacing="1" w="100%" align="left">
                        <Text fontWeight="bold" fontSize="lg">Status message</Text>
                        <Text fontSize="lg">•</Text>
                        <Text fontSize="lg" color={colorMode === 'light' ? "gray.500" : "gray.300"}>{new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1')}</Text>
                      </HStack>
                      <Text w="100%" fontSize="lg" align="left"><strong>[Spotify] Listening to:</strong> {randomSong.artists[0]} - {randomSong.name}</Text>
                    </VStack>
                  </HStack>
                </Box>
              </VStack>
            </VStack>
          </Box>
          <Text fontSize="xl">This could be you!</Text>
        </VStack>
        <LightMode>
          <a href={AUTH_URL}>
            <Button colorScheme="green" rightIcon={<ArrowForwardIcon />} size="lg" >Log in to Spotify</Button>
          </a>
        </LightMode>
      </VStack>
    </>
  )
}

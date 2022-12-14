import React, { useState, useEffect, useRef } from 'react'

import { Button, HStack, VStack, Text, Checkbox, IconButton, Icon, LightMode, useDisclosure, Heading, Input, useColorMode, DarkMode } from '@chakra-ui/react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'
import { SiMicrosoftteams, SiTampermonkey } from 'react-icons/si'
import { MdSave } from 'react-icons/md'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import TeamsSnippet from './TeamsSnippet'

export default function StatusBar({ teamsToken, setTeamsToken, isPlaying, pauseOrResumeSong, setPushToTeams, previousSong, nextSong, useTeamsToken, mounted }) {

    const { colorMode } = useColorMode()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [modalToken, setModalToken] = useState(teamsToken)

    const { checkValidity, isValid, changeIsValid } = useTeamsToken()

    useEffect(() => {
        console.log('Mounting StatusBar')
        trySave()

        return () => { console.log('Unmounting StatusBar') }
    }, [])

    function trySave() {
        checkValidity(modalToken)
    }

    useEffect(() => {
        if (isValid) {
            localStorage.setItem('teamsToken', modalToken)
            onClose();
            setTeamsToken(modalToken)
        }
    }, [isValid])

    const TeamsButton = () => {
        if (isValid) {
            return (
                <HStack w="100%" justify="space-around">
                    <Button colorScheme="purple" size="sm" variant="ghost" p="0">
                        <LightMode>
                            <Checkbox size="md" colorScheme="purple" spacing="4" p="4" onChange={(e) => { setPushToTeams(e.target.checked); window.localStorage.setItem("pushToTeams", e.target.checked) }} defaultChecked={window.localStorage.getItem("pushToTeams") == "true" ? true : false}>
                                <Text color={colorMode === 'light' ? "gray.800" : "white"}>Push to Teams</Text>
                            </Checkbox>
                        </LightMode>
                    </Button>
                    <LightMode>
                        <Button colorScheme="red" _hover={{ backgroundColor: '#00000025' }} _active={{ backgroundColor: '#00000050' }} variant="outline" size="sm" onClick={() => { changeIsValid(false) }} color="red.500">
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
                        if (isValid) {
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
                                            <DarkMode>
                                                <Button colorScheme="black"  bg="#303030" _hover={{ bg: '#121212' }} size="sm" variant="solid" w="216px" onClick={() => window.open('https://greasyfork.org/en/scripts/456296-microsoft-teams-status-token-grabber')}>
                                                    <HStack w="100%">
                                                        <Icon as={SiTampermonkey} w="20px" h="20px" color="white" />
                                                        <Text color="white" w="100%">Get the script</Text>
                                                    </HStack>
                                                </Button>
                                            </DarkMode>
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
                                        <Button variant="outline" colorScheme="blue" rightIcon={<Icon as={MdSave} w={4} h={4} />} onClick={() => { trySave() }}>Save</Button>
                                    </HStack>
                                </VStack>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </>
            )
        }
    }

    return (
        <VStack w="100%" bg={colorMode === 'light' ? "gray.200" : "gray.700"} borderBottomRadius="lg" p="2">
            <HStack w="100%" spacing="0" justify="center">
                <IconButton variant="ghost" icon={<Icon as={FaStepBackward} />} onClick={() => previousSong()} />
                <IconButton variant="ghost" icon={isPlaying ? <Icon as={FaPause} /> : <Icon as={FaPlay} />} onClick={() => pauseOrResumeSong()} />
                <IconButton variant="ghost" icon={<Icon as={FaStepForward} />} onClick={() => nextSong()} />
            </HStack>
            <HStack w="100%" justify="center" pb="2">
                <TeamsButton />
            </HStack>
        </VStack>
    )
}
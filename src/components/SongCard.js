import React from 'react'
import { HStack, VStack, Text, Image } from '@chakra-ui/react'

export default function SongCard({ playingTrack }) {

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
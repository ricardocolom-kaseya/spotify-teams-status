import { SearchIcon } from '@chakra-ui/icons'
import { Box, Center, HStack, VStack, Text, Icon, Avatar, AvatarBadge } from '@chakra-ui/react'
import { TbGridDots, TbDots, TbBell, TbArrowUpRight } from 'react-icons/tb'
import React from 'react'

export default function TeamsSnippet() {
    return (
        <VStack spacing="0" w="100%" color="white" borderRadius="lg" bg="#444791" transform="scale(0.8)">
            <Icon as={TbArrowUpRight} pos="absolute" right="56" w="8" h="8" color="red" top="8"/>
            <HStack w="100%" justify="space-between" spacing="0" h="36px" align="center">
                <HStack justify="left" spacing="2" w="25%" px="2">
                    <Center h="100%" px="1.5">
                        <Icon as={TbGridDots} w="5" h="5" />
                    </Center>
                </HStack>
                <HStack w="100%" spacing="2" h="24px">
                    <HStack w="100%" bg="gainsboro" justify="left" borderRadius="md" color="gray" spacing="0" h="100%">
                        <Center px="2" pos="relative">
                            <SearchIcon w="3" h="3" size="sm" />
                        </Center>
                        <Text fontSize="sm">
                            Search
                        </Text>
                    </HStack>
                    <HStack borderWidth="1px" borderColor="white" borderRadius="md" w="220px" h="100%" justify="center">
                        <Text fontSize="xs" fontWeight="bold">
                            Copy Status Token
                        </Text>
                    </HStack>
                </HStack>
                <HStack w="25%" px="2" justify="right">
                    <Icon as={TbDots} w="5" h="5" />
                    <Avatar size="xs">
                        <AvatarBadge boxSize='1em' bg='green.300' />
                    </Avatar>
                </HStack>
            </HStack>
            <HStack w="100%" justify="space-between" spacing="0" h="44px" align="center">
                <HStack justify="left" spacing="0" w="21%" bg="gainsboro" h="100%">
                    <Center h="100%" px="2" py="1">
                        <VStack spacing="0" color="gray">
                            <Icon as={TbBell} w="5" h="5" color="gray" />
                            <Text fontSize="2xs">Activity</Text>
                        </VStack>
                    </Center>
                    <Box shadow="-2px 0px 4px grey" h="100%" w="100%" />
                </HStack>
                <Box w="100%" bg="lightgray" shadow="-2px 0px 4px grey" spacing="0" h="100%" />
            </HStack>
        </VStack>
    )
}

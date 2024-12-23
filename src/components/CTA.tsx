'use client'

import {
  Box,
  HStack,
  Text,
  Button
} from '@chakra-ui/react'
import '../components/Quiz'
import React from 'react'

export default function SplitScreen() {
  return (
    <Box bg='white'>
    <Box w="100%" h="80vh" bgGradient='linear(to-br, #00E5BA, #B074FD)' borderRadius={'0% 0% 27% 62% / 14% 10% 1% 3%'}>
      <HStack w="100%" justify="space-evenly" pt='6rem'>
        <HStack minH='50vh' w="70%" justify="space-evenly" >
          <HStack  w="100%" justify="space-evenly" >
            <Box w='30%'>
              <Text fontSize="5xl" color={"#00283A"} fontWeight="semibold">Spot and Stop Rumors with RumorGuard</Text>
              <Text fontSize="xl" color={"#00283A"}  mt="2rem">From the nation’s leading provider of news literacy resources</Text>
              <Button bg="#164F66" mt='2rem' borderRadius="full" fontWeight="bold" fontSize={"sm"} px="2rem" color={'white'}
                 _hover={{
                  transform: "scale(1.1)",
                }}
                transition="transform 0.2s ease-in-out, background-color 0.2s ease-in-out"
             >Explore More
             </Button>
            </Box>
            <Box w="40%" h="100%"> 
              <my-lit-component name="React"/>
            </Box>
            
          </HStack>
        </HStack>
        </HStack>
    </Box>
    <Box bg='white' h='20vh'></Box>
 
    </Box>
  )
}
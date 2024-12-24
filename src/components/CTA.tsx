"use client";

import { Box, HStack, Text, Button } from "@chakra-ui/react";
import "../components/Quiz";
import { MyLitComponentWrapper } from "./test";
export default function SplitScreen() {
  const items = [
    {
      picture:
        "⁦https://www.rumorguard.org/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foxdwsi28%2Fproduction%2Fc3a2f21abb36fd44335fdcc6172abd6d7f705a92-688x835.png&w=1920&q=75⁩",
      date: 1734930917,
      question: "Did JFK Call To Ban Coke?",
      answer: false,
      article: 'https://www.rumorguard.org/post/no-rfk-jr-didn-t-call-to-ban-diet-coke'
    },
    {
      picture:
        "⁦https://www.rumorguard.org/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foxdwsi28%2Fproduction%2Fb3efeb89f1fa651dc0c4c672e02a3ac2af43afd1-696x866.png&w=1920&q=75⁩",
      date: 1734900654,
      question: "Did World Leaders call for a death treaty?",
      answer: false,
      article: 'https://www.rumorguard.org/post/no-world-leaders-didn-t-sign-age-of-death-treaty'
    },
  ];
  return (
    <Box bg="white">
      <Box
        w="100%"
        h="80vh"
        bgGradient="linear(to-br, #00E5BA, #B074FD)"
        borderRadius={"0% 0% 27% 62% / 14% 10% 1% 3%"}
      >
        <HStack w="100%" justify="space-evenly" pt="6rem">
          <HStack minH="50vh" w="70%" justify="space-evenly">
            <HStack w="100%" justify="space-evenly">
              <Box w="30%">
                <Text fontSize="5xl" color={"#00283A"} fontWeight="semibold">
                  Spot and Stop Rumors with RumorGuard
                </Text>
                <Text fontSize="xl" color={"#00283A"} mt="2rem">
                  From the nation’s leading provider of news literacy resources
                </Text>
                <Button
                  bg="#164F66"
                  mt="2rem"
                  borderRadius="full"
                  fontWeight="bold"
                  fontSize={"sm"}
                  px="2rem"
                  color={"white"}
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                  transition="transform 0.2s ease-in-out, background-color 0.2s ease-in-out"
                >
                  Explore More
                </Button>
              </Box>
              <Box w="40%" h="100%">
                <MyLitComponentWrapper items={items}></MyLitComponentWrapper>
              </Box>
            </HStack>
          </HStack>
        </HStack>
      </Box>
      <Box bgColor="white" h="20vh"></Box>
    </Box>
  );
}

"use client";

import { Box, HStack, Text, Button, Link } from "@chakra-ui/react";
import "../components/Quiz";
import { MyLitComponentWrapper } from "./test";
import React, { useState, useEffect } from "react";

import { client } from "./../sanity/client";

const POSTS_QUERY = `*[_type == "post"]{
  "image": image.asset->url,
    "answer": answer,
    "question": question,
    "article": article,
    "date": publishedAt
}`;

const options = { next: { revalidate: 30 } };
/* interface Post {
  id: number;
  title: string;
  body: string;
} */

/* interface Props {
  posts: Post[];
} */

export default function CTA() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await client.fetch(POSTS_QUERY, {}, options);
      const json = await response;
      setData(json);
    }

    fetchData();
  }, []); // Empty dependency array means the effect runs once on mount
  // const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const items = data;
  return (
    <Box bg="white">
      <Box
        w="100%"
        h="85vh"
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
                <Link href="https://www.rumorguard.org/about">
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
                </Link>
              </Box>
              <Box w="60%" h="100%">
                <MyLitComponentWrapper items={items}></MyLitComponentWrapper>
              </Box>
            </HStack>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}

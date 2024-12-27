import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
interface LocalNewsContent {
  localNewsWebsites: { newspaperName: string; link: string }[];
}

interface Message {
  role: string;
  content: LocalNewsContent | string;
}

interface ChildProps {
  messages: Message[];
  newsURL: string;
  onSubmit: (arg: number) => void;
}

const Zipcode: React.FC<ChildProps> = ({ messages, onSubmit }) => {
  const [buttonvisible, setbuttonvisible] = useState(true);
  const submit = (arg: number) => {
    setbuttonvisible(false);
    console.log("buttonPressed");
    onSubmit(arg);
  };
  const lastMessage = messages[2];

  const isLocalNewsContent = (
    content: string | LocalNewsContent,
  ): content is LocalNewsContent => {
    return (
      typeof content === "object" &&
      content !== null &&
      "localNewsWebsites" in content
    );
  };

  if (!isLocalNewsContent(lastMessage.content)) {
    return <Box w="100%" p="1rem"></Box>;
  }

  return (
    <div>
      <Box w="100%" p="1rem">
        <Text fontSize="3xl" color={"#00283A"} fontWeight="semibold">
          Please select a news website from below to find articles from:
        </Text>
        <ol style={{ listStyleType: "none", padding: 0 }}>
          {lastMessage.content.localNewsWebsites.map((site, index) => (
            <Box my="1rem" key={index}>
              <li>
                <Text fontSize={"xl"}>
                  {index + 1}. <strong>{site.newspaperName}</strong>
                </Text>
                <Text>{site.link}</Text>
              </li>
            </Box>
          ))}
        </ol>
        {buttonvisible && (
          <>
            <Button
              bg="#164F66"
              mt="2rem"
              borderRadius="full"
              fontWeight="bold"
              fontSize={"md"}
              px="2rem"
              color={"white"}
              onClick={() => submit(0)}
              m="1rem"
            >
              Select Site 1
            </Button>
            <Button
              bg="#164F66"
              mt="2rem"
              borderRadius="full"
              fontWeight="bold"
              fontSize={"md"}
              px="2rem"
              color={"white"}
              onClick={() => submit(1)}
              m="1rem"
            >
              Select Site 2
            </Button>
            <Button
              bg="#164F66"
              mt="2rem"
              borderRadius="full"
              fontWeight="bold"
              fontSize={"md"}
              px="2rem"
              color={"white"}
              onClick={() => submit(2)}
              m="1rem"
            >
              Select Site 3
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Zipcode;

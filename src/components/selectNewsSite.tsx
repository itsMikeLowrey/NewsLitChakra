import { Box, Button, Text } from "@chakra-ui/react";

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
            <li key={index}>
              {index + 1}. <strong>{site.newspaperName}</strong>
              <br />
              {site.link}
            </li>
          ))}
        </ol>
        <Button
          bg="#164F66"
          mt="2rem"
          borderRadius="full"
          fontWeight="bold"
          fontSize={"md"}
          px="2rem"
          color={"white"}
          onClick={() => onSubmit(0)}
        >
          Select 1
        </Button>
        <Button
          bg="#164F66"
          mt="2rem"
          borderRadius="full"
          fontWeight="bold"
          fontSize={"md"}
          px="2rem"
          color={"white"}
          onClick={() => onSubmit(1)}
        >
          Select 2
        </Button>
        <Button
          bg="#164F66"
          mt="2rem"
          borderRadius="full"
          fontWeight="bold"
          fontSize={"md"}
          px="2rem"
          color={"white"}
          onClick={() => onSubmit(2)}
        >
          Select 3
        </Button>
      </Box>
    </div>
  );
};

export default Zipcode;

import { Box, Button, Text } from "@chakra-ui/react";

interface Message {
  role: string;
  content: string;
}

interface ChildProps {
  messages: Message[];
  onSubmit: (arg: number) => void;
}

const Zipcode: React.FC<ChildProps> = ({ messages, onSubmit }) => {
  const lastMessage = messages[4];
  return (
    <div>
      <Box w="100%" p="1rem">
        <Text fontSize="3xl" color={"#00283A"} fontWeight="semibold">
          Please select an article below:
        </Text>
        <ol style={{ listStyleType: "none", padding: 0 }}>
          {lastMessage.content["articles"].map((site, index) => (
            <li key={index}>
              {index + 1}. <strong>{site.title}</strong>
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

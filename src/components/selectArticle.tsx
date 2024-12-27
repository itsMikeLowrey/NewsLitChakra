import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Message {
  role: string;
  content: string | object;
}

interface ChildProps {
  messages: Message[];
  onSubmit: (arg: number) => void;
}

const Select: React.FC<ChildProps> = ({ messages, onSubmit }) => {
  const [buttonvisible, setbuttonvisible] = useState(true);
  const submit = (arg: number) => {
    setbuttonvisible(false);
    console.log("buttonPressed");
    onSubmit(arg);
  };
  const lastMessage = messages[4];

  if (!lastMessage.content["articles"]) {
    return <div></div>;
  }
  return (
    <div>
      <Box w="100%" p="1rem">
        <Text fontSize="3xl" color={"#00283A"} fontWeight="semibold">
          Please select an article below:
        </Text>
        <ol style={{ listStyleType: "none", padding: 0 }}>
          {lastMessage.content["articles"].map((site, index) => (
            <Box my="1rem" key={index}>
              <li>
                <Text fontSize={"xl"} mb="">
                  {index + 1}. <strong>{site.title}</strong>
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
              mt="1rem"
              borderRadius="full"
              fontWeight="bold"
              fontSize={"md"}
              px="2rem"
              mx=".5rem"
              color={"white"}
              onClick={() => submit(0)}
            >
              Select Article 1
            </Button>
            <Button
              bg="#164F66"
              mt="1rem"
              borderRadius="full"
              fontWeight="bold"
              fontSize={"md"}
              px="2rem"
              mx=".5rem"
              color={"white"}
              onClick={() => submit(1)}
            >
              Select Article 2
            </Button>
            <Button
              bg="#164F66"
              mt="1rem"
              borderRadius="full"
              fontWeight="bold"
              fontSize={"md"}
              px="2rem"
              mx=".5rem"
              color={"white"}
              onClick={() => submit(2)}
            >
              Select Article 3
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Select;

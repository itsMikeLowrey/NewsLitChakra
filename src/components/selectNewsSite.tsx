import { Box, Button } from "@chakra-ui/react";
interface Message {
  role: string;
  content: string;
}
interface ChildProps {
  messages: Message[];
  newsURL: string;
}

const Zipcode: React.FC<ChildProps> = ({ messages }) => {
  console.log(messages);
  return (
    <div>
      <Box w="70%" p="1rem">
        <Button
          bg="#164F66"
          mt="2rem"
          borderRadius="full"
          fontWeight="bold"
          fontSize={"md"}
          px="2rem"
          color={"white"}
          // onClick={submit}
          transition="transform 0.2s ease-in-out, background-color 0.2s ease-in-out"
        >
          Start
        </Button>
      </Box>
    </div>
  );
};

export default Zipcode;

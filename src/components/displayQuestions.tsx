import { Box, Text } from "@chakra-ui/react";

interface Message {
  role: string;
  content: string | object;
}

interface ChildProps {
  messages: Message[];
}

const Display: React.FC<ChildProps> = ({ messages }) => {
  const lastMessage = messages[6];
  console.log(messages[6]['content'])
  return (
    <div>
      <Box w="100%" p="1rem">
        <Text fontSize="3xl" color={"#00283A"} fontWeight="semibold">
          Please select an article below:
        </Text>
        {lastMessage['content'].map(user => (
          <li key={user.id}>
            {user.statement} ({user.trueOrFalse})
          </li>
        ))}
      </Box>
    </div>
  );
};

export default Display;

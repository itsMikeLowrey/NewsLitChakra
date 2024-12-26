// @ts-nocheck
import { Box, Text } from "@chakra-ui/react";

interface Message {
  role: string;
  content: Array<string> | string | object;
}

interface ChildProps {
  messages: Message[];
  articlePage: string;
}

const Display: React.FC<ChildProps> = ({ messages, articlePage }) => {
  const lastMessage = messages[6];
  console.log(messages[6]["content"]);
  return (
    <div>
      <Box w="100%" p="1rem">
        <Text fontSize="3xl" color={"#00283A"} fontWeight="semibold">
          Here are 3 statements from the article: here
          <a href={articlePage} target="_blank">
            here
          </a>
          . You can play 2 truths and a lie with your students.
        </Text>
        {lastMessage["content"].map((item) => (
          <>
            <Text fontSize="2xl" color={"#00283A"} fontWeight="">
              Statment: {item.statement}
            </Text>
            <Text fontSize="md" color={"#00283A"} fontWeight="">
              This Statement is: {item.truth.toString()}
            </Text>
          </>
        ))}
      </Box>
    </div>
  );
};

export default Display;

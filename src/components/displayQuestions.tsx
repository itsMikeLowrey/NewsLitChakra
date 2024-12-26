import { Box, Text } from "@chakra-ui/react";

interface Statement {
  statement: string;
  truth: boolean;
}

interface Message {
  role: string;
  content: string | { statements?: Statement[] };
}

interface ChildProps {
  messages: Message[];
  articlePage: string;
}

const Display: React.FC<ChildProps> = ({ messages, articlePage }) => {
  const lastMessage = messages[6];

  const statements =
    typeof lastMessage?.content === "object" && lastMessage.content.statements
      ? lastMessage.content.statements
      : [];

  return (
    <div>
      <Box w="100%" p="1rem">
        <Text fontSize="3xl" color={"#00283A"} fontWeight="semibold">
          Here are 3 statements from the article:{" "}
          <a href={articlePage} target="_blank" rel="noopener noreferrer">
            here
          </a>
          . You can play 2 truths and a lie with your students.
        </Text>
        {statements.map((user, index) => (
          <div key={index}>
            <Text fontSize="2xl" color={"#00283A"}>
              Statement: {user.statement}
            </Text>
            <Text fontSize="md" color={"#00283A"}>
              This Statement is: {user.truth.toString()}
            </Text>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default Display;

import { Box, Button, Text } from "@chakra-ui/react";
interface ChildProps {
  zipcode: string;
  setZipcode: (value: string) => void;
  words: string[];
  setWords: (words: string[]) => void;
  onSubmit: () => void;
}

const Zipcode: React.FC<ChildProps> = ({ zipcode, setZipcode, onSubmit }) => {
  /*   const updateWord = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  }; */
  const submit = () => {
    onSubmit();
  };

  return (
    <div>
      <Box w="70%" p="1rem">
        <Text fontSize="3xl" color={"#00283A"} fontWeight="semibold">
          This is an AI tool that helps teachers create quizes for students
          based upon local news stories from their area.
        </Text>
        <div>
          <label>Zipcode:</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="Enter zipcode"
            maxLength={5}
          />
          {/*           <div>
            <label>First Word:</label>
            <input
              type="text"
              value={words[0]}
              onChange={(e) => updateWord(0, e.target.value)}
              placeholder="Enter first word"
            />
          </div>

          <div>
            <label>Second Word:</label>
            <input
              type="text"
              value={words[1]}
              onChange={(e) => updateWord(1, e.target.value)}
              placeholder="Enter second word"
            />
          </div>

          <div>
            <label>Third Word:</label>
            <input
              type="text"
              value={words[2]}
              onChange={(e) => updateWord(2, e.target.value)}
              placeholder="Enter third word"
            />
          </div> */}
        </div>
        <Button
          bg="#164F66"
          mt="2rem"
          borderRadius="full"
          fontWeight="bold"
          fontSize={"md"}
          px="2rem"
          color={"white"}
          onClick={submit}
          transition="transform 0.2s ease-in-out, background-color 0.2s ease-in-out"
        >
          Start
        </Button>
      </Box>
    </div>
  );
};

export default Zipcode;

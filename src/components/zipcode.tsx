import { Box, Button, Text, Center, VStack, Input } from "@chakra-ui/react";
import { useState } from "react";
interface ChildProps {
  zipcode: string;
  setZipcode: (value: string) => void;
  words: string[];
  setWords: (words: string[]) => void;
  onSubmit: () => void;
}

const Zipcode: React.FC<ChildProps> = ({ zipcode, setZipcode, onSubmit }) => {
  const [buttonvisible, setbuttonvisible] = useState(true);
  const submit = () => {
    setbuttonvisible(false);
    console.log("buttonPressed");
    onSubmit();
  };

  return (
    <div>
      <Box p="1rem" w="100%">
        <Center h="">
          <VStack>
            <Center bg="" h="" w="80%" m="1rem">
              <Text
                fontSize="3xl"
                color={"#00283A"}
                fontWeight="semibold"
                align={"left"}
              >
                This is an AI tool that helps teachers create quizes for
                students based upon local news stories from their area.
              </Text>
            </Center>
            <Center bg="" h="" w="80%">
              <VStack>
                <Text fontSize={"2xl"} px="2rem" color={"white"}>
                  Please Enter Your Zipcode:
                </Text>
                <Input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  placeholder="Enter zipcode"
                  maxLength={5}
                  _placeholder={{ color: "white" }}
                />
              </VStack>
            </Center>
            {buttonvisible && (
              <Button
                bg="#164F66"
                mt="1rem"
                borderRadius="full"
                fontWeight="bold"
                fontSize={"md"}
                px="2rem"
                color={"white"}
                onClick={submit}
              >
                Start
              </Button>
            )}
          </VStack>
        </Center>

        <div></div>
      </Box>
    </div>
  );
};

export default Zipcode;

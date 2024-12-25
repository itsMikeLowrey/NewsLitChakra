import React, { useState } from "react";
import axios from "axios";
import { HStack } from "@chakra-ui/react";
import Zipcode from "./zipcode";
import SelectNewsSite from "./selectNewsSite";
const password = "test";
const API_URL = "/api/chat";

const Chat: React.FC = () => {
  const [zipcode, setZipcode] = useState("");
  const [words, setWords] = useState(["", "", ""]);
  const [step, setStep] = useState(0);
  const [newsURL] = useState("");

  const handleZipSubmit = () => {
    sendFirstMessage();
  };

  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a helpful assistant that helps me find local news articles.You always respond in JSON. Always.",
    },
  ]);

  const addStep = () => {
    let updatedStep;
    setStep((prevStep) => {
      updatedStep = prevStep + 1;
      return updatedStep;
    });
    return updatedStep;
  };

  const sendFirstMessage = async () => {
    try {
      const newMessage = {
        role: "user",
        content: `Give me 3 local news websites in the area of ${zipcode}. Please give me these 3 in a json array with no extra words, just a list json list of the local websites.`,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const updatedMessages = [...messages, newMessage];

      const response = await axios.post(API_URL, {
        messages: updatedMessages,
        password,
      });
      const assistantMessage = {
        role: "assistant",
        content: JSON.parse(
          response.data.responseData.choices[0].message.content,
        ),
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      addStep();
    } catch (error) {
      console.error(
        "Error calling ChatGPT API:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <HStack w="100%" justify="space-evenly" bg="white" minHeight={"75vh"}>
      <HStack
        w="60%"
        justify="space-evenly"
        bg="#A27DF8"
        mt="E"
        p="1rem"
        borderRadius="lg"
      >
        {step === 0 && (
          <Zipcode
            zipcode={zipcode}
            setZipcode={setZipcode}
            words={words}
            setWords={setWords}
            onSubmit={handleZipSubmit}
          />
        )}
        {step === 1 && <SelectNewsSite newsURL={newsURL} messages={messages} />}
      </HStack>
    </HStack>
  );
};

export default Chat;

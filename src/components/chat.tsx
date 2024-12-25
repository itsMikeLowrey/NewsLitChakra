import React, { useState } from "react";
import axios from "axios";
import { HStack } from "@chakra-ui/react";
import Zipcode from "./zipcode";
import SelectNewsSite from "./selectNewsSite";
const password = "test";
const API_URL = "/api/chat";
const API_URL2 = "/api/toMarkdown";

const Chat: React.FC = () => {
  const [zipcode, setZipcode] = useState("");
  const [words, setWords] = useState(["", "", ""]);
  const [step, setStep] = useState(0);
  const [newsURL] = useState("");

  const handleZipSubmit = () => {
    sendFirstMessage();
  };
  const handleSiteSelection = (arg: number) => {
    console.log("selecting news site", arg);
    sendSecondMessage(arg);
  };

  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a helpful assistant that helps me find local news articles.You always respond in JSON. Always.",
    },
  ]);

  const addStep = () => {
    setStep(step + 1);
  };

  const sendFirstMessage = async () => {
    try {
      const newMessage = {
        role: "user",
        content: `Give me 3 local news websites in the area of ${zipcode}. 
        Please give me these 3 in a json array with no extra words, just a list json list of the local websites with the newspaper name and link.
        The array of websites should be named localNewsWebsites. The localNewsWebsites should have newspaperName and link as the name of the keys.`,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const updatedMessages = [...messages, newMessage];
      const response2 = await axios.post(API_URL2, {
        urls: "http://www.cdispatch.com",
      });
      console.log(response2.data.data.article);
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
  const sendSecondMessage = async (choice) => {
    try {
      const newMessage = {
        role: "user",
        content: `
        Use a web browsing tool to search for the three most recent news articles published on the website https://cdispatch.com choicse ${choice}. Provide the article titles, publication dates, brief summaries, and direct URLs to the articles. Ensure the information is current and accurate, as it is needed for a school project.
        `,
        /*         The response json should be an array with 3 article titles as strings and a link to the article. Do not label the strings, just list the articles in the array. 
        I can tell which article it is by the inex of the array. */
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const updatedMessages = [...messages, newMessage];
      updatedMessages[2].content = JSON.stringify(updatedMessages[2].content);

      const response = await axios.post(API_URL, {
        messages: updatedMessages,
        password,
      });

      console.log(response.data.responseData.choices[0].message.content);
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
        {step === 1 && (
          <SelectNewsSite
            newsURL={newsURL}
            messages={messages}
            onSubmit={handleSiteSelection}
          />
        )}
      </HStack>
    </HStack>
  );
};

export default Chat;

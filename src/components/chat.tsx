import React, { useState } from "react";
import axios from "axios";
import { HStack } from "@chakra-ui/react";
import Zipcode from "./zipcode";
import SelectNewsSite from "./selectNewsSite";
import SelectArticle from "./selectArticle";
import DisplayQuestions from "./displayQuestions";
const password = "test";
const API_URL = "/api/chat";
const API_URL2 = "/api/toMarkdown";

const Chat: React.FC = () => {
  const [zipcode, setZipcode] = useState("");
  const [words, setWords] = useState(["", "", ""]);
  const [step, setStep] = useState(0);
  const [newsURL, setnewsURL] = useState("");
  const [_newsHomepage, setnewsHomepage] = useState("");
  const [_articlePage, setarticlePage] = useState("");
  const [chosenArticleLink, setchosenArticleLink] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a helpful assistant that helps me find local news articles.You always respond in JSON. Always.",
    },
  ]);
  const handleZipSubmit = () => {
    sendFirstMessage();
  };
  const handleSiteSelection = (arg: number) => {
    console.log("selecting news site", arg + 1);
    sendSecondMessage(arg);
  };

  const handleArticleSelection = (arg: number) => {
    console.log("selecting article", arg + 1);
    sendThirdMessage(arg);
  };

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
      const updatedMessages = [...messages, newMessage];
      const response = await axios.post(API_URL, {
        messages: updatedMessages,
        password,
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: JSON.parse(
            response.data.responseData.choices[0].message.content,
          ),
        },
      ]);
      addStep();
      console.log([
        {
          role: "assistant",
          content: JSON.parse(
            response.data.responseData.choices[0].message.content,
          ),
        },
      ]);
    } catch (error) {
      console.error(
        "Error calling ChatGPT API:",
        error.response?.data || error.message,
      );
    }
  };
  const sendSecondMessage = async (choice) => {
    console.log(messages);
    try {
      const selectedLink = [...messages][2].content["localNewsWebsites"][choice]
        .link;
      setnewsURL(selectedLink);
      const response2 = await axios.post(API_URL2, {
        urls: selectedLink,
      });
      const urlMarkdown = response2.data.data.article;
      setnewsHomepage(urlMarkdown);
      const newMessage = {
        role: "user",
        content: ` Please read this markdown of a news website: ${urlMarkdown}. Please give me 3 interesting and recent articles from the homepage.
       The response should follow this format exactly: articles: [ {title, link}, {title, link}]
        `,
      };

      const updatedMessages = [...messages, newMessage];
      const apiDeepCopy = JSON.parse(JSON.stringify(updatedMessages));
      apiDeepCopy[2].content = JSON.stringify(apiDeepCopy[2].content);

      const response = await axios.post(API_URL, {
        messages: apiDeepCopy,
        password,
      });
      const assistantMessage = {
        role: "assistant",
        content: JSON.parse(
          response.data.responseData.choices[0].message.content,
        ),
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
        assistantMessage,
      ]);
      addStep();
    } catch (error) {
      console.error(
        "Error calling ChatGPT API:",
        error.response?.data || error.message,
      );
    }
  };
  const sendThirdMessage = async (choice) => {
    console.log(messages);
    try {
      const chosenArticle = [...messages][4].content["articles"][choice];
      const response2 = await axios.post(API_URL2, {
        urls: chosenArticle.link,
      });
      setchosenArticleLink(chosenArticle.link);
      const urlMarkdown = response2.data.data.article;
      setarticlePage(urlMarkdown);
      const newMessage = {
        role: "user",
        content: ` Please read this markdown of a news article from the last message I sent you: ${urlMarkdown}. Please give me 
        2 truths and a lie about this article. Please make the lie believebale and use facts from the article in all 3 statements.
       The response should follow this format exactly: [ {statment, truth}, {statement, truth} }
        `,
      };

      const updatedMessages = [...messages, newMessage];
      const apiDeepCopy = JSON.parse(JSON.stringify(updatedMessages));
      apiDeepCopy[2].content = JSON.stringify(apiDeepCopy[2].content);
      apiDeepCopy[4].content = JSON.stringify(apiDeepCopy[4].content);

      const response = await axios.post(API_URL, {
        messages: apiDeepCopy,
        password,
      });
      const assistantMessage = {
        role: "assistant",
        content: JSON.parse(
          response.data.responseData.choices[0].message.content,
        ),
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
        assistantMessage,
      ]);
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
        {step === 2 && (
          <SelectArticle
            messages={messages}
            onSubmit={handleArticleSelection}
          />
        )}
        {step === 3 && (
          <DisplayQuestions
            messages={messages}
            articlePage={chosenArticleLink}
          />
        )}
      </HStack>
    </HStack>
  );
};

export default Chat;

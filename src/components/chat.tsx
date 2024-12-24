
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  Stack,
  Collapse,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

const Chat = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    const API_URL = "/api/chat";
    const password = "test"; 
  
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "What is the capital of France?" },
    ];


    try {
      const response = await axios.post(API_URL, {
        messages,
        password,
      });
  
      console.log("ChatGPT API Response:", response.data);
    } catch (error: any) {
      console.error("Error calling ChatGPT API:", error.response?.data || error.message);
    }
  };

  return (
    <Box bg="blue.200">
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <Box bg='black' h="5" >
        <p>{response}</p>
      </Box>
    </Box>
  );
};

export default Chat;



/* 
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  Stack,
  Collapse,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

const Chat = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Correct API endpoint
      const apiKey = ''; // Replace with your actual API key
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };

      const requestBody = {
        model: 'gpt-4-turbo', // Ensure you specify the model
        messages: [{ role: 'user', content: input }],
      };  
      console.log(input)

      const { data } = await axios.post(apiUrl, requestBody, { headers });
      console.log(data)
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error);
    }
  };

  return (
    <Box bg="blue.200">
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <Box bg='black' h="5" >
        <p>{response}</p>
      </Box>
    </Box>
  );
};

export default Chat;
 */
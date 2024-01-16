import React, { useEffect, useRef } from 'react'
import ChatBubbles from './ChatBubbles'
import axios from 'axios'
import Dashboard from '../Dashboard'
import ReXLogo from '../Pics/radical_x_logo.png'

const getOpenAIResponse = async (userInput) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      prompt: userInput,
      max_tokens: 150,
      model: "gpt-3.5-turbo"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
    });

    const aiReply = response.data.choices[0].text.trim();
    return aiReply;
  } catch (error) {
    if (error.response) {
      return 'An error occurred while communicating with the server.';
    }
  }
};

function Chat() {

  const chatContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const [messages, setMessages] = React.useState([]);

  const [chats, setChats] = React.useState([]);

  useEffect(() => {
    const title = localStorage.getItem('currChat');
    const storedMessages = JSON.parse(localStorage.getItem('chats'));
    const selectedChat = storedMessages.find(chat => chat.title === title.trim());
    console.log(selectedChat.messages);
    setMessages(selectedChat.messages);

    const storedChats = JSON.parse(localStorage.getItem('chats'));
    setChats(storedChats);
    scrollToBottom();
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
    console.log("messages" + localStorage.getItem('messages'));
    scrollToBottom();
  }, [messages]);

  const onSendMessage = async (e) => {

    const text = document.getElementById('msg').value;

    const newMessage = {
      message: text,
      type: 'user'
    }

    if (text !== '') {
      document.getElementById('msg').value = '';
      setMessages([...messages, newMessage]);
      const aiReply = await getOpenAIResponse(text);
      console.log(aiReply);
      const aiMessage = {
        message: aiReply,
        type: 'ai'
      }
      setMessages(prevMessages => [...prevMessages, aiMessage]);

      const updatedChats = chats.map(ch => {
        if (ch.title === localStorage.getItem('currChat')) {
          ch.messages = [...ch.messages, newMessage, aiMessage];
        }
        return ch;
      });
      localStorage.setItem('chats', JSON.stringify(updatedChats));
      setChats(updatedChats);
      scrollToBottom();
    }
  }

  const hanleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <Dashboard />
      <div className='flex flex-col flex-grow overflow-auto'>
        <div className='flex-1 p-10 overflow-auto' ref={chatContainerRef}>
          <img className="h-24 w-24 flex-none rounded-full bg-gray-50" src={ReXLogo} alt="" />
          {messages.map((message) => (<>
            <ChatBubbles message={message.message} type={message.type} />
          </>
          ))}
        </div>


        <div className="flex m-10">
          <textarea
            id="msg"
            name="msg"
            rows={1}
            onKeyDown={hanleEnter}
            className="block w-full resize-none rounded-full border-0 px-6 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={''}
          />
          <button className='rounded-full bg-violet-600 p-3 mx-4 hover:bg-violet-700 h-fit -rotate-45' onClick={onSendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>


          </button>

        </div>
      </div>
    </div>
  )
}

export default Chat

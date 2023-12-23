import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { parseCookies } from 'nookies';
import useTokenValidation from '../hooks/useTokenValidation';

const UserMessage = ({ text }) => (
  <div className="right flex justify-end">
    <div className="bg-[#EFF7FF] text-main-dark text-[17px] px-4 py-3 px-4 py-3" style={{ borderRadius: "20px 20px 0px 20px" }}>
      <ReactMarkdown className="prose">{text}</ReactMarkdown>
      {/* <div ref={messagesEndRef}></div> */}
    </div>
  </div>
);

const BotMessage = ({ text }) => (
  <div className="left flex">
    <div className="bg-[#E8EAEE] text-[#595959] text-[17px] px-4 py-3" style={{ borderRadius: "20px 20px 20px 0px" }}>
      <ReactMarkdown className="prose">{text}</ReactMarkdown>
    </div>
  </div>
);

const MsgLoadAnimation = () => (
  <div className="left flex">
  <div className="bg-[#E8EAEE] text-[#595959] text-[17px] w-fit px-4 py-3" style={{ borderRadius: '20px 20px 20px 0px' }}>
    <div className="flex items-center gap-2 text-sm">
    <div className="lds-dots relative flex items-center gap-2">
      <div className="bg-main w-2.5 h-2.5 rounded-full"></div>
      <div className="bg-main w-2.5 h-2.5 rounded-full"></div>
      <div className="bg-main w-2.5 h-2.5 rounded-full"></div> {/* Third dot */}
    </div>
   </div>
  </div>
</div>
);

const ChatBotUniprep = ({accessToken}) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [textareaHeight, setTextareaHeight] = useState(50);
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: 'Heya! How can I help you?' },
    // { type: 'user', text: 'I need to find a job in UK' },
    // { type: 'bot', text: 'Yeah sure i cen help you with that' },
  ]);

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatbotScrollRef = useRef(null);

  const isTokenValid = useTokenValidation(accessToken);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (!isTokenValid) {
      setAlertMessage('Your session is about to expire.');
    }
  }, [isTokenValid]);

  const handleDismissAlert = () => {
    setAlertMessage('');
  };

//   function accessTokenExpired(token) {
//     if (!token) return true;

//     try {
//       const payloadBase64 = token.split('.')[1];
//       const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
//       const payload = JSON.parse(decodedJson);
//       const exp = payload.exp;
//       const now = Math.floor(Date.now() / 1000);
  
//       return now >= exp;
//     } catch (e) {
//       console.error('Error decoding token:', e);
//       return true;
//     } 
// }

  useEffect(() => {
    const fetchChatHistory = async () => {
      // Fetch chat history from the API
      // let cookies = parseCookies();
      // let accessToken = cookies['access_token'];
      
      const response = await fetch(process.env.NEXT_PUBLIC_USER_CHATBOT_HISTORY_API_URL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (data && data.results) {
        setChatHistory(data.results.map(item => ({ type: item.author, text: item.message })));
      }
    };
  
    fetchChatHistory();
  }, []);

  const handleScroll = async (e) => {
    const topReached = e.target.scrollTop === 0;
    if (topReached) {
      // Calculate the next offset for pagination (based on current chatHistory length)
      const nextOffset = chatHistory.length;

      // Fetch more messages from the API
      // let cookies = parseCookies();
      // let accessToken = cookies['access_token'];
      const response = await fetch(`${process.env.NEXT_PUBLIC_USER_CHATBOT_HISTORY_API_URL}?offset=${nextOffset}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (data && data.results) {
        // Prepend new messages to the existing chat history
        setChatHistory([...data.results.map(item => ({ type: item.author, text: item.message })), ...chatHistory]);
      }
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendChatMessage = async (message) => {
    // let cookies = parseCookies();
    // let accessToken = cookies['access_token'];
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ message: message })
    };
    
    try {
      
      const response = await fetch(process.env.NEXT_PUBLIC_USER_CHATBOT_API_URL, requestOptions);
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error sending message:', error);
      return "Sorry, I couldn't understand that.";
    }
  };

  const sendMessage = async () => {
    const newMessage = inputValue;
    if (!inputValue.trim()) return;
    
    
    // setChatHistory([...chatHistory, { type: 'user', text: newMessage }]);
    // setChatHistory(currentHistory => [
    //   ...currentHistory, 
    //   { type: 'user', text: newMessage } 
    // ]);
    setChatHistory(currentHistory => [
      ...currentHistory, 
      { type: 'user', text: newMessage },
      { type: 'bot', text: 'Loading...', loading: true }  // Temporary loading message
    ]);
    setInputValue('');

    const botResponse = await sendChatMessage(newMessage);
    // setChatHistory(currentHistory => [
    //   ...currentHistory, 
    //   { type: 'bot', text: botResponse } 
    // ]);
    setChatHistory(currentHistory => [
      ...currentHistory.filter(msg => !msg.loading),
      { type: 'bot', text: botResponse }
    ]);
   

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (chatbotScrollRef.current) {
      chatbotScrollRef.current.scrollTop = chatbotScrollRef.current.scrollHeight;
    }
    
  };

  useEffect(() => {
    if (textareaRef.current) {
      const currentHeight = textareaRef.current.scrollHeight;
      setTextareaHeight(currentHeight > 200 ? 200 : currentHeight);
    }
    if (inputValue === '') {
      setTextareaHeight(50);
    }
  }, [inputValue]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (chatbotScrollRef.current) {
      chatbotScrollRef.current.scrollTo({
        top: chatbotScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistory]);

  return (
    <>
      <div className={`relative flex flex-col pt-[40px] ${textareaHeight > 50 ? "" : "md2:h-[calc(100%-60px)]"}`}>
      {alertMessage && (
        <div onClick={handleDismissAlert} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">{alertMessage}</p>
            <p className="mt-4 text-base font-bold text-blue-600">Please refresh page to continue using Unibot</p>
          </div>
        </div>
      )} 
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[22px] text-center font-semibold z-30">Unibot🤖</div>
        <div className="relative flex-1 z-30">
          <div ref={chatbotScrollRef} className="customScroll relative rounded-t-xl max-h-[350px] md2:max-h-[calc(100vh-100px)] overflow-y-auto pr-2"
          onScroll={handleScroll}>
            <div className="flex flex-col gap-12 justify-end relative bg-white h-full min-h-[350px] md2:min-h-[calc(100vh-100px)] rounded-xl pb-3">
             {/* new logic starts */} 
             {/* {chatHistory.map((message, index) => {
                return message.type === 'user' ? (
                  <UserMessage key={index} text={message.text} />
                ) : (
                  <BotMessage key={index} text={message.text}  />
                );
              })} */}
              {chatHistory.map((message, index) => (
                message.type === 'user' ? 
                <UserMessage key={index} text={message.text} /> : 
                message.loading ? 
                <MsgLoadAnimation key={index} /> : 
                <BotMessage key={index} text={message.text}  />
              ))}
              
              <div ref={messagesEndRef}></div>
             {/* new logic ends */} 
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-2">
        <div className="customShadow4  flex items-end gap-2 bg-white overflow-hidden rounded-lg min-h-[50px] max-h-[400px] pl-5">
          <textarea
            placeholder="Ask me anything"
            value={inputValue}
            onChange={handleInputChange}
            ref={textareaRef}
            className="customScroll border-none outline-none resize-none w-full h-full py-3 pr-2"
            style={{
              height: `${textareaHeight}px`,
              overflow: textareaHeight < 200 ? 'hidden' : 'scroll',
            }}
          ></textarea>
          <button className="-translate-y-4 pl-3 pr-5" onClick={sendMessage}>
            <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 16.0868V10.0868L8 8.08679L0 6.08679V0.086792L19 8.08679L0 16.0868Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBotUniprep;



// isLoading={message.loading}
// {botMessages.map((message, index) => (
//   <div className="left flex" key={`bot-${index}`}>
//     <div className="bg-[#E8EAEE] text-[#595959] text-[17px] px-4 py-3" style={{ borderRadius: "20px 20px 20px 0px" }}>
//       <ReactMarkdown className="prose">{message}</ReactMarkdown>
//       <div ref={messagesEndRef}></div>
//     </div>
//   </div>
// ))}


// {/* loading animation starts */}
// {isLoading && (
//  <div className="left flex">
//   <div className="bg-[#E8EAEE] text-[#595959] text-[17px] w-fit px-4 py-3" style={{ borderRadius: '20px 20px 20px 0px' }}>
//     <div className="flex items-center gap-2 text-sm">
//     <div className="lds-dots relative flex items-center gap-2">
//       <div className="bg-main w-2.5 h-2.5 rounded-full"></div>
//       <div className="bg-main w-2.5 h-2.5 rounded-full"></div>
//       <div className="bg-main w-2.5 h-2.5 rounded-full"></div> {/* Third dot */}
//     </div>
//     {/* <p>AI is thinking</p> */}
//   </div>
//   </div>
// </div>
// )}
// {/* loading animation ends */}


// {userMessages.map((message, index) => (
//   <div className="right flex justify-end" key={`user-${index}`}>
//     <div className="bg-[#EFF7FF] text-main-dark text-[17px] px-4 py-3 px-4 py-3" style={{ borderRadius: "20px 20px 0px 20px" }}>
//       <ReactMarkdown className="prose">{message}</ReactMarkdown>
//     </div>
//   </div>
// ))}
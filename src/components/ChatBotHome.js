import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { parseCookies } from 'nookies';

const ChatUserMessage = ({ text }) => (  
  <div className="right flex justify-end">
  <div className="bg-[#EFF7FF] text-main-dark text-[17px] px-4 py-3" style={{ borderRadius: '20px 20px 0px 20px' }}>
      <ReactMarkdown  className="prose">{text}</ReactMarkdown>
  </div>
</div>
);

const ChatBotMessage = ({ text }) => (
  <div className="left flex">
    <div className="bg-[#E8EAEE] text-[#595959] text-[17px] w-full px-4 py-3" style={{ borderRadius: '20px 20px 20px 0px' }}>
        <ReactMarkdown className="prose">{text}</ReactMarkdown>
      {/* <div ref={messagesEndRef}></div> */}
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

const ChatBotHome = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [textareaHeight, setTextareaHeight] = useState(50);
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: 'You are 8-weeks away from an interview. Shoot your job search queries?' },
    // { type: 'user', text: 'I need to find a job in UK' },
    // { type: 'bot', text: 'Yeah sure i cen help you with that' },
  ]);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatbotScrollRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendMessage = async () => {
    const newMessage = inputValue;
    if (!inputValue.trim()) return;

    setChatHistory(currentHistory => [
      ...currentHistory, 
      { type: 'user', text: newMessage },
      { type: 'bot', text: 'Loading...', loading: true }  // Temporary loading message
    ]);
    setInputValue('');
    // if (inputValue.trim() !== '') {
    //   const newMessage = inputValue.trim();
    //   setUserMessages([...userMessages, newMessage]);
    //   setInputValue('');
    // }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CHATBOT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'      
        },
        body: JSON.stringify({ message: newMessage })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Add chatbot's response to chat history
        // setChatHistory(currentHistory => [...currentHistory, { type: 'bot', text: data.response }]);
        setChatHistory(currentHistory => [
          ...currentHistory.filter(msg => !msg.loading),
          { type: 'bot', text: data.response }
        ]);
      } else {
        console.error('Error from server');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // useEffect(() => {
  //   if (textareaRef.current) {
  //     const currentHeight = textareaRef.current.scrollHeight;
  //     setTextareaHeight(currentHeight > 200 ? 200 : currentHeight);
  //   }
  //   if (inputValue === '') {
  //     setTextareaHeight(50);
  //   }
  // }, [inputValue]);

  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  //   if (chatbotScrollRef.current) {
  //     chatbotScrollRef.current.scrollTo({
  //       top: chatbotScrollRef.current.scrollHeight,
  //       behavior: 'smooth',
  //     });
  //   }
  // }, [chatHistory]);


  // const [placeholderIndex, setPlaceholderIndex] = useState(0);
  // const placeholders = [
  //   "Type your message here...",
  //   "Enter some text...",
  //   "Start typing...",
  // ];
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPlaceholderIndex((prevIndex) =>
  //       prevIndex === placeholders.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 2000); // Change this value to adjust the delay between placeholder changes

  //   return () => clearInterval(interval);
  // }, [placeholders]);

  return (
    <div className="bg-white rounded-xl order-2 md2:order-none md2:col-start-1 p-2">
      <div ref={chatbotScrollRef} className="customScroll relative bg-[#FBFBFB] h-[350px] rounded-xl overflow-y-auto px-3 py-5">
        <div className="flex flex-col justify-end min-h-[300px] gap-12">
        {/* <ChatBotMessage text="You are 8-weeks away from an interview. Shoot your job search queries?" /> */}
        {chatHistory.map((message, index) => (
          message.type === 'user' ? 
            <ChatUserMessage key={index} text={message.text} /> : 
            message.loading ? 
              <MsgLoadAnimation key={index} /> : 
              <ChatBotMessage key={index} text={message.text} />
        ))}
        {/* {botMessages.map((message, index) => (
                <div className="left flex">
                <div className="bg-[#E8EAEE] text-[#595959] text-[17px] w-full px-4 py-3" style={{ borderRadius: '20px 20px 20px 0px' }}>
                    <ReactMarkdown key={`bot-${index}`} className="prose">
                      {message}
                    </ReactMarkdown>
                  <div ref={messagesEndRef}></div>
                </div>
              </div>
              ))} */}

            


          {/* {userMessages.map((message, index) => (
                <div className="right flex justify-end">
                <div className="bg-[#EFF7FF] text-main-dark text-[17px] px-4 py-3" style={{ borderRadius: '20px 20px 0px 20px' }}>
                    <ReactMarkdown key={`user-${index}`}  className="prose">
                      {message}
                    </ReactMarkdown>
                </div>
              </div>
              ))} */}
         {/* <div ref={messagesEndRef}></div> */}
        </div>
      </div>
      <div className="flex items-end gap-2 bg-white border border-main-dark overflow-hidden rounded-lg min-h-[50px] max-h-[400px] pl-5">
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
  );
};

export default ChatBotHome;

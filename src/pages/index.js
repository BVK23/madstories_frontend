import Header from "../components/Header";
import TestimonialSlider from "../components/TestimonialSlider";
import Footer from "../components/Footer";
import Fade from "react-reveal/Fade";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { useState, useEffect } from 'react';

// const ChatbotMessage = ({ text }) => (
//   <div className="left flex">
//     <div className="bg-[#E8EAEE] text-[#595959] px-4 py-3" style={{ borderRadius: "20px 20px 20px 0px" }}>
//       {text}
//     </div>
//   </div>
// );
const LoadingAnimation = () => (
  <div
    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Loading...
    </span>
  </div>
);


const ChatbotMessage = ({ text, isLoading }) => (
  <div className="left flex">
    <div className="bg-[#E8EAEE] text-[#595959] px-4 py-3" style={{ borderRadius: "20px 20px 20px 0px" }}>
      {isLoading ? <LoadingAnimation /> : text}
    </div>
  </div>
);



const UserMessage = ({ text }) => (
  <div className="right flex justify-end">
    <div className="bg-[#EFF7FF] text-main-dark px-4 py-3" style={{ borderRadius: "20px 20px 0px 20px" }}>
      {text}
    </div>
  </div>
);


const Home = () => {

  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message === 'session-expired' || message === 'unauthorized') {
      setAlertMessage('Session expired.');
    }
    if (message === 'no-cookies') {
      setAlertMessage('Session doesnot exist');
    }
  }, []);

  const handleDismissAlert = () => {
    setAlertMessage('');
  }; 

  const text = "MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. MAD LIFE. MAD VIBES. ";
  
  const handleClickScroll = () => {
    const element = document.getElementById('section2');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // Inside your Home component
  
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message = userInput) => {
    if (!message.trim()) return;  // Ignore empty messages
  
    // Add user's message to chat history
    // setChatHistory([...chatHistory, { type: 'user', text: message }]);
    setChatHistory(currentHistory => [
      ...currentHistory, 
      { type: 'user', text: message },
      { type: 'bot', text: 'Loading...', loading: true }  // Temporary loading message
    ]);
    setUserInput('');
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CHATBOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'X-Chatbot-Secret': process.env.NEXT_SHARED_SECRET_TOKEN
        },
        body: JSON.stringify({ message: message })
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
    setIsLoading(false);
    // setUserInput('');  // Clear input field
  };
  


  return (
    <div className="overflow-hidden">
      {alertMessage && (
      <div onClick={handleDismissAlert} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold">{alertMessage}</p>
          <p className="mt-4 text-base font-bold text-blue-600">Sign in to continue</p>
        </div>
      </div>
    )}
     <div className="relative max-w-[1200px] mx-auto sm:min-h-[calc(100vh-150px)] md2:min-h-[calc(100vh-200px)]">
     <Header/>
     <img src="/images/circle1.svg" alt="circle bg" className="absolute -top-[200px] sm2:-top-[300px] -right-[200px] sm2:-right-[350px] sm:-right-[500px]" />

     <Fade bottom>
      <div className="mainCont relative text-main-dark mt-[140px] md:mt-[160px] z-30">
       <div className="text-[35px] sm3:text-[40px] sm:text-[55px] md:text-[65px] leading-[117%]">Want to land multiple<br className="hidden sm:flex"/> interviews in less than<br className="hidden sm:flex"/> <span className="text-main font-semibold inline-flex whitespace-nowrap">8 weeks</span></div>
       <Link href="/framework" className="mainButton flex items-center gap-3 border border-main-dark rounded-full transition hover:bg-main hover:text-white hover:border-main font-medium text-[19px] w-fit px-5 py-3 mt-10">Yes, I'm in! <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z" fill="currentColor"/></svg></Link>
      </div>
      </Fade>
      <div className="flex items-center justify-center mt-24 sm:mt-0 sm:absolute sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 z-30"><button onClick={handleClickScroll}><img src="/images/search-group.svg" alt="search icon" className="animate-bounce" /></button></div>
     </div>

     <div id="section2" className="flex items-center justify-center md2:min-h-screen pt-[100px] mt-[20px] md2:pt-0 md2:mt-0">
     <div  className="mainCont relative text-main-dark grid grid-cols-1 md2:grid-cols-2 xl:grid-cols-[1.2fr,1fr] gap-12 md2:gap-10 z-30">
     <Fade bottom>
      <div className="bg-[#FBFBFB] rounded-t-xl order-2 md2:order-none md2:col-start-1">
      <div className="customScroll relative bg-[#FBFBFB] h-full max-h-[350px] rounded-xl p-5 overflow-y-auto">
        <div className="flex flex-col justify-end min-h-[300px] gap-12">
        {/* <div className="left flex"><div className="bg-[#E8EAEE] text-[#595959] px-4 py-3" style={{borderRadius: "20px 20px 20px 0px"}}>Hi Tanya! How can I help you?</div></div>
        <div className="right flex justify-end"><div className="bg-[#EFF7FF] text-main-dark px-4 py-3" style={{borderRadius: "20px 20px 0px 20px"}}>I need to find a job in UK</div></div> */}
        <ChatbotMessage text="You are 8-weeks away from an interview. Shoot your job search queries?" />
        {/* {chatHistory.map((message, index) => (
          message.type === 'user' ? <UserMessage key={index} text={message.text} /> : <ChatbotMessage key={index} text={message.text} isLoading={isLoading} />
        ))} */}
        {chatHistory.map((message, index) => (
          message.type === 'user' ? 
            <UserMessage key={index} text={message.text} /> : 
            message.loading ? 
              <ChatbotMessage key={index} isLoading={true} /> : 
              <ChatbotMessage key={index} text={message.text} />
        ))}
        </div>

      </div>
      <div className="flex items-center gap-2 bg-white border border-main-dark overflow-hidden rounded-full h-[50px] pl-5">
      <input type="text" placeholder="Ask me anything" className="w-full border-none outline-none" 
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage() }/>
        <button onClick={() => handleSendMessage(userInput)} className="pl-3 pr-5"><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 16.0868V10.0868L8 8.08679L0 6.08679V0.086792L19 8.08679L0 16.0868Z" fill="black"/></svg></button>
      </div>
      </div>
      </Fade>

      <Fade bottom>
      <div className="order-1 md2:order-none md2:col-start-2">
        <div className="text-[30px] sm3:text-[40px] leading-[117%] mb-6">Setbacks in job search?<br className="hidden sm3:flex"/> <span className="text-main font-semibold">Unibot’s </span> here to help. </div>
        {/* <br className="hidden sm3:flex"/> */}
        <div className="typingAnimation text-black font-medium italic">
        “
        <TypeAnimation
        cursor={true}
      sequence={[
        "Securing a job abroad is a mad story.",
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "We had a mad story.",
        1000,
        "Now let's get you a mad story.",
        1000,
        "Welcome to Unimad",
        1000,
        "Mad Life Mad Vibes",
        1000
      ]}
      wrapper="span"
      speed={80} //50
      repeat={Infinity}
    />

    ”
        </div>
        <div className="flex items-center gap-x-5 gap-y-3 flex-wrap mt-8">
        <button className="mainButton flex px-4 py-3 font-[600] border border-main-dark rounded-lg transition hover:bg-main hover:text-white hover:border-main w-fit"
         onClick={() => handleSendMessage("Job search strategies for international students?")}>Job search strategies for international students?</button>
        <button className="mainButton flex px-4 py-3 font-[600] border border-main-dark rounded-lg transition hover:bg-main hover:text-white hover:border-main w-fit"
        onClick={() => handleSendMessage("How can I stand out in my job application?")}>How can I stand out in my job application?</button>
        <button className="mainButton flex px-4 py-3 font-[600] border border-main-dark rounded-lg transition hover:bg-main hover:text-white hover:border-main w-fit"
         onClick={() => handleSendMessage("How to crack a job as a complete fresher?")}>How to crack a job as a complete fresher?</button>
        </div>
      </div>
      </Fade>
     </div>
     </div>


     <div className="mainCont relative text-main-dark">
      <div className="relative text-center z-30 mt-[150px] md2:mt-[200px]">
      <Fade bottom>
       <div className="text-[42px] leading-[117%] mb-6"><span className="text-main font-semibold">Job market</span> isn't saturated — it's just <span className="text-main font-semibold">selective</span> </div>
       <div className="font-[500]">Unimad equips you with a job-search playbook designed to break barriers and align your story with the expectations of recruiters. Dive into our dynamic 8-week blueprint for landing interviews, and let Unibot be your personal advisor, for instant insights customised to your journey every step of the way.</div>
      </Fade>
      <Fade bottom>
       <img src="/images/steps.svg" alt="steps" className="mx-auto mt-10" />
      </Fade>
      <Fade bottom>
       <button className="button2 bg-main transition hover:bg-main-dark text-white flex items-center gap-3 text-center font-medium rounded-full w-fit px-6 py-4 mt-10 mx-auto">Start your Journey <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.675 9H0.5V7H12.675L7.075 1.4L8.5 0L16.5 8L8.5 16L7.075 14.6L12.675 9Z" fill="white"/></svg></button>
       </Fade>
      </div>
      <Fade bottom>
      
      <div className="relative text-center z-30 mt-[150px]">
       <div className="text-[38px] sm2:text-[42px] italic mb-4">Don’t chase jobs, attract them!</div>
       <div className="font-[500]"><Link href="/framework" className="text-main font-semibold">Our 8-week framework</Link> is designed to bring you into the spotlight. It's a journey to position  <br className="hidden md2:flex"/> your profile in a way that attracts the hiring managers to reach out to you.  </div>
      </div>
      </Fade>

      <img src="/images/circle2.svg" alt="circle bg" className="absolute -bottom-[500px] -left-[500px] md2:-left-[800px] xl:-left-[1000px]" />
     </div>


     <div className="banner relative w-full overflow-hidden text-white text-[40px] md:text-[50px] py-2 mt-[120px] md2:mt-[150px] z-30">
      <div className="text-wrapper inline-flex whitespace-nowrap leading-[0]">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>


    <div className="mainCont relative">
     <div className="relative text-main-dark mt-[150px] md2:mt-[200px] z-30">
     <Fade bottom>

      <div className="text-[38px] sm3:text-[42px] text-center mb-5"> Get your own <span className="text-main font-semibold">Mad Story!</span></div>
      </Fade>
      <Fade bottom>
      <img src="/images/plan.svg" alt="plan" className="mx-auto" />
      </Fade>
      <Fade bottom>
      <button className="button2 bg-main transition hover:bg-main-dark text-white flex items-center gap-3 text-center font-medium rounded-full w-fit px-6 py-4 mt-10 mx-auto">Get my Plan <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.675 9H0.5V7H12.675L7.075 1.4L8.5 0L16.5 8L8.5 16L7.075 14.6L12.675 9Z" fill="white"/></svg></button>
      </Fade>
     </div>

     <img src="/images/circle3.svg" alt="circle bg" className="absolute -bottom-[300px] -left-[500px]" />
     <img src="/images/circle4.svg" alt="circle bg" className="w-[1000px] absolute -bottom-[700px] -right-[500px]" />
    </div>


     <div className="relative overflow-hidden z-30">
     <Fade bottom>
     <TestimonialSlider/>
     </Fade>
     </div>

     <Fade bottom>
     <div className="mainCont">
      <div className="mainCont customBG relative text-white text-center rounded-3xl my-[150px] py-12 z-30">
       <div className="text-[34px] sm2:text-[45px] font-semibold mb-3">Step Into the Unimad Circle</div>
       <div className="max-w-[700px] mx-auto">Reinvent your job search. The goal is to form a community of MSc students who thrive to uplift each other. Questions, thoughts, breakthroughs, or want to celebrate a win? We’re all ears. Your voice is what shapes our community.</div>
       <button className="bg-white text-main-dark text-center font-medium rounded-full w-fit transition hover:-translate-y-0.5 px-6 py-3 mt-10 mx-auto">Contact Us</button>
      </div>
     </div>
     </Fade>

    <Footer/>
    </div>
  )
}

export default Home
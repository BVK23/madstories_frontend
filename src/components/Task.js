import { useState } from "react"

const Task = (props) => {
   const [task, setTask] = useState(false);
   const [copyText, setCopyText] = useState("Copy Text Maecenas pharetra convallis posuere morbi leo urna molestie. Nisl purus in mollis nunc. Feugiat nibh sed pulvinar proin gravida. Dolor magna eget est lorem ipsum dolor sit. Felis eget velit aliquet sagittis id consectetur purus ut faucibus. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Volutpat lacus laoreet non curabitur gravida arcu ac tortor. Ut venenatis tellus in metus vulputate. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Ridiculus mus mauris vitae ultricies leo. Diam vulputate ut pharetra sit amet aliquam.");
   const [copyTextState, setCopyTextState] = useState(false);

   const handleCopyClick = async () => {
    try {
        await navigator.clipboard.writeText(copyText);
        setCopyTextState(true);
        setTimeout(() => {
          setCopyTextState(false)
        }, 2000);
    } catch (err) {
        console.error(
            "Unable to copy to clipboard.",
            err
        );
        alert("Copy to clipboard failed.");
    }
};


  return (
    <>
     <div className={`relative bg-[#F8F8F8] border-[0.25px] border-[#8C8C8C] rounded-xl overflow-hidden transition-[height] p-5 pb-14 ${task === true ? "h-[670px]" : "h-[210px]"}`}>
          {
            props.locked === false ? 
            <button onClick={()=> {setTask(!task)}} className="absolute top-0 right-0 p-5 pb-2"><svg width="12" height="9" className={`transition ${task === true ? "-rotate-180" : "rotate-0"}`} viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8.37498L0 2.37498L1.4 0.974976L6 5.57498L10.6 0.974976L12 2.37498L6 8.37498Z" fill="#696969"/></svg></button>
            :
            <div className="absolute top-3 right-5"><svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 21C1.0875 21 0.734375 20.8531 0.440625 20.5594C0.146875 20.2656 0 19.9125 0 19.5V8.65C0 8.2375 0.146875 7.88438 0.440625 7.59063C0.734375 7.29688 1.0875 7.15 1.5 7.15H3.25V4.75C3.25 3.43583 3.71338 2.31563 4.64015 1.38938C5.56692 0.463125 6.68775 0 8.00265 0C9.31755 0 10.4375 0.463125 11.3625 1.38938C12.2875 2.31563 12.75 3.43583 12.75 4.75V7.15H14.5C14.9125 7.15 15.2656 7.29688 15.5594 7.59063C15.8531 7.88438 16 8.2375 16 8.65V19.5C16 19.9125 15.8531 20.2656 15.5594 20.5594C15.2656 20.8531 14.9125 21 14.5 21H1.5ZM8.0042 16C8.53473 16 8.9875 15.8164 9.3625 15.4492C9.7375 15.082 9.925 14.6406 9.925 14.125C9.925 13.625 9.7361 13.1708 9.3583 12.7625C8.9805 12.3542 8.52633 12.15 7.9958 12.15C7.46527 12.15 7.0125 12.3542 6.6375 12.7625C6.2625 13.1708 6.075 13.6292 6.075 14.1375C6.075 14.6458 6.2639 15.0833 6.6417 15.45C7.0195 15.8167 7.47367 16 8.0042 16ZM4.75 7.15H11.25V4.75C11.25 3.84722 10.9343 3.07986 10.3029 2.44792C9.67157 1.81597 8.9049 1.5 8.00295 1.5C7.10098 1.5 6.33333 1.81597 5.7 2.44792C5.06667 3.07986 4.75 3.84722 4.75 4.75V7.15Z" fill="#696969"/></svg></div>
          }
          <div className="flex items-center gap-2">
            <div className={`text-[17px] text-[#696969] font-semibold ${props.locked === true ? "blur-[4px]" : ""}`}>Task 1</div>
            <div className={`bg-opacity-20 text-[14px] font-semibold leading-none rounded-full px-2.5 py-1.5 ${props.state === "Completed" ? "bg-[#299935] text-[#299935]" : "bg-[#FFAC33] text-[#FFAC33]"} ${props.locked === true ? "blur-[4px]" : ""}`}>{props.state === "Completed" ? "Completed" : "In Progress"}</div>
          </div>
          <div className={`text-[20px] font-semibold mb-3 mt-5 ${props.locked === true ? "blur-[4px]" : ""}`}>{props.taskname}</div>
          <div className={`customScroll h-full max-h-[500px] -ml-2 pl-2 pr-2 ${task === true ? "overflow-y-auto" : "overflow-hidden"}`}>
            <div className={`text-[#8C8C8C] text-[15px] max-w-[800px] ${props.locked === true ? "blur-[4px]" : ""}`}>Task Overview : Mark out 2-3 roles that align with your goals and strengths. Select interrelated roles as similarity in roles will ensure a more focused and efficient job preparation process. <br/><br/> Act 1 — The Inner Desire<br/><br/> 
                All mad stories begin with understanding what you want and why you want it. Ask yourself which kind of role you want to pursue and also why do you want to pursue it? Reflect on your academic strengths, projects you've enjoyed, subjects that excite you, and tasks you excel at. Note down all your key skillsets, & competencies. It’s essential to understand what hypes you up, as this intrinsic motivation will be key to landing interviews. <br/><br/>
                Act 2 — Your Destined Roles <br/><br/> 
                Now uncover the roles that resonate with your core. Utilize resources like LinkedIn, Glassdoor, and Indeed to explore job descriptions. Pay attention to roles that frequently appear and those that match your skill set. Attend career fairs and networking events at your university to learn about different positions firsthand. <br/><br/>
                Act 3 — Your Professional Triad <br/><br/> 
                From a pyramid of possibilities, emerge your chosen 3 roles that align closely with your strengths and interests. These roles should represent a mix of your passions, skills, market demand, and personal growth potential. They should excite you and feel attainable with your current trajectory and with any necessary additional training or experience  <br/><br/> 
                </div>
            <div className={`${props.locked === true ? "blur-[4px]" : ""} mt-5`}>
              <div className="bg-main bg-opacity-10 rounded-lg border-[0.25px] border-[#8C8C8C] p-2">
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="text-[15px] font-[500]">Prompt</div>
                  <button onClick={handleCopyClick} className="bg-white rounded-lg flex items-center gap-2 text-[14px] px-4 py-2"><svg xmlns="http://www.w3.org/2000/svg" className={copyTextState === false ? "": "hidden"} width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" className={copyTextState === true ? "": "hidden"} width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16"><path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg> {copyTextState === false ? "Copy" : "Copied"}</button>
                </div>
                <div className="text-[#8C8C8C] text-[15px]">{copyText}</div>
              </div>

              {task === true ? <iframe className="mt-5" width="100%" height="380" src="https://www.youtube.com/embed/NHLnjWTEZps" title="Testing Gemini: Turning images into code" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"></iframe> : null}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-full flex items-center justify-end gap-3 flex-wrap whitespace-nowrap bg-[#F8F8F8] py-3 px-5">
            <button className={`flex items-center gap-2 text-[15px] font-semibold rounded-full px-5 py-1.5 ${props.state === "In Progress" ? "bg-[#D9D9D9] text-[#696969]" : "bg-[#E6E6E6] text-[#B0B0B0]"}`}><svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 14.6667C5.16667 14.6667 4.38611 14.5111 3.65833 14.2C2.93056 13.8889 2.29444 13.4611 1.75 12.9167C1.20556 12.3722 0.777778 11.7361 0.466667 11.0084C0.155556 10.2806 0 9.50002 0 8.66668H1C1 10.0556 1.48611 11.2361 2.45833 12.2084C3.43056 13.1806 4.61111 13.6667 6 13.6667C7.38889 13.6667 8.56944 13.1806 9.54167 12.2084C10.5139 11.2361 11 10.0556 11 8.66668C11 7.27779 10.5278 6.09724 9.58333 5.12502C8.63889 4.15279 7.47222 3.66668 6.08333 3.66668H5.7L6.91667 4.88335L6.23333 5.58335L3.78333 3.13335L6.23333 0.68335L6.91667 1.36668L5.61667 2.66668H6C6.83333 2.66668 7.61389 2.82224 8.34167 3.13335C9.06944 3.44446 9.70556 3.87224 10.25 4.41668C10.7944 4.96113 11.2222 5.59724 11.5333 6.32502C11.8444 7.05279 12 7.83335 12 8.66668C12 9.50002 11.8444 10.2806 11.5333 11.0084C11.2222 11.7361 10.7944 12.3722 10.25 12.9167C9.70556 13.4611 9.06944 13.8889 8.34167 14.2C7.61389 14.5111 6.83333 14.6667 6 14.6667Z" fill="currentColor"/></svg> Redo</button>
            <button className={`relative flex items-center gap-2 text-[15px] font-semibold rounded-full transition px-5 py-1.5 ${props.state === "In Progress" ? "button2 bg-main-dark hover:bg-main text-white" : "bg-[#E6E6E6] text-[#B0B0B0]"}`}><svg width="18" height="14" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16797 11.3334C3.21241 11.3334 2.39019 10.9889 1.7013 10.3C1.01241 9.61113 0.667969 8.78891 0.667969 7.83335C0.667969 6.96668 0.942969 6.20279 1.49297 5.54168C2.04297 4.88057 2.7513 4.48335 3.61797 4.35002C3.84019 3.27224 4.36241 2.39168 5.18464 1.70835C6.00686 1.02502 6.95686 0.68335 8.03464 0.68335C9.29019 0.68335 10.343 1.13613 11.193 2.04168C12.043 2.94724 12.468 4.03335 12.468 5.30002V5.70002C13.268 5.67779 13.9457 5.93613 14.5013 6.47502C15.0569 7.01391 15.3346 7.69446 15.3346 8.51668C15.3346 9.28335 15.0569 9.94446 14.5013 10.5C13.9457 11.0556 13.2846 11.3334 12.518 11.3334H8.5013C8.23464 11.3334 8.0013 11.2333 7.8013 11.0333C7.6013 10.8334 7.5013 10.6 7.5013 10.3334V6.03335L6.11797 7.41668L5.4013 6.70002L8.0013 4.10002L10.6013 6.70002L9.88464 7.41668L8.5013 6.03335V10.3334H12.518C13.018 10.3334 13.4457 10.1556 13.8013 9.80002C14.1569 9.44446 14.3346 9.01668 14.3346 8.51668C14.3346 8.01668 14.1569 7.58891 13.8013 7.23335C13.4457 6.87779 13.018 6.70002 12.518 6.70002H11.468V5.30002C11.468 4.31113 11.1319 3.46113 10.4596 2.75002C9.78741 2.03891 8.95686 1.68335 7.96797 1.68335C6.97908 1.68335 6.14575 2.03891 5.46797 2.75002C4.79019 3.46113 4.4513 4.31113 4.4513 5.30002H4.13464C3.44575 5.30002 2.86241 5.54168 2.38464 6.02502C1.90686 6.50835 1.66797 7.10557 1.66797 7.81668C1.66797 8.50557 1.91202 9.09724 2.40012 9.59168C2.88821 10.0861 3.47749 10.3334 4.16797 10.3334H6.5013V11.3334H4.16797Z" fill="currentColor"/></svg> <svg width="17" height="17" className={`absolute -top-1 -right-1 ${props.state === "In Progress" ? "hidden" : "flex"}`} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.5" cy="8.5" r="8.5" fill="#B0B0B0"/><rect x="3" y="9.3692" width="2.02865" height="5.07164" transform="rotate(-46.6027 3 9.3692)" fill="white"/><rect x="12.1797" y="4.08966" width="2.02865" height="10.1433" transform="rotate(43.3973 12.1797 4.08966)" fill="white"/></svg> {props.state === "Completed" ? "Uploaded" : "Upload"}</button>
          </div>
        </div>
    </>
  )
}

export default Task;
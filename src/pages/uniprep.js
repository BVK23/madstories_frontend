import { useState, useEffect } from "react"
import Link from "next/link";
import Task from "../components/Task";
import ChatBotUniprep from "../components/ChatBotUniprep";
import { destroyCookie, parseCookies, setCookie } from 'nookies';

// import withAuth from '../utils/withAuth';

export async function getServerSideProps(context) {
  let cookies = parseCookies(context);
  let accessToken = cookies['access_token'];

  if (!accessToken) {
    return { redirect: { destination: '/login?message=no-cookies', permanent: false } };
  }

  let response = await fetch(process.env.NEXT_USER_DATA_API_URL, {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  if (!response.ok && cookies['refresh_token']) {
    // Attempt to refresh the token
    const refreshResponse = await fetch(process.env.NEXT_REFRESH_TOKEN_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: cookies['refresh_token'] }),
    });
    
    if (refreshResponse.ok) {
      destroyCookie(context, 'access_token');
      const refreshData = await refreshResponse.json();
      accessToken = refreshData.access;
      if (process.env.NEXT_PUBLIC==='http://localhost:8000'){
        setCookie(context, 'access_token', accessToken,  { path: '/'});
        // setCookie(context, 'refresh_token', accessToken, { path: '/'});
      }else {
        setCookie(context, 'access_token', accessToken,  { path: '/', domain: '.madstories.xyz', secure: true, sameSite: 'None'});
        // setCookie(context, 'refresh_token', accessToken, { path: '/', domain: '.madstories.xyz', secure: true, sameSite: 'None'});
      }
      
      console.log(refreshData);
      // Retry fetching user data with new access token
      response = await fetch(process.env.NEXT_USER_DATA_API_URL, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
    } else {
      // Refresh token is invalid or expired
      destroyCookie(context, 'access_token');
      destroyCookie(context, 'refresh_token');
      return { redirect: { destination: '/login?message=session-expired', permanent: false } };
    }
  }

  if (!response.ok) {
    // Final error handling if still unauthorized
    destroyCookie(context, 'access_token');
    destroyCookie(context, 'refresh_token');
    return { redirect: { destination: '/login?message=unauthorized', permanent: false } };
  }

  const userData = await response.json();
  return { props: { userData , accessToken} };
}

const Uniprep = ({ userData, accessToken }) => {

    const [menu, setMenu] = useState(false);
    const [tab, setTab] = useState("My Plan Progress");
    const [moreSkills, setMoreSkills] = useState(false);
    const [week, setWeek] = useState("Week 4");

    
    const handleLogout = () => {
      // window.location.href = "https://app.madstories.xyz/logout";
      window.location.href = process.env.NEXT_PUBLIC_LOGOUT_URL;
    }; 

  return (
    <div className="bg-[#F5F5F5] text-main-dark overflow-hidden">
     <div className="w-full p-5">
      <div className="relative flex items-center justify-between z-30">
        <Link href="/" className="flex items-center gap-2"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.66667 13.3333L0 6.66667L6.66667 0L7.6 0.95L1.88333 6.66667L7.6 12.3833L6.66667 13.3333Z" fill="#1B3252"/></svg> Back</Link>
        <Link href="/" className="flex"><img src="/images/logo-beta.svg" alt="logo" className="w-[120px]" /></Link>
        <div className="relative">
         <button onClick={()=> {setMenu(!menu)}} className={`${menu === false ? "visible opacity-100" : "invisible opacity-0"}`}><svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 16V14H24V16H0ZM0 9V7H24V9H0ZM0 2V0H24V2H0Z" fill="#1B3252"/></svg></button>
         <div className={`customShadow3 bg-white rounded-lg absolute top-0 right-0 w-[170px] overflow-hidden z-30 ${menu === true ? "block" : "hidden"}`}>
            <div className="flex items-center justify-end p-3"><button onClick={()=> {setMenu(false)}} className="rounded-full transition hover:bg-[#1B3252] hover:bg-opacity-10"><svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8.22266" y="5.99999" width="24" height="2" transform="rotate(45 8.22266 5.99999)" fill="#1B3252"/><rect x="25.1953" y="7.41421" width="24" height="2" transform="rotate(135 25.1953 7.41421)" fill="#1B3252"/></svg></button></div>
            <div className="flex gap-1 flex-col mb-2 px-2">
             <Link href="/about" className="bg-white transition hover:bg-[#1B3252] hover:bg-opacity-10 text-[15px] flex w-full font-semibold rounded-full px-2.5 py-2">About</Link>
             <Link href="/mad-stories" className="bg-white transition hover:bg-[#1B3252] hover:bg-opacity-10 text-[15px] flex w-full font-semibold rounded-full px-2.5 py-2">MAD Stories</Link>
             {/* <Link href="#" onClick={handleLogout} className="bg-white transition hover:bg-[#1B3252] hover:bg-opacity-10 text-[15px] flex w-full font-semibold rounded-full px-2.5 py-2">Logout</Link> */}
             <button onClick={handleLogout} className="bg-white transition hover:bg-[#1B3252] hover:bg-opacity-10 text-[15px] flex w-full font-semibold rounded-full px-2.5 py-2">
                Logout
              </button>
             </div>
         </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md2:grid-cols-[300px,1fr] gap-5 min-h-[calc(100vh-132px)] mt-20 md2:mt-16">
      <div className="flex gap-5 flex-col">
        <div className="customShadow2 bg-white text-center rounded-2xl px-3 py-5">
          {/* {userData && 
          <img src={userData.profile_picture_url} 
            alt="person" 
            className="border-[5px] border-main-dark w-[100px] h-[100px] object-cover object-center rounded-full overflow-hidden mx-auto -mt-[65px]" 
          />} */}
                  <img 
          src={userData.profile_picture_url } 
          alt="person" 
          className="border-[5px] border-main-dark w-[100px] h-[100px] object-cover object-center rounded-full overflow-hidden mx-auto -mt-[65px]" 
        />
          {/* {userData && <div className="text-[20px] font-semibold mt-5">{userData.first_name}</div>} */}
          <div className="text-[20px] font-semibold mt-5">{userData.first_name}</div>
          <div className="text-[#8C8C8C] text-[15px] mt-1">{userData.course || '_course_'}</div>
          <div className="bg-[#F4F4F4] text-[14px] text-white font-semibold leading-none rounded-full mt-4 px-1.5 py-1">
            <div style={{ width: '35%' }} className="customBG rounded-full p-1">35%</div>
          </div>
          <div className="flex items-center justify-center gap-y-0.5 flex-col mb-3 mt-7">
            <div className="bg-[#F8F8F8] text-[#8C8C8C] border border-[#8C8C8C] text-[14px] rounded-full px-3 py-1">{userData.role || '_role_'}</div>
            {/* <div className="bg-[#F8F8F8] text-[#8C8C8C] border border-[#8C8C8C] text-[14px] rounded-full px-3 py-1">Business Development</div>
            <div className="bg-[#F8F8F8] text-[#8C8C8C] border border-[#8C8C8C] text-[14px] rounded-full px-3 py-1">Healthcare</div> */}
          </div>
        </div>

        <div className="customShadow2 bg-white rounded-2xl px-4 py-5 flex flex-col flex-1">
          <div className="flex gap-3 flex-col w-full">
          <button onClick={() => { setTab("My Plan Progress") }} className={`transition hover:bg-main hover:bg-opacity-20 flex items-center justify-between w-full font-semibold rounded-lg px-3.5 py-2.5 ${tab === "My Plan Progress" ? "bg-main bg-opacity-20" : "bg-white"}`}>My Plan Progress</button>
            <button onClick={() => { setTab("Unibot") }} className={`transition hover:bg-main hover:bg-opacity-20 flex items-center justify-between w-full font-semibold rounded-lg px-3.5 py-2.5 ${tab === "Unibot" ? "bg-main bg-opacity-20" : "bg-white"}`}>Unibot</button>
            <button onClick={() => { setTab("Activity") }} className={`transition hover:bg-main hover:bg-opacity-20 flex items-center justify-between w-full font-semibold rounded-lg px-3.5 py-2.5 ${tab === "Activity" ? "bg-main bg-opacity-20" : "bg-white"}`}>Activity</button>
            <button onClick={() => { setTab("Talk to us") }} className={`transition hover:bg-main hover:bg-opacity-20 flex items-center justify-between w-full font-semibold rounded-lg px-3.5 py-2.5 ${tab === "Talk to us" ? "bg-main bg-opacity-20" : "bg-white"}`}>Talk to us</button>
            <button className="bg-white text-[#8C8C8C] transition hover:bg-[#f0f0f0] flex items-center justify-between w-full font-semibold rounded-lg px-3.5 py-2.5">Resume Builder <svg width="16" height="20" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.125 15.75C0.815625 15.75 0.550781 15.6398 0.330469 15.4195C0.110156 15.1992 0 14.9344 0 14.625V6.4875C0 6.17813 0.110156 5.91328 0.330469 5.69297C0.550781 5.47266 0.815625 5.3625 1.125 5.3625H2.4375V3.5625C2.4375 2.57688 2.78504 1.73672 3.48011 1.04203C4.17519 0.347344 5.01581 0 6.00199 0C6.98816 0 7.82813 0.347344 8.52188 1.04203C9.21563 1.73672 9.5625 2.57688 9.5625 3.5625V5.3625H10.875C11.1844 5.3625 11.4492 5.47266 11.6695 5.69297C11.8898 5.91328 12 6.17813 12 6.4875V14.625C12 14.9344 11.8898 15.1992 11.6695 15.4195C11.4492 15.6398 11.1844 15.75 10.875 15.75H1.125ZM6.00315 12C6.40105 12 6.74063 11.8623 7.02188 11.5869C7.30313 11.3115 7.44375 10.9805 7.44375 10.5938C7.44375 10.2188 7.30207 9.87813 7.01872 9.57188C6.73537 9.26562 6.39475 9.1125 5.99685 9.1125C5.59895 9.1125 5.25938 9.26562 4.97813 9.57188C4.69688 9.87813 4.55625 10.2219 4.55625 10.6031C4.55625 10.9844 4.69793 11.3125 4.98128 11.5875C5.26463 11.8625 5.60525 12 6.00315 12ZM3.5625 5.3625H8.4375V3.5625C8.4375 2.88541 8.20074 2.30989 7.72721 1.83594C7.25367 1.36198 6.67868 1.125 6.00221 1.125C5.32574 1.125 4.75 1.36198 4.275 1.83594C3.8 2.30989 3.5625 2.88541 3.5625 3.5625V5.3625Z" fill="#808080"/></svg></button>
          </div>
        </div>
      </div>

      <div className="customShadow2 bg-white rounded-2xl px-5 py-3">
      {
        tab === "My Plan Progress" ?
        <>
         <div className="customScroll overflow-x-auto py-2">
        <div className="flex flex-nowrap items-center gap-5 whitespace-nowrap min-w-full max-w-[1px]">
         <button onClick={()=> {setWeek("Week 1")}} className={`relative text-[15px] transition hover:bg-main-dark hover:text-white border-2 border-main-dark font-semibold rounded-full px-5 py-1.5 ${week === "Week 1" ? "bg-main-dark text-white" : "bg-white text-main-dark"}`}>Week 1 <svg width="18" height="18" className="absolute -top-1 -right-1" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.5" cy="8.5" r="8.5" fill="#299935"/><rect x="3" y="9.36914" width="2.02865" height="5.07164" transform="rotate(-46.6027 3 9.36914)" fill="white"/><rect x="12.1797" y="4.0896" width="2.02865" height="10.1433" transform="rotate(43.3973 12.1797 4.0896)" fill="white"/></svg></button>
         <button onClick={()=> {setWeek("Week 2")}} className={`relative text-[15px] transition hover:bg-main-dark hover:text-white border-2 border-main-dark font-semibold rounded-full px-5 py-1.5 ${week === "Week 2" ? "bg-main-dark text-white" : "bg-white text-main-dark"}`}>Week 2 <svg width="18" height="18" className="absolute -top-1 -right-1" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.5" cy="8.5" r="8.5" fill="#299935"/><rect x="3" y="9.36914" width="2.02865" height="5.07164" transform="rotate(-46.6027 3 9.36914)" fill="white"/><rect x="12.1797" y="4.0896" width="2.02865" height="10.1433" transform="rotate(43.3973 12.1797 4.0896)" fill="white"/></svg></button>
         <button onClick={()=> {setWeek("Week 3")}} className={`relative text-[15px] transition hover:bg-main-dark hover:text-white border-2 border-main-dark font-semibold rounded-full px-5 py-1.5 ${week === "Week 3" ? "bg-main-dark text-white" : "bg-white text-main-dark"}`}>Week 3 <svg width="18" height="18" className="absolute -top-1 -right-1" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.5" cy="8.5" r="8.5" fill="#299935"/><rect x="3" y="9.36914" width="2.02865" height="5.07164" transform="rotate(-46.6027 3 9.36914)" fill="white"/><rect x="12.1797" y="4.0896" width="2.02865" height="10.1433" transform="rotate(43.3973 12.1797 4.0896)" fill="white"/></svg></button>
         <button onClick={()=> {setWeek("Week 4")}} className={`relative text-[15px] transition hover:bg-main-dark hover:text-white border-2 border-main-dark font-semibold rounded-full px-5 py-1.5 ${week === "Week 4" ? "bg-main-dark text-white" : "bg-white text-main-dark"}`}>Week 4</button>
         <button className="relative text-[15px] bg-[#E6E6E6] text-[#B0B0B0] border-2 border-[#E6E6E6] font-semibold rounded-full px-5 py-1.5">Week 5</button>
         <button className="relative text-[15px] bg-[#E6E6E6] text-[#B0B0B0] border-2 border-[#E6E6E6] font-semibold rounded-full px-5 py-1.5">Week 6</button>
         <button className="relative text-[15px] bg-[#E6E6E6] text-[#B0B0B0] border-2 border-[#E6E6E6] font-semibold rounded-full px-5 py-1.5">Week 7</button>
         <button className="relative text-[15px] bg-[#E6E6E6] text-[#B0B0B0] border-2 border-[#E6E6E6] font-semibold rounded-full px-5 py-1.5">Week 8</button>
        </div>
       </div>

       <div className="flex gap-5 flex-col mt-10">
        {
         week === "Week 1" ?
         <>
          <Task state="Completed" locked={false} taskname="Identifying roles"  />
          <Task state="In Progress" locked={false}/>
          <Task state="In Progress" locked={true}/>
          <Task state="In Progress" locked={true}/>
         </>
         :
         week === "Week 2" ?
         <>
          <Task state="Completed" locked={false} />
          <Task state="In Progress" locked={false}/>
         </>
         :
         week === "Week 3" ?
         <>
          <Task state="Completed" locked={false} />
         </>
         :
         week === "Week 4" ?
         <>
          <Task state="Completed" locked={false} />
          <Task state="In Progress" locked={false}/>
          <Task state="In Progress" locked={true}/>
         </>
         :
         null
        }
       </div>
        </>
        :
        tab === "Unibot" ?
        <>
         <ChatBotUniprep accessToken={accessToken}/>
        </>
        :
        tab === "Activity" ?
        <div className="flex flex-col h-full py-2">
         <div className="text-[20px] font-[600]">Your Activity</div>
         <div className="flex-1 flex items-center justify-center gap-5 flex-col w-full max-w-[850px] mx-auto pt-14">
          <div className="relative bg-[#F8F8F8] border border-[#8C8C8C] rounded-full w-full px-3 py-2"><img src="/images/chart1.svg" alt="chart" className="w-full" /> <svg width="27" height="24" className="absolute -top-7 left-[calc(50%-50px)] -translate-x-1/2" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.0981 22.5C14.9434 24.5 12.0566 24.5 10.9019 22.5L0.942629 5.25C-0.212072 3.25 1.2313 0.750001 3.54071 0.750001L23.4593 0.750003C25.7687 0.750003 27.2121 3.25 26.0574 5.25L16.0981 22.5Z" fill="#4C8AE1"/></svg></div>
          <div className="grid grid-cols-1 xl:grid-cols-[1fr,300px] gap-5 w-full">
           <div className="bg-[#F8F8F8] border border-[#8C8C8C] rounded-xl flex items-center sm:justify-center xl:justify-between gap-10 xl:gap-5 flex-col sm:flex-row h-full p-5">
            <div className="flex items-center sm:items-start justify-between gap-5 sm:gap-0 flex-col h-full">
              <div><div className="text-[#1B3252] text-center sm:text-left">Tasks Completed:</div><div className="text-main text-[35px] font-[600] text-center mx-auto mt-2">9</div></div>
              <div><div className="text-[#1B3252] text-center sm:text-left">Tasks Pending:</div><div className="text-[#8C8C8C] text-[35px] font-[600] text-center mx-auto mt-2">4</div>
            </div></div>
            <div>
              <img src="/images/chart2.svg" alt="chart" className="sm:-mr-8 -my-5" />
            </div>
           </div>
           <div className="bg-[#F8F8F8] border border-[#8C8C8C] rounded-xl flex items-center justify-center gap-5 flex-col p-5">
            <div className="text-main-dark text-[80px] font-[600] border border-[#8C8C8C] rounded-xl leading-none px-5 py-5">4</div>
            <div className="text-main-dark text-[20px] text-center">More Weeks to Go!</div>
           </div>
          </div>
         </div>
        </div>
        :
        null
      }

      </div>

     </div>
     </div>
    </div>
  )
}

// export default withAuth(Uniprep);
export default Uniprep;

// const Uniprep = ({ accessToken }) => {
//   return (
//     <div>
//       <h1>Uniprep Page</h1>
//       {accessToken ? <p>Access Token is available</p> : <p>No access token</p>}
//     </div>
//   );
// };

// export default withAuth(Uniprep);
// const Uniprep = () => {
//   return (
//     <div>
//       <h1>Uniprep Test Page</h1>
//       <p>This is a test.</p>
//     </div>
//   );
// };

// export default Uniprep; // Temporarily remove withAuth for testing

// const Uniprep = ({ accessToken }) => {
//   return (
//     <div>
//       <h1>Uniprep Page</h1>
//       <p>{accessToken ? 'Access Token is available' : 'No access token'}</p>
//     </div>
//   );
// };

// export default withAuth(Uniprep);


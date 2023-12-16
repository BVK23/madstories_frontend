import { useState, useEffect } from "react";
import Link from "next/link";
import { parseCookies } from 'nookies';

const Header = () => {
  const [menu, setmenu] = useState("translate-x-full");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for access token in cookies
    const cookies = parseCookies();
    setIsLoggedIn(!!cookies['access_token']);
  }, []);

  
  const handleLinkedInAuth = (e) => {
    e.preventDefault(); // This prevents the default link action
    window.location.href =  process.env.NEXT_PUBLIC_LINKEDIN_AUTH_URL;
  };

  return (
    <>
     <div className="fixed top-0 pt-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] z-[40]">
     <div className="headerCont max-w-[1250px] bg-white rounded-full mx-auto">
       <div className="mainCont flex items-center justify-between gap-5 py-3 md2:py-0">
        <Link href="/" className="flex w-fit"><img src="/images/logo.svg" alt="logo" className="w-[120px] md2:w-[150px]" /></Link>
        <div className="hidden md2:flex items-center justify-center gap-5 lg:gap-8 h-full top-auto right-auto text-main-dark bg-transparent translate-y-1">
          <Link href="/about" className="flex items-center justify-center font-[600] w-fit h-[65px] -translate-y-1 px-2 transition hover:bg-main-dark hover:text-white">About</Link>
          <Link href="/mad-stories" className="flex items-center justify-center font-[600] w-fit h-[65px] -translate-y-1 px-2 transition hover:bg-main-dark hover:text-white">MAD Stories</Link>
          <Link href="/framework" className="flex items-center justify-center font-[600] w-fit h-[65px] -translate-y-1 px-2 transition hover:bg-main-dark hover:text-white">Framework</Link>
          {/* <Link href="/uniprep" className="flex items-center justify-center font-[600] w-fit h-[65px] -translate-y-1 px-2 transition hover:bg-main-dark hover:text-white">Uniprep</Link> */}
        </div>
        {isLoggedIn ? (
          <Link href="/uniprep" className="hidden md2:flex button2 px-5 py-2.5 rounded-full bg-main transition hover:bg-main-dark text-white w-fit">
            Dashboard
          </Link>
        ) : (<Link href="#" onClick={handleLinkedInAuth} className="hidden md2:flex button2 px-5 py-2.5 rounded-full bg-main transition hover:bg-main-dark text-white w-fit">
          Sign in with LinkedIn
        </Link>
        )} 
        <button onClick={()=> {setmenu("translate-x-0")}} className="flex md2:hidden"><svg width="25" height="17" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.14563H21" stroke="#0A256B" strokeWidth="2" strokeLinecap="round"/><path d="M1 6.70117H21" stroke="#0A256B" strokeWidth="2" strokeLinecap="round"/><path d="M1 12.2567H21" stroke="#0A256B" strokeWidth="2" strokeLinecap="round"/></svg></button>
       </div>

     </div>
     </div>
     <div onClick={()=> {setmenu("translate-x-full")}} className={`flex md2:hidden fixed top-0 left-0 bg-main-dark bg-opacity-50 transition min-h-screen w-full z-[50] ${menu === "translate-x-full" ? "opacity-0 invisible" : "opacity-100 visible"}`}></div>
     
     <div className={`${menu} transition flex md2:hidden gap-7 flex-col fixed top-0 right-0 text-main-dark bg-white h-screen w-[250px] overflow-y-auto z-[70] px-5 py-3`}>
          <div className="flex items-center justify-end">
           <button onClick={()=> {setmenu("translate-x-full")}} className="flex w-fit"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>
          </div>
          <Link href="about" className="font-[600] w-fit pb-2">About</Link>
          <Link href="/mad-stories" className="font-[600] w-fit pb-2">MAD Stories</Link>
          <Link href="/framework" className="font-[600] w-fit pb-2">Framework</Link>
          {/* <Link href="/uniprep" className="font-[600] w-fit pb-2">Uniprep</Link> */}
          {isLoggedIn ? (
          <Link href="/uniprep" className="flex button2 px-5 py-2.5 rounded-full bg-main transition hover:bg-main-dark text-white w-fit">
            Dashboard
          </Link>
        ) : (<Link href="#" onClick={handleLinkedInAuth} className="flex button2 px-5 py-2.5 rounded-full bg-main transition hover:bg-main-dark text-white w-fit">
          Sign in with LinkedIn
        </Link>
        )} 
        </div>

    </>
  )
}

export default Header;
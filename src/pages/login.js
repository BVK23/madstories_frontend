import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const Login = () => {

  const handleLinkedInAuth = () => {
    // e.preventDefault(); // This prevents the default link action
    window.location.href =  process.env.NEXT_PUBLIC_LINKEDIN_AUTH_URL;
  };
  return (
    <>
     <div className="bg-white overflow-hidden">
      <div className="w-full p-5">
      <div className="relative flex items-center justify-between z-30">
        {/* <Link href="/" className="flex items-center gap-2"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.66667 13.3333L0 6.66667L6.66667 0L7.6 0.95L1.88333 6.66667L7.6 12.3833L6.66667 13.3333Z" fill="#1B3252"/></svg> Back</Link> */}
        <Link href="/" className="flex w-fit"><img src="/images/logo.svg" alt="logo" className="w-[150px]" /></Link>
        </div>  
       {/* <Header/> */}

        <div className="mainCont relative mb-[100px] md2:mb-[150px] mt-[150px] md2:mt-[200px]">
         <div className="relative text-main-dark min-h-[calc(100vh-608px)] z-30">
            <div className="relative">
            <div className="text-[30px] sm2:text-[35px] text-center mb-16">Login into your <span className="font-semibold">Mad Journey</span></div>
             <button onClick={handleLinkedInAuth} className="flex items-center gap-2 rounded-full border leading-none bg-main transition hover:bg-main-dark text-white w-fit mx-auto px-4 py-2"><img src="/images/linkedin.svg" alt="linkedin" className="w-[30px]" /> <div className="mt-1">Sign in with LinkedIn</div></button>
             {/* <Link href="#"  className="hidden md2:flex button2 px-5 py-2.5 rounded-full bg-main transition hover:bg-main-dark text-white w-fit">
          Sign in with LinkedIn
        </Link>              */}
            </div>
         </div>
        </div>

       {/* <Footer/> */}
       </div> 
     </div>  
    </>
  )
}

export default Login

// onClick={handleLinkedInAuth}
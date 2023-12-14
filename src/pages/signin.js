import Header from "../components/Header";
import Footer from "../components/Footer";

const Signin = () => {
  return (
    <>
     <div className="bg-white overflow-hidden">
       <Header/>

        <div className="mainCont relative mb-[100px] md2:mb-[150px] mt-[150px] md2:mt-[200px]">
         <div className="relative text-main-dark min-h-[calc(100vh-608px)] z-30">
            <div className="relative">
             <div className="customShadow4 relative bg-white rounded-3xl px-5 lg:px-10 py-10 z-30">
                <div className="text-[30px] sm2:text-[35px] text-center mb-16 md2:mb-24">Ready to embark on this <span className="font-semibold">Unimad Adventure?</span></div>
               <div className="flex items-center md2:justify-between gap-12 md2:gap-5 flex-col md2:flex-row">
               <div className="flex items-center gap-7 flex-col md2:flex-row md2:-mt-[80px]">
                <img src="/images/person.png" alt="person" className="border-[7px] border-main-dark w-[200px] h-[200px] object-cover object-center rounded-full" />
                <div className="flex gap-1">
                <svg width="42" height="35" viewBox="0 0 42 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.1242 0H2.63842C1.18274 0 0 1.12969 0 2.52375V32.4746C0 33.8683 1.18274 35 2.63842 35H33.1242C34.5827 35 35.7702 33.8683 35.7702 32.4746V2.52375C35.7702 1.12969 34.5827 0 33.1242 0Z" fill="#007BB6"/><path d="M7.95677 4.81836C9.65415 4.81836 11.0319 6.16707 11.0319 7.82852C11.0319 9.49065 9.65415 10.8394 7.95677 10.8394C6.25287 10.8394 4.87891 9.49065 4.87891 7.82852C4.87891 6.16707 6.25287 4.81836 7.95677 4.81836ZM5.30016 13.1213H10.611V29.8238H5.30016V13.1213Z" fill="white"/><path d="M13.9392 13.1213H19.0248V15.4045H19.0976C19.8052 14.0914 21.5362 12.7068 24.1173 12.7068C29.4892 12.7068 30.4818 16.1651 30.4818 20.6633V29.8238H25.1771V21.7013C25.1771 19.7644 25.1428 17.2726 22.4203 17.2726C19.6596 17.2726 19.2384 19.3838 19.2384 21.5626V29.8238H13.9392V13.1213Z" fill="white"/></svg>
                <div className="text-[23px] font-medium">Tanya Fernandez</div>
                </div>
               </div>
               <div className="flex flex-col gap-4 w-full md2:w-auto">
                <input type="text" placeholder="Name" className="customShadow5 w-full md2:w-[300px] lg:w-[400px] h-[40px] rounded-lg text-black border border-main-dark outline-none placeholder:text-[#1B3252] placeholder:text-opacity-50 focus:outline-2 focus:outline-main-dark px-3" />
                <input type="text" placeholder="University Name" className="customShadow5 w-full md2:w-[300px] lg:w-[400px] h-[40px] rounded-lg text-black border border-main-dark outline-none placeholder:text-[#1B3252] placeholder:text-opacity-50 focus:outline-2 focus:outline-main-dark px-3" />
                <input type="text" placeholder="Phone Number" className="customShadow5 w-full md2:w-[300px] lg:w-[400px] h-[40px] rounded-lg text-black border border-main-dark outline-none placeholder:text-[#1B3252] placeholder:text-opacity-50 focus:outline-2 focus:outline-main-dark px-3" />
                <button className="customBG flex items-center justify-center w-[55px] h-[55px] rounded-full mx-auto mt-5"><svg width="22" height="18" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.125 0.375L13.6056 1.85506L21.6594 9.9375H0.25V12.0625H21.6594L13.6056 20.1088L15.125 21.625L25.75 11L15.125 0.375Z" fill="white"/></svg></button>
               </div>
               </div>
             </div>
            </div>
         </div>
        </div>

       <Footer/>
     </div>  
    </>
  )
}

export default Signin
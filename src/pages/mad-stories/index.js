import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MADStories = () => {
  return (
    <>
     <div className="bg-[#F5F5F5] overflow-hidden">
       <Header/>

        <div className="mainCont relative mb-[150px] mt-[150px] md2:mt-[200px]">
         <div className="relative text-main-dark min-h-[calc(100vh-608px)] z-30">
          <div className="relative text-[38px] sm3:text-[42px] text-center mb-6 z-30"><span className="text-main font-semibold">MAD </span> Stories</div>
          <div className="relative text-center mb-16 z-30">Step into the world of Mad Stories, a blog that catalogues unique journeys of students like you, who've successfully cracked multiple interviews using the Unimad's 8-week framework. These stories aren't just for reading — they're here to reassure you that it’s not impossible to crack a full-time offer in the UK.</div>
            <div className="relative">
             <div className="relative bg-[#FAFAFA] rounded-3xl grid-cols-1 sm2:grid-cols-2 grid md2:grid-cols-3 gap-x-10 gap-y-16 md2:min-h-[800px] px-5 sm2:px-10 py-10 z-30">
              <div>
              <Link href="/mad-stories/blog">
                 <div className="w-full h-[200px] rounded-xl overflow-hidden mb-5"><img src="/images/shakiimage2.png" alt="blog cover" className="w-full h-full object-cover object-center" /></div>
                 <div className="text-[20px] font-semibold">Mad Story 1</div>
                 <div className="flex items-center mt-3">
                   <div className="bg-[#D9D9D9] w-5 h-5 rounded-full mr-2.5"></div>
                   <div className="font-semibold">Shaki</div>
                   <div className="bg-[#D9D9D9] w-1 h-1 rounded-full mx-2.5"></div>
                   {/* <div className="font-semibold">Date</div> */}
                 </div>
               </Link>
              </div>

              {/* <div>
              <Link href="/mad-stories/blog">
                 <div className="w-full h-[200px] rounded-xl overflow-hidden mb-5"><img src="/images/cover.png" alt="blog cover" className="w-full h-full object-cover object-center" /></div>
                 <div className="text-[20px] font-semibold">Blog Title</div>
                 <div className="flex items-center mt-3">
                   <div className="bg-[#D9D9D9] w-5 h-5 rounded-full mr-2.5"></div>
                   <div className="font-semibold">Author</div>
                   <div className="bg-[#D9D9D9] w-1 h-1 rounded-full mx-2.5"></div>
                   <div className="font-semibold">Date</div>
                 </div>
               </Link>
              </div> */}

              {/* <div>
              <Link href="/mad-stories/blog">
                 <div className="w-full h-[200px] rounded-xl overflow-hidden mb-5"><img src="/images/cover.png" alt="blog cover" className="w-full h-full object-cover object-center" /></div>
                 <div className="text-[20px] font-semibold">Blog Title</div>
                 <div className="flex items-center mt-3">
                   <div className="bg-[#D9D9D9] w-5 h-5 rounded-full mr-2.5"></div>
                   <div className="font-semibold">Author</div>
                   <div className="bg-[#D9D9D9] w-1 h-1 rounded-full mx-2.5"></div>
                   <div className="font-semibold">Date</div>
                 </div>
               </Link>
              </div> */}

             </div>
             <img src="/images/circle5.svg" alt="circle bg" className="absolute -top-[150px] -left-[500px]" />
             <img src="/images/circle7.svg" alt="circle bg" className="absolute -bottom-[600px] -left-[300px]" />
            </div>
         </div>
        </div>

       <Footer/>
     </div>  
    </>
  )
}

export default MADStories
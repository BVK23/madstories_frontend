import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Blog = () => {
  return (
    <>
     <div className="bg-[#F5F5F5] overflow-hidden">
       <Header/>

        <div className="mainCont relative mt-[150px] md2:mt-[200px]">
         <div className="relative text-main-dark min-h-[calc(100vh-452px)] z-30">
            <div className="relative">
             <div className="relative bg-[#FAFAFA] rounded-t-3xl min-h-[calc(100vh-453px)] overflow-hidden pb-20 z-30">
              <img src="/images/shakiimage2.png" alt="blog cover" className="w-full h-[400px] object-cover object-bottom" />
              <div className="px-10 py-7">
               <div className="text-[30px] sm:text-[35px] font-semibold">Mad Story 1</div>
               <div className="flex items-center mt-3">
                   <div className="font-semibold">Shaki</div>
                   <div className="bg-[#D9D9D9] w-1 h-1 rounded-full mx-2.5"></div>
                   {/* <div className="font-semibold">Date</div> */}
               </div>

               <div className="mt-10">
                {/* <div className="mb-16"></div> */}
                Landing a full-time job in the UK is a pure persevearnace play. It’s okay if you are rejected a 1000 times, but you need to get selected only once. <br/> <br/>
                Sharath Leelakrishnan here, obviously that’s a long Indian name and didn’t really go well in the UK. So it became Shaki. <br/> <br/>
                On September 9th 2021, I entered the UK with 2 suitcases, 400 pounds and a lot of dreams and hopes but with a very specific mission of making it out.  <br/><br/>
                Unlike most of you I didn’t come here to study, I came here to crack a job here that would help earn in pounds. Didn’t really care which domain I am cracking in.  <br/><br/>
                I tried multiple domains like Software Engineering, Cybersecurity, also tried Quant Financing for a bit just to later realize that none of them would work for me.  <br/> <br/>
                6 months passed in this mess and this is the time I started freaking out. So I decided I’ll fix one role and channel all my time and focus mastering a specific role.  <br/><br/>
                That was exactly the time when Cryptocurrencies, NFTs were on the rise. I started reading more on it.  <br/><br/>
                I felt it was super interesting and from that point on I lived my life with one motive which is to crack a full-time job in web3.  <br/><br/>
                I was able to understand the tech and a lot of people were struggling to uncover the same. <br/><br/>
                So I decided to start a campaign called, #Learnweb3in60days breaking down crucial web3 concepts each day.  <br/><br/>
                After 1 week of posting content, I got a 1-month freelance contract for 1000 pounds.  <br/><br/>
                This is the time when it became addiction. I started posting more content, connecting with more people and tried to build an authentic profile. <br/><br/>
                In 60 days, I started receiving interviews. I obviously didn’t crack it in the 1st interview. <br/><br/>
                It took sometime, eventually I was able to crack a remote-full time job in the UK. <br/><br/>
                Trust me, that was one of the biggest wins in my life so far. I got that offer exactly on the last day of my Uni and it gave me a mad story to tell. <br/><br/>
                I then decided why not help my close friends have a mad story as well. I was quite successful at that. <br/><br/>
                We came together and decided why not help every student pursuing masters abroad have their own Mad Story. <br/><br/>
                Unimad was born. You having a mad story is our mad story. I am not saying it’s easy, all I am saying is it’s fucking worth it. <br/><br/>
                We are on a mission to create a million mad stories.  <br/><br/>
                You getting a job here is GREATNESS. You helping 1000s of other students get a job, that’s MADNESS.  <br/><br/>
                In our opinion MADNESS { '>>>>' } GREATNESS <br/><br/>
                Mad Life Mad Vibes 🤟 <br/><br/>
                <br/><br/>
               </div>
               

              </div>

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

export default Blog
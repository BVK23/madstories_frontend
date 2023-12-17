import Header from "../components/Header";
import Footer from "../components/Footer";


import { parseCookies } from 'nookies';

export const getServerSideProps = (context) => {
  const cookies = parseCookies(context);
  const isLoggedIn = !!cookies['access_token'];

  return { props: { isLoggedIn } };
};

const About = ({ isLoggedIn }) => {
  return (
    <>
     <div className="bg-[#F5F5F5] overflow-hidden">
      <Header isLoggedIn={isLoggedIn} />

        <div className="mainCont relative mb-[150px] mt-[150px] md2:mt-[200px]">
         <div className="relative text-main-dark min-h-[calc(100vh-608px)] z-30">
          <div className="relative text-[38px] sm3:text-[42px] text-center mb-20 z-30">The <span className="text-main font-semibold">Unimad</span> Genesis</div>
            <div className="relative">
             <div className="relative bg-[#FAFAFA] rounded-3xl text-center px-5 py-10 z-30">
              <div className="mb-16">Unimad is the story of 3 students who went through the dark side of the moon to get a full-time job in the UK. Their journey included an ungodly amount of rejections, recruiters ghosting them, rejections because of visa status, and 1111 other reasons. This also revealed a truth that the barrier to employment was not talent, but the right information. This gave rise to Unimad — a platform offering every student the insights needed to dominate their job search, at no cost.</div>
              <div className="text-[30px] sm3:text-[35px] md:text-[40px] mb-16">Empowering the understimated 💪</div>
              <div className="mb-16">At Unimad, our mission is to elevate our community’s profile and story in a way that converts interviews and eventually leads to a job. Our motto is that you should never chase jobs, you should attract them. The best way to do so is to narrate a story that sells. This is exactly the purpose of our 8-week framework and every element of it is crafted with the singular goal of helping you stand out as not just a candidate, but the candidate.</div>
             </div>
             <img src="/images/circle5.svg" alt="circle bg" className="absolute -top-[150px] -left-[500px]" />
             <img src="/images/circle6.svg" alt="circle bg" className="absolute -bottom-[300px] -right-[200px]" />
            </div>
         </div>
        </div>

       <Footer/>
     </div>  
    </>
  )
}

export default About
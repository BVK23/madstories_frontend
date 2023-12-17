import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

import { parseCookies } from 'nookies';

export const getServerSideProps = (context) => {
  const cookies = parseCookies(context);
  const isLoggedIn = !!cookies['access_token'];

  return { props: { isLoggedIn } };
};

const Framework = ({ isLoggedIn }) => {
  useEffect(() => {
    const handleScroll = () => {
      const weeks = document.querySelectorAll('.week');
      weeks.forEach((week) => {
        const rect = week.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const opacity = rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2 ? 1 : 0;
        week.style.opacity = opacity;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check for visibility on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkedInAuth = (e) => {
    e.preventDefault(); // This prevents the default link action
    window.location.href =  process.env.NEXT_PUBLIC_LINKEDIN_AUTH_URL;
  };

  return (
    <>
      <div className="bg-[#F5F5F5] overflow-hidden ">
        <Header isLoggedIn={isLoggedIn} />

        <div className="mainCont relative text-main-dark mb-[100px] mt-[200px] md2:mt-[250px] z-30">

          <div className="mainCont relative text-main-dark mb-[100px] mt-[200px] md2:mt-[250px] z-30">
         <div className="relative text-main-dark z-30">

            <div className="relative ml-[60px] md2:ml-0 py-[50px] z-30">
                
                <div className="week">
                <div className="week-content relative h-[calc(100vh-250px)] md2:h-[calc(100vh-300px)] flex md2:items-center md2:justify-center gap-[50px] md2:gap-[200px] flex-col md2:flex-row md2:translate-x-[94px]">
                    <div className="text-[35px]">Week 1</div>
                    <div className="relative bg-white rounded-xl text-center px-7 py-5">
                     <div className="text-[19px] font-semibold mb-2">Selecting Your Spot</div>
                     <div className="text-[15px] max-w-[250px] mx-auto">Students tend to apply for multiple roles and not crack any. So we’d kick off your journey by identifying 2-3 roles that resonate with your career desires and shortlisting that 1 role that suits you the most.</div>
                     <div className="customShadow absolute -top-[20px] -left-[20px] bg-white w-16 h-16 text-[35px] flex items-center justify-center rounded-full">🎯</div>
                     <div className="blueCircle customShadowBlue absolute top-1/2 -left-[66px] md2:-left-[111px] -translate-y-1/2 w-6 h-6 bg-main rounded-full z-20"></div>
                    </div>
                </div>
                </div>

                <div className="week">
                <div className="week-content relative h-[calc(100vh-200px)] flex md2:items-center md2:justify-center gap-[50px] md2:gap-[200px] flex-col md2:flex-row-reverse md2:-translate-x-[94px]">
                    <div className="text-[35px]">Week 2</div>
                    <div className="relative bg-white rounded-xl text-center pl-10 px-7 py-5">
                     <div className="text-[19px] font-semibold mb-2">Keywords That Convert</div>
                     <div className="text-[15px] max-w-[250px] mx-auto">With your chosen role in focus, it's time to collect the key terms and skills from your job description research. We'll strategically infuse these keywords into your resume and LinkedIn ensuring your profile resonates with the target role.</div>
                     <div className="customShadow absolute -top-[20px] -left-[20px] bg-white w-16 h-16 text-[32px] flex items-center justify-center rounded-full">🔑</div>
                     <div className="blueCircle customShadowBlue absolute top-1/2 -left-[66px] md2:left-auto md2:-right-[108px] -translate-y-1/2 w-6 h-6 bg-main rounded-full z-20"></div>
                    </div>
                </div>
                </div>



                <div className="week">
                <div className="week-content relative h-[calc(100vh-200px)] flex md2:items-center md2:justify-center gap-[50px] md2:gap-[200px] flex-col md2:flex-row md2:translate-x-[94px]">
                    <div className="text-[35px]">Week 3</div>
                    <div className="relative bg-white rounded-xl text-center pl-10 px-7 py-5">
                     <div className="text-[19px] font-semibold mb-2">Gaining Domain Authority</div>
                     <div className="text-[15px] max-w-[250px] mx-auto">Now is the time to solidify your expertise in the chosen field. By complementing your work history with strategic courses, certifications, or hands-on projects, we'll display your skills in a way that makes it hard for any recruiter to reject you.</div>
                     <div className="customShadow absolute -top-[20px] -left-[20px] bg-white w-16 h-16 text-[35px] flex items-center justify-center rounded-full">👑</div>
                     <div className="blueCircle customShadowBlue absolute top-1/2 -left-[66px] md2:-left-[108px] -translate-y-1/2 w-6 h-6 bg-main rounded-full z-20"></div>
                    </div>
                </div>
                </div>

                <div className="week">
                <div className="week-content relative h-[calc(100vh-200px)] flex md2:items-center md2:justify-center gap-[50px] md2:gap-[200px] flex-col md2:flex-row-reverse md2:-translate-x-[94px]">
                    <div className="text-[35px]">Week 4</div>
                    <div className="relative bg-white rounded-xl text-center pl-10 px-7 py-5">
                     <div className="text-[19px] font-semibold mb-2">Content, Connect, & Comment</div>
                     <div className="text-[15px] max-w-[250px] mx-auto">It's time to broadcast your knowledge. Post authoritative content on LinkedIn, connect with your industry professionals, and engage on their posts by adding thought-provoking comments that reflect your deep understanding of the domain.</div>
                     <div className="customShadow absolute -top-[20px] -left-[20px] bg-white w-16 h-16 text-[35px] flex items-center justify-center rounded-full">🙋🏻</div>
                     <div className="blueCircle customShadowBlue absolute top-1/2 -left-[66px] md2:left-auto md2:-right-[93px] -translate-y-1/2 w-6 h-6 bg-main rounded-full z-20"></div>
                    </div>
                </div>
                </div>

                <div className="week">
                <div className="week-content relative h-[calc(100vh-200px)] flex md2:items-center md2:justify-center gap-[50px] md2:gap-[220px] flex-col md2:flex-row md2:translate-x-[110px]">
                    <div className="text-[35px]">Week 5</div>
                    <div className="relative bg-white rounded-xl text-center pl-10 px-7 py-5">
                     <div className="text-[19px] font-semibold mb-2">Cultivating Company Connections</div>
                     <div className="text-[15px] max-w-[250px] mx-auto">Enhance your list with 10 additional companies who hire for your chosen role and connect with their key employees. Your objective is to engage in discussions that reveal the core competencies that distinguish top performers in your field.</div>
                     <div className="customShadow absolute -top-[20px] -left-[20px] bg-white w-16 h-16 text-[35px] flex items-center justify-center rounded-full">💼</div>
                     <div className="blueCircle customShadowBlue absolute top-1/2 -left-[66px] md2:-left-[102px] -translate-y-1/2 w-6 h-6 bg-main rounded-full z-20"></div>
                    </div>
                </div>
                </div>

                <div className="week">
                <div className="week-content relative h-[calc(100vh-200px)] flex md2:items-center md2:justify-center gap-[50px] md2:gap-[200px] flex-col md2:flex-row-reverse md2:-translate-x-[94px]">
                    <div className="text-[35px]">Week 6</div>
                    <div className="relative bg-white rounded-xl text-center pl-10 px-7 py-5">
                     <div className="text-[19px] font-semibold mb-2">Building Your Portfolio</div>
                     <div className="text-[15px] max-w-[250px] mx-auto">Let’s refine your resume with Unibot. We’ll also build a no-code website or a sleek Notion page as a portfolio of your professional story and make sure that your resume, LinkedIn profile, and portfolio are all interconnected.</div>
                     <div className="customShadow absolute -top-[20px] -left-[20px] bg-white w-16 h-16 text-[35px] flex items-center justify-center rounded-full">📇</div>
                     <div className="blueCircle customShadowBlue absolute top-1/2 -left-[66px] md2:left-auto md2:-right-[108px] -translate-y-1/2 w-6 h-6 bg-main rounded-full z-20"></div>
                    </div>
                </div>
                </div>

                <div className="week">
                <div className="week-content relative h-[calc(100vh-200px)] flex md2:items-center md2:justify-center gap-[50px] md2:gap-[200px] flex-col md2:flex-row md2:translate-x-[94px]">
                    <div className="text-[35px]">Week 7</div>
                    <div className="relative bg-white rounded-xl text-center pl-10 px-7 py-5">
                     <div className="text-[19px] font-semibold mb-2">How To Apply?</div>
                     <div className="text-[15px] max-w-[250px] mx-auto">Stand out from the crowd. Activate your network for warm referrals or directly capture a hiring manager's attention on LinkedIn with a post that demonstrates how you can add value to the organisation in the chosen role.</div>
                     <div className="customShadow absolute -top-[20px] -left-[20px] bg-white w-16 h-16 text-[35px] flex items-center justify-center rounded-full">🙌🏻</div>
                     <div className="blueCircle customShadowBlue absolute top-1/2 -left-[66px] md2:-left-[108px] -translate-y-1/2 w-6 h-6 bg-main rounded-full z-20"></div>
                    </div>
                </div>
                </div>


                <div className="week">
                <div className="week-content relative h-[calc(100vh-200px)] flex md2:items-center md2:justify-center gap-[50px] md2:gap-[200px] flex-col md2:flex-row-reverse md2:-translate-x-[94px]">
                    <div className="text-[35px]">Week 8</div>
                    <div className="relative bg-white rounded-xl text-center pl-10 px-7 py-5">
                     <div className="text-[19px] font-semibold mb-2">Unimad’s Secret Sauce</div>
                     <div className="text-[15px] max-w-[250px] mx-auto">Wrap up your journey by creating a compelling Value Proposition Document for each prospective employer. This personalized presentation is your closing argument, your pitch, and your handshake – all in one.</div>
                     <div className="customShadow absolute -top-[20px] -left-[20px] bg-white w-16 h-16 text-[35px] flex items-center justify-center rounded-full">🤫</div>
                     <div className="blueCircle customShadowBlue absolute top-1/2 -left-[66px] md2:left-auto md2:-right-[108px] -translate-y-1/2 w-6 h-6 bg-main rounded-full z-20"></div>
                    </div>
                </div>
                </div>

            </div>
            <div className="absolute top-0 left-0 md2:left-1/2 md2:-translate-x-1/2 w-3 h-full bg-[#D9D9D9] rounded-full"></div>
            <img src="/images/circle8.svg" alt="cricle bg" className="hidden md2:flex absolute bottom-[1200px] -right-[900px]" />
            <img src="/images/circle9.svg" alt="cricle bg" className="hidden md2:flex absolute bottom-[200px] -left-[400px]" />
         </div>
        </div>


       <div className="mainCont mb-[150px] md2:mb-[200px]">
        <button onClick={handleLinkedInAuth} className="mainButton flex items-center gap-3 border border-main-dark rounded-full transition hover:bg-main hover:text-white hover:border-main font-medium text-[19px] w-fit px-5 py-3 mt-10 mx-auto">Count me in <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z" fill="currentColor"/></svg></button>
       </div>

          {/* ... and so on for other weeks */}
        </div>

        <Footer/>
      </div>
    </>
  );
};

export default Framework;

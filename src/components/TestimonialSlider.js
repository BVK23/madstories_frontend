
import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    image: "https://media.licdn.com/dms/image/D4E03AQFpwxF-rB03KQ/profile-displayphoto-shrink_800_800/0/1685884567222?e=1707955200&v=beta&t=LaXYxXt1aJausYyGaHQioSGUc-c4T0D9z9S3Wh30AOQ",
    name: "Keerthana",
    company: "Queens University Belfast",
    occupation: "MSc in Management",
    comment: "It made me realize the role of social media in the field of job application. I understood the ways of making LinkedIn more useful. Thank you guys for making that possible.",
  },

  {
    image: "https://media.licdn.com/dms/image/D4E03AQG3dt-HjMexbA/profile-displayphoto-shrink_800_800/0/1676293674192?e=1708560000&v=beta&t=WEMQEAqpbKqaevzaF15G5bsgbwBxGMXuIpEdfWA9ss8",
    name: "Sapna",
    company: "University of Edinburgh",
    occupation: "MSc HR Management",
    comment: "Indeed, attending your session today was genuinely worthwhile. The way you broke down the strategic plan was refreshingly insightful, and I'm eager to implement the steps you shared.",
  },

  {
    image: "https://media.licdn.com/dms/image/D4E35AQHVf-ZikeikmQ/profile-framedphoto-shrink_400_400/0/1696960004431?e=1703365200&v=beta&t=-8EPkMAbIDoqHq9MSA3v4Ihp9UWEV-_-BXGUl64lAH0",
    name: "Santosh",
    company: "University of Sheffield",
    occupation: "MSc in Management",
    comment: "Had thoughtful insights from Shaki, Varun and Aarthi. Thank you for organizing this guys. Keep doing it ✌️",
  },

  {
    image: "https://media.licdn.com/dms/image/D4E03AQH7PcanaJ-glQ/profile-displayphoto-shrink_400_400/0/1675117726392?e=1707955200&v=beta&t=hX1opzeRk2iWjxpV4w3Px4e2BNNovDmemetAxItdh7c",
    name: "Sanjna",
    company: "University of Aberdeen",
    occupation: "MSc in Cybersecurity",
    comment: "I appreciate your guidance and support in helping us make informed decisions about our career.",
  },

  {
    image: "https://media.licdn.com/dms/image/D4E03AQErnfS8b51bqA/profile-displayphoto-shrink_400_400/0/1687808396984?e=1707955200&v=beta&t=1t17IClzmGoYrhV8Ix2E7ESA7txHv_2EcMnUZ8U_YbA",
    name: "Dhana",
    company: "University of Sheffield",
    occupation: "MSc in Data Analytics",
    comment: "Thank you for illuminating the path to success and for believing in our capabilities. Together, we will conquer the challenges and reach new heights.",
  },

  {
    image: "https://media.licdn.com/dms/image/D4E35AQHatyNZrBk7Fg/profile-framedphoto-shrink_400_400/0/1702383877501?e=1703365200&v=beta&t=KXR9qTPim3BFDBn0owD48Wky9swZobirypzaFp6wGiA",
    name: "Hema",
    company: "University of Birmingham",
    occupation: "MSc in Engineering Management",
    comment: "It was a pleasure to be part of your audience, and I look forward to implementing those strategies.",
  },

  {
    image: "https://media.licdn.com/dms/image/D4E03AQGVqhui1QsjmA/profile-displayphoto-shrink_400_400/0/1693133173636?e=1707955200&v=beta&t=Zk0VMjxtb8ZxPlGJ9V6y622Y4YGMfAua-h0nkVeyk8w",
    name: "Shobith",
    company: "University of Birmingham",
    occupation: "MSc in Engineering Management",
    comment: "It was definitely a brand new approach to look at searching for jobs and potentially landing one.",
  },

  {
    image: "https://media.licdn.com/dms/image/D4D35AQE8mvLrOu6NUQ/profile-framedphoto-shrink_400_400/0/1695509997780?e=1703365200&v=beta&t=7CO9Qd4N0eP46lv5FI8uTEU4TtG4TsfMc4QjAobmABs",
    name: "Meera",
    company: "University of Sheffield",
    occupation: "MSc in Management",
    comment: "Huge gratitude for initiating this incredible endeavor and providing us with insights that have the potential to drive remarkable accomplishments.",
  },

  {
    image: "https://media.licdn.com/dms/image/D4E35AQHyu7CM26UXGA/profile-framedphoto-shrink_400_400/0/1689865522971?e=1703365200&v=beta&t=6AaLZtDXkVDN4iuy45mTryFRxsS2vk-b6DYehNu3BQw",
    name: "Simi",
    company: "University of Aberdeen",
    occupation: "MSc in Information Technology",
    comment: "Your advice and tips have been incredibly helpful 🙌 and I feel more prepared and confident as I embark on this journey.",
  },

];

const TestimonialSlider = () => {
  const testimonialRef = useRef(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const clonedTestimonials = [...testimonials];
    let totalWidth = 0;

    while (totalWidth < 5000) {
      clonedTestimonials.push(...testimonials);
      totalWidth = clonedTestimonials.length * 400;
    }

    setCards(clonedTestimonials);
  }, []);

  useEffect(() => {
    const testimonialElement = testimonialRef.current;
    let animation = null;
    let position = 0;
    let isPaused = false;

    const startAnimation = () => {
      if (!isPaused) {
        animation = requestAnimationFrame(startAnimation);
        position -= 1;
        if (position <= -(testimonialElement.scrollWidth / 2)) {
          position = 0;
        }
        testimonialElement.style.transform = `translateX(${position}px)`;
      }
    };

    animation = requestAnimationFrame(startAnimation);

    const handleMouseEnter = () => {
      isPaused = true;
      cancelAnimationFrame(animation);
    };

    const handleMouseLeave = () => {
      isPaused = false;
      animation = requestAnimationFrame(startAnimation);
    };

    testimonialElement.addEventListener('mouseenter', handleMouseEnter);
    testimonialElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      testimonialElement.removeEventListener('mouseenter', handleMouseEnter);
      testimonialElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <>
    <div className="relative text-main-dark mt-[160px] z-30">
     <div className="text-[42px] text-center mb-10 px-5">Listen to our lads!</div>
    <div className="testimonial-slider ">
      <div className="flex gap-2" ref={testimonialRef}>
        {cards.map((testimonial,index) => (
          <div key={index} className="cardShadow min-w-[300px] max-w-[300px] sm:min-w-[400px] sm:max-w-[400px] bg-white border border-main-dark rounded-2xl px-5 py-6 pb-20">
            <div className="flex items-center gap-3 mb-8">
            {/* <div className="bg-[#292929] w-20 h-20 rounded-full"></div> */}
            <img src={testimonial.image} alt="person_img" className="bg-[#292929] w-20 h-20 rounded-full" />
              <div>
               <div className="text-[17px] font-semibold">{testimonial.name}</div>
               <div className="text-[#383838] font-medium mb-[1px]">{testimonial.company}</div>
               <div className="text-[#B5B5B5] font-medium">{testimonial.occupation}</div>
              </div>
            </div>

            <div className="font-[500] leading-[172%]">{testimonial.comment}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default TestimonialSlider;

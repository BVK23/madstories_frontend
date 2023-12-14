
import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    image: "",
    name: "Keerthana",
    company: "Queens University Belfast",
    occupation: "MSc in Management",
    comment: "It made me realize the role of social media in the field of job application. I understood the ways of making LinkedIn more useful. Thank you guys for making that possible.",
  },

  {
    image: "",
    name: "Sapna",
    company: "University of York",
    occupation: "Data Scientist",
    comment: "Indeed, attending your session today was genuinely worthwhile. The way you broke down the strategic plan was refreshingly insightful, and I'm eager to implement the steps you shared.",
  },

  {
    image: "",
    name: "Santosh",
    company: "University of Sheffield",
    occupation: "MSc in Management",
    comment: "Had thoughtful insights from Shaki, Varun and Aarthi. Thank you for organizing this guys. Keep doing it ✌️",
  },

  {
    image: "",
    name: "Sanjna",
    company: "University of Aberdeen",
    occupation: "MSc in Cybersecurity",
    comment: "I appreciate your guidance and support in helping us make informed decisions about our career.",
  },

  {
    image: "",
    name: "Dhana",
    company: "University of Sheffield",
    occupation: "MSc in Data Analytics",
    comment: "Thank you for illuminating the path to success and for believing in our capabilities. Together, we will conquer the challenges and reach new heights.",
  },

  {
    image: "",
    name: "Hema",
    company: "University of Birmingham",
    occupation: "MSc in Engineering Management",
    comment: "It was a pleasure to be part of your audience, and I look forward to implementing those strategies.",
  },

  {
    image: "",
    name: "Shobith",
    company: "University of Birmingham",
    occupation: "MSc in Engineering Management",
    comment: "It was definitely a brand new approach to look at searching for jobs and potentially landing one.",
  },

  {
    image: "",
    name: "Meera",
    company: "University of Sheffield",
    occupation: "MSc in Management",
    comment: "Huge gratitude for initiating this incredible endeavor and providing us with insights that have the potential to drive remarkable accomplishments.",
  },

  {
    image: "",
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
            <div className="bg-[#292929] w-20 h-20 rounded-full"></div>
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

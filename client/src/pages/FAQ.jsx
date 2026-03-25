// don't change imports, unless adding new ones, thank you!
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FAQ.css";

const faqs = [
  {
    question: "How do I log a workout?",
    answer: "Go to the Workouts page and click Add Workout. Fill in the title, type, date, and duration. For distance based activities like walking, running, cycling, or swimming, you will also be asked to enter the distance. Press Enter to save."
  },
  {
    question: "What types of workouts does CardiYo support?",
    answer: "CardiYo currently supports Walking, Running, Cycling, Gym, Swimming, and Yoga."
  },
  {
    question: "What mountains are currently available?",
    answer: "Everest and Ben Nevis are currently available to select. More mountains are coming soon."
  },
  {
    question: "How do I change my mountain?",
    answer: "Go to Settings and click Change Mountain. Select from the available mountains and press Confirm."
  },
  {
    question: "What is the Health Hub?",
    answer: "The Health Hub is your connection to your healthcare provider. It displays your assigned GP's profile and contact details, a post board where your GP can send you messages and set goals, and a goals tracker where you can mark those goals as complete."
  },
  {
    question: "How do I change my profile photo?",
    answer: "There are two ways to update your profile photo. You can go to Settings and click Edit Profile, then press the upload image button to choose a new one. Alternatively, from the Settings page, you can click directly on your profile photo to change it."
  },
  {
    question: "How do I enable dark mode?",
    answer: "Go to Settings and open the Accessibility section. Under Dark Mode, select Yes to enable it, No to disable it, or Use Device Setting to automatically follow your device's preference."
  },
  {
    question: "How do I increase the text size?",
    answer: "Go to Settings and open the Accessibility section. Under Large Text, choose Large for a slightly bigger size or Larger for a more noticeable increase. Select Off to return to the default size."
  },
  {
    question: "How do I contact the CardiYo team?",
    answer: "You can reach us by email at c4rd1.y0@gmail.com. Our contact details are also available in the footer at the bottom of every page."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="faq-page">
        <button className="faq-back" onClick={() => navigate("/Settings")}>← Back to Settings</button>
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>No mountain too high, no question too small.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "faq-open" : ""}`}
              onClick={() => toggle(index)}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-icon">▼</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;
// test
// don't change imports, unless adding new ones, thank you!
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ReportPopup = ({ onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const options = [
    "Spam",
    "Abuse & Harassment",
    "Privacy violation",
    "Illegal & Unregulated Behaviours",
    "Suicide or Self-injury",
    "Nudity or Sexual Misconduct",
    "Scam or Fraud"
  ];

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };


  if (submitted) {
    return (
        
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div
          className="rounded-xl p-6 max-w-md w-full text-center shadow-lg border-[10px]"
          style={{ backgroundColor: "#5E806D", borderColor: "#3C5246" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Thank you for submitting a report</h2>

          <p className="mb-2 text-white">
            We will proceed with further actions after reviewing.
          </p>

          <p className="text-white">
            If any actions are taken, a notification will be sent to you and
            you will receive an email with details.
          </p>

          <button
            onClick={onClose}
            className="mt-6 bg-[#3C5246] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      <form
        onSubmit={handleSubmit}
        className="rounded-xl p-6 max-w-md w-full shadow-lg flex flex-col gap-4 border-[10px]"
        style={{ backgroundColor: "#5E806D", borderColor: "#3C5246" }}
      >

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:opacity-70 text-xl"
          >
            ✕
          </button>
        </div>

        <h2 className="text-2xl font-bold text-white text-center">Report</h2>
        <p className="text-white text-center mb-2">What do you want to report?</p>

        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="accent-green-400"
            />
            <span>{option}</span>
          </label>
        ))}

        <div className="flex items-center gap-2">
          <span className="text-white">Other:</span>
          <input
            type="text"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            className="flex-1 border rounded p-2 border-white text-black"
            placeholder="Specify other reason"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-[#3C5246] text-white px-6 py-2 rounded-lg hover:opacity-90 transition self-center"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportPopup;

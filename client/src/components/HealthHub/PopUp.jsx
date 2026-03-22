// don't change imports, unless adding new ones, thank you!
import React, { useState } from "react";

const HealthProv_PopUp = ({ onClose, onSuccess }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue === "WL1ZZ@Cardi") {
      onSuccess();   // allow access
    } else {
      setError("Incorrect value");
    }
  };

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
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>

        <h2 className="text-2xl font-bold text-white text-center">
          Access HealthHub
        </h2>

        <p className="text-white text-center">
          Enter the correct value to continue
        </p>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 rounded border border-white text-black"
          placeholder="Enter value"
        />

        {error && <p className="text-red-300 text-center">{error}</p>}

        <button
          type="submit"
          className="bg-[#3C5246] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default HealthProv_PopUp;
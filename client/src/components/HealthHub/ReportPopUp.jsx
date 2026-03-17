import React from "react";
import { Link } from "react-router-dom";

const ReportPopUp = ( {onClose} ) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Report Issue</h2>
            <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
            >
            Close
            </button>
        </div>
        </div>
    );
}

export default ReportPopUp;

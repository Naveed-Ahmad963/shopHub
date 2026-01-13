// components/OtpTimer.jsx
import React from "react";
import { Clock } from "lucide-react";

export const OtpTimer = ({ timer }) => {
  if (timer <= 0) return null;

  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
      <Clock className="w-4 h-4 text-blue-600" />
      <p className="text-sm text-blue-700 font-semibold">
        OTP expires in {Math.floor(timer / 60)}:
        {String(timer % 60).padStart(2, "0")}
      </p>
    </div>
  );
};

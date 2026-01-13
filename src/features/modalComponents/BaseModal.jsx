// src/features/modals/components/BaseModal.jsx
import { X } from "lucide-react";

const BaseModal = ({ title, icon: Icon, onClose, children, size = "md" }) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fade-in_0.2s_ease-out]">
      <div
        className={`bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto animate-[slide-up_0.3s_ease-out] border-t-4 border-gradient-to-r from-blue-600 to-blue-700`}
      >
        <div className="p-6 border-b border-blue-100 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        {children}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BaseModal;

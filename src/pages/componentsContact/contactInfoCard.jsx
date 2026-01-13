// Contact Info Card Component
// ============================================
export const ContactInfoCard = ({ icon: Icon, title, value, subtitle }) => (
  <div className="mb-8 bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">
          {title}
        </h3>
        <p className="text-gray-600 mb-1 font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  </div>
);

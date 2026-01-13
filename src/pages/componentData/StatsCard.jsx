export const StatCard = ({ icon: Icon, value, label, gradient }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:scale-105 border-t-4 border-blue-600">
    <div
      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl mb-4 shadow-lg`}
    >
      <Icon className="w-8 h-8 text-white" />
    </div>
    <p className="text-5xl font-extrabold text-gray-900 mb-2">{value}</p>
    <p className="text-gray-600 font-semibold">{label}</p>
  </div>
);

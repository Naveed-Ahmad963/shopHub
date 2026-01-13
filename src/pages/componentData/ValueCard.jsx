export const ValueCard = ({ icon: Icon, title, description, gradient }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all hover:scale-105 border-t-4 border-blue-600">
    <div
      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl mb-6 shadow-lg`}
    >
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-700 leading-relaxed">{description}</p>
  </div>
);

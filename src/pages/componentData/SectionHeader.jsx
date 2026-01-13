export const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-4">
      {title}
    </h2>
    <p className="text-gray-600 text-lg">{subtitle}</p>
  </div>
);

import React from "react";

export const DataTable = ({
  columns,
  data,
  renderRow,
  emptyMessage,
  emptyIcon: EmptyIcon,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="text-left py-4 px-6 font-bold text-gray-900 uppercase tracking-wide text-sm"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data?.map((item) => renderRow(item))}</tbody>
        </table>

        {(!data || data.length === 0) && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <EmptyIcon className="w-10 h-10 text-blue-400" />
            </div>
            <p className="text-gray-600 font-semibold text-lg">
              {emptyMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

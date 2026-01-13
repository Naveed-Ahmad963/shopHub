// src/components/common/LinkGroup.jsx
import React from "react";

export const LinkGroup = ({ title, items, renderItem, className = "" }) => (
  <div className={className}>
    {title && (
      <h5 className="font-bold text-white text-sm uppercase tracking-wide mb-6">
        {title}
      </h5>
    )}
    <ul className="space-y-3 text-sm">
      {items.map((item, idx) => (
        <li key={idx}>{renderItem(item, idx)}</li>
      ))}
    </ul>
  </div>
);

export default LinkGroup;

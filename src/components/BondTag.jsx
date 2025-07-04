// components/BondTag.jsx
import React from 'react';
import {
  bondTypeLabels,
  bondTypeColors,
  bondTypeIcons,
} from '../bonds/bondTypes';

export default function BondTag({ type }) {
  const colorClass = bondTypeColors[type] || 'bg-gray-500';
  const icon = bondTypeIcons[type] || 'fa-solid fa-circle';
  const label = bondTypeLabels[type] || 'Unknown';

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-white text-xs ${colorClass}`}>
      <i className={`${icon} mr-1`} />
      {label}
    </span>
  );
}

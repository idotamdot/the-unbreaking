import React from 'react';

export default function BondGraph({ nodes, links }) {
  return (
    <svg className="w-full h-full absolute top-0 left-0 z-0 pointer-events-none">
      {links.map((link, i) => (
        <line
          key={i}
          x1={link.from.x}
          y1={link.from.y}
          x2={link.to.x}
          y2={link.to.y}
          className="bond-line"
        />
      ))}
    </svg>
  );
}

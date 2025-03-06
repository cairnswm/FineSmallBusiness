import React, { useState, useEffect } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  sectionKey: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, sectionKey }) => {
  const [isOpen, setIsOpen] = useState(() => {
    const storedState = localStorage.getItem(sectionKey);
    return storedState ? JSON.parse(storedState) : true;
  });

  useEffect(() => {
    localStorage.setItem(sectionKey, JSON.stringify(isOpen));
  }, [isOpen, sectionKey]);

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border rounded-lg mb-4">
      <div
        className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
        onClick={toggleSection}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;

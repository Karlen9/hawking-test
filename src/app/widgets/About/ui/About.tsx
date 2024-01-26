"use client";

import { useState } from "react";

export const AboutDropdown = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const onToggleCart = () => {
    setIsAboutOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button className="flex gap-x-1 items-center" onClick={onToggleCart}>
        About
      </button>
      {isAboutOpen && (
        <div className="absolute top-5 rounded-md p-4 bg-white flex gap-y-4 flex-col">
          <button className="flex">Авторы</button>
          <button className="flex">О нас</button>
          <button className="flex">Github</button>
          <button className="flex">Telegram</button>
        </div>
      )}
    </div>
  );
};

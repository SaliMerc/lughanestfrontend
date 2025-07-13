import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setIsLightMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  }, [isLightMode]);

  return (
    <div
      onClick={() => setIsLightMode(!isLightMode)}
      aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
        isLightMode
          ? ' text-amber-200'
          : ' text-grey-800' 
      }`}
    >
      {isLightMode ? (
        <span className="flex items-center">
           ☀️<span className="ml-1 hidden sm:inline">Light</span>
        </span>
      ) : (
        <span className="flex items-center">
          🌙 <span className="ml-1 hidden sm:inline">Dark</span>
        </span>
      )}
    </div>
  );
}
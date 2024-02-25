// components/Clock.tsx
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date | null>(null); // Initialize state as null

  useEffect(() => {
    // Set the initial time on the client after mounting
    setTime(new Date());

    const timerId = setInterval(() => {
      setTime(new Date()); // Update time every second
    }, 1000);

    return () => {
      clearInterval(timerId); // Clear the interval on component unmount
    };
  }, []);

  // Render a placeholder or nothing until the component has mounted
  if (time === null) {
    return <div>Loading...</div>; // Or return null or any other placeholder
  }

  return (
    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
      {time.toLocaleTimeString()} {/* Render the current time */}
    </div>
  );
};

export default Clock;

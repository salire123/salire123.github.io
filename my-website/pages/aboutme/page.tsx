// pages/aboutme.tsx
import React from 'react';
import Clock from '../../components/Clock';

const AboutMe: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <Clock /> {/* Include the Clock component */}
      {/* Other content for the About Me page */}
    </div>
  );
};

export default AboutMe;

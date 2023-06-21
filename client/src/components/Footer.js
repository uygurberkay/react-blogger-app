import React from 'react';
import '../Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <p>
        TravelPad Made by Berkay Uygur
      </p>
      <p>
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  )
}

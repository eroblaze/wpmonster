import React from "react";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h1>Typify</h1>
      </div>
      <nav>
        <ul>
          <li>highest score</li>
          <li>
            time:<span>15</span>
            <span> 30</span>
            <span className="time-selected"> 60</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

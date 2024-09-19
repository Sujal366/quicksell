import React, { useEffect, useState, useRef } from 'react';
import FilterOptions from "./FilterOptions";
import SortingOptions from "./SortingOptions";
import displayIcon from "../assets/svg/Display.svg";
import downArrow from "../assets/svg/down.svg";
import "../styles/Board.css";

const Display = ({ grouping, sorting, setGrouping, setSorting }) => {
  const [popup, setPopup] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (popupRef.current && !popupRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setPopup(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="display-icon" onClick={() => setPopup(!popup)} ref={buttonRef}>
        <img src={displayIcon} alt="" />
        Display
        <img src={downArrow} alt="" />
      </div>
      <div style={{ position: "relative" }}>
        {popup && (
          <div className="popup" ref={popupRef}>
            <FilterOptions grouping={grouping} setGrouping={setGrouping} />
            <SortingOptions sorting={sorting} setSorting={setSorting} />
          </div>
        )}
      </div>
    </>
  );
};

export default Display;

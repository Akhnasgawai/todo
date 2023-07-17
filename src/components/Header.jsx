import "./css/Header.css";
import React from "react";
import moment from "moment";

const Header = (taskCount) => {
  const currentDate = moment().format("dddd, Do");
  const month = moment().format("MMMM");
  return (
    <>
      <div className="header">
        <div className="date">
          <h4>{currentDate}</h4>
          <p>{month}</p>
        </div>
        <div className="taskCount">
          <p>{taskCount.taskCount} tasks</p>
        </div>
      </div>
    </>
  );
};

export default Header;

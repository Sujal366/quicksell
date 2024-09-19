import React from "react";
import "../styles/FilterOptions.css";

const FilterOptions = ({ grouping, setGrouping }) => {
  return (
    <div className="filter-options">
      <label>Grouping</label>
      <select
        value={grouping}
        onChange={(e) => setGrouping(e.target.value)}
        style={{ width: "100px", padding: "3px 5px" }}
      >
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default FilterOptions;

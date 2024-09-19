import React from "react";
import "../styles/SortingOptions.css";

const SortingOptions = ({ sorting, setSorting }) => {
  return (
    <div className="sorting-options">
      <label>Ordering</label>
      <select
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
        style={{ width: "100px", padding: "3px 5px" }}
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortingOptions;

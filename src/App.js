import React, { useState, useEffect } from "react";
import { fetchTickets } from "./utils/api"; 
import Board from "./components/Board";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]); 
  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem("grouping") || "status";
  });
  const [sorting, setSorting] = useState(() => {
    return localStorage.getItem("sorting") || "priority";
  });

  useEffect(() => {
    fetchTickets().then((data) => {
      if (data && Array.isArray(data.tickets)) {
        setTickets(data.tickets);
      } else {
        console.error("Expected an array of tickets");
      }
      if (data && Array.isArray(data.users)) {
        setUsers(data.users); 
      } else {
        console.error("Expected an array of users");
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("sorting", sorting);
  }, [sorting]);

  return (
    <>
      <Board
        tickets={tickets}
        users={users} 
        grouping={grouping}
        sorting={sorting}
        setGrouping={setGrouping}
        setSorting={setSorting}
      />
    </>
  );
}

export default App;

import React from "react";
import Ticket from "./Ticket";
import "../styles/Board.css";
import Display from "./Display";
import noPrioriity from "../assets/svg/No-priority.svg";
import lowPriority from "../assets/svg/Img - Low Priority.svg";
import mediumPriority from "../assets/svg/Img - Medium Priority.svg";
import highPriority from "../assets/svg/Img - High Priority.svg";
import urgentPriority from "../assets/svg/SVG - Urgent Priority colour.svg";
import toDo from "../assets/svg/To-do.svg";
import inProgress from "../assets/svg/in-progress.svg";
import backlog from "../assets/svg/Backlog.svg";
import add from "../assets/svg/add.svg";
import dotmenu from "../assets/svg/3 dot menu.svg";

const Board = ({ tickets, users, grouping, sorting, setGrouping, setSorting }) => {
  if (!Array.isArray(tickets)) {
    console.error("Tickets is not an array:", tickets);
    return <div>Error: Tickets data is not available.</div>;
  }

  const priorityLabels = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent"
  };

  const priorityLogos = {
    0: noPrioriity,
    1: lowPriority,
    2: mediumPriority,
    3: highPriority,
    4: urgentPriority,
  };

  const statusLogos = {
    "Todo": toDo,
    "In progress": inProgress,
    "Backlog": backlog,
  };

  const getUserNameById = (userId) => {
    if (!Array.isArray(users)) {
      console.error("Users data is not available or is not an array.");
      return userId; 
        }
    const user = users.find((u) => u.id === userId);
    return user ? user.name : userId; 
  };

  const groupByStatus = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const { status } = ticket;
      if (!acc[status]) acc[status] = [];
      acc[status].push(ticket);
      return acc;
    }, {});
  };

  const groupByUser = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const userName = getUserNameById(ticket.userId); 
      if (!acc[userName]) acc[userName] = [];
      acc[userName].push(ticket);
      return acc;
    }, {});
  };

  const groupByPriority = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const priorityLabel = priorityLabels[ticket.priority] || "No Priority"; 
      if (!acc[priorityLabel]) acc[priorityLabel] = [];
      acc[priorityLabel].push(ticket);
      return acc;
    }, {});
  };

  const sortTickets = (tickets) => {
    return tickets.slice().sort((a, b) => {
      if (sorting === "priority") {
        return b.priority - a.priority;
      } else if (sorting === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupTickets = () => {
    let grouped;
    if (grouping === "status") {
      grouped = groupByStatus(tickets);
    } else if (grouping === "user") {
      grouped = groupByUser(tickets);
    } else if (grouping === "priority") {
      grouped = groupByPriority(tickets);
    }

    return Object.entries(grouped).reduce((acc, [group, tickets]) => {
      acc[group] = sortTickets(tickets);
      return acc;
    }, {});

    
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      <div>
        <Display
          grouping={grouping}
          sorting={sorting}
          setGrouping={setGrouping}
          setSorting={setSorting}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          background: "#f3f4f8",
          height: "100vh",
        }}
      >
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <div key={group} className="ticket-group">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                {grouping === "priority" ? (
                  <img
                    src={priorityLogos[tickets[0].priority]}
                    alt={`${group} priority logo`}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  />
                ) : grouping === "status" ? (
                  <img
                    src={statusLogos[group]}
                    alt={`${group} status logo`}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  />
                ) : null}
                {group}{" "}
                <p
                  style={{
                    marginLeft: "10px",
                    color: "darkgray",
                    fontSize: "18px",
                  }}
                >
                  {tickets.length}
                </p>
              </div>
              <div>
                <img
                  src={add}
                  alt="add"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={dotmenu}
                  alt="menu"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            {tickets.map((ticket) => (
              <Ticket
                key={ticket.id}
                data={ticket}
                userName={getUserNameById(ticket.userId)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;

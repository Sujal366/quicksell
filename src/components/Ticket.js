import React, { useMemo } from "react";
import "../styles/Board.css";
import noPrioriity from "../assets/svg/No-priority.svg";
import lowPriority from "../assets/svg/Img - Low Priority.svg";
import mediumPriority from "../assets/svg/Img - Medium Priority.svg";
import highPriority from "../assets/svg/Img - High Priority.svg";
import urgentPriority from "../assets/svg/SVG - Urgent Priority colour.svg";

const Ticket = ({ data, userName }) => {
  const { title, priority, id, tag, userImageUrl } = data;

  const getInitials = (userName) => {
    if (!userName) return "";
    const nameParts = userName.split(" ");
    return nameParts
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(userName);
  console.log(initials);
  

  const generateColor = (initials) => {
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  const backgroundColor = useMemo(() => generateColor(initials), [initials]);

  const avatarStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    backgroundColor,
    overflow: "hidden",
  };

  const priorityLogos = {
    0: noPrioriity,
    1: lowPriority,
    2: mediumPriority,
    3: highPriority,
    4: urgentPriority,
  };

  return (
    <div className="ticket">
      <div className="details">
        <div>
          <p className="ticket-id">{id}</p>
          <p className="ticket-title">{title}</p>
        </div>
        <div>
          <div style={avatarStyle}>
            {userImageUrl ? (
              <img
                src={userImageUrl}
                alt="User"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              initials
            )}
          </div>
        </div>
      </div>
      <div className="feature-container">
        <img
          src={priorityLogos[priority]}
          alt=""
          style={{
            width: "20px",
            height: "20px",
            marginRight: "8px",
          }}
        />
        <div className="feature-tag">
          <p className="feature-icon"></p>
          {tag[0]}
        </div>
      </div>
    </div>
  );
};

export default Ticket;

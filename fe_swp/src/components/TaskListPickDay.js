import React, { useState, useEffect } from "react";
import TaskDetailComponent from "./TaskDetail";

const Calendar = (props) => {
  const [ListTasks, setListTasks] = useState([]);
  useEffect(() => {
    setListTasks([]);
    fetch(
      `https://localhost:7239/api/Task/GetTasksRangeByTime?userID=${localStorage.getItem(
        "id"
      )}&timeFrom=` +
        props.daystring +
        "&timeTo=" +
        props.daystring
    )
      .then((response) => response.json())
      .then((data) => {
        setListTasks(data.data);
        console.log(
          `https://localhost:7239/api/Task/GetTasksRangeByTime?userID=${localStorage.getItem(
            "id"
          )}&timeFrom=` +
            props.daystring +
            "&timeTo=" +
            props.daystring
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [props.daystring]);

  return (
    <div className="Task-list" style={{ height: "65vh", overflowY: "auto" }}>
      {ListTasks != null &&
        ListTasks.map((Task) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.setTaskdetail(Task);
              props.setContent(2);
              props.handleActive(2, "link", "listitems");
            }}
          >
            <TaskDetailComponent key={Task.id} task={Task} />
          </div>
        ))}
    </div>
  );
};
export default Calendar;

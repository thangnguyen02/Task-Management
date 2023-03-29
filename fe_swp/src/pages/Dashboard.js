import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import DisplayTaskToday from "../components/DisplayTaskToday";
import DisplayPinTask from "../components/DisplayPinTask";
import ModalCreateTask from "../components/ModalCreateTask";
import authAxios from "../services/AxiosInstance";
const getDate = () => {
  const Month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];
  const date = new Date();
  return { day: date.getDate(), month: Month[date.getMonth()] };
};
const Dashboard = (props) => {
  const date = getDate();
  const [openModal, setOpenModal] = useState();
  const [listTask, setListTask] = useState();
  const setTaskdetail = props.setTaskdetail;
  const setContent = props.setContent;
  const handleActive = props.handleActive;
  useEffect(() => {
    authAxios
      .get(`/Task/AssignedTasks/${localStorage.getItem("id")}`)
      .then(function (response) {
        console.log(response.data.data);

        const currentDate = new Date().toLocaleDateString();
        console.log(
          response.data.data.filter((item) => {
            const to = new Date(item.taskTo).toLocaleDateString();
            const from = new Date(item.taskTo).toLocaleDateString();
            console.log(currentDate > from);
            console.log(currentDate < from);

            return currentDate == from;
          })
        );
        setListTask(
          response.data.data.filter((item) => {
            const to = new Date(item.taskTo).toLocaleDateString();
            const from = new Date(item.taskFrom).toLocaleDateString();
            console.log(item);
            return currentDate >= from && currentDate <= to;
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [openModal]);

  return (
    <div className="content">
      <div className="content-header">
        <span
          id="buttonOpenModal"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Create Task
        </span>
        <ModalCreateTask openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <div className="dashboard-content">
        <div className="element">
          <div className="today">
            <h2
              className="titleabc"
              style={{ backgroundColor: "rgb(228, 140, 39)" }}
            >
              Today
            </h2>
            <div className="date-box">
              <h1 className="month">{date.month}</h1>
              <p className="day">{date.day}</p>
            </div>
          </div>
        </div>
        <div className="element">
          <h2
            style={{
              marginBottom: "20px",
              backgroundColor: "rgb(150 105 255)",
            }}
            className="titleabc"
          >
            Your Task Today
          </h2>
          <div className="task-today">
            <DisplayTaskToday
              setTaskdetail={setTaskdetail}
              listTask={listTask}
              setContent={setContent}
              handleActive={handleActive}
            />
          </div>
        </div>
        <div className="element">
          <h2
            style={{
              marginBottom: "20px",
              backgroundColor: "rgb(27, 193, 223)",
            }}
            className="titleabc"
          >
            Pin Task
          </h2>
          <div className="pin-task">
            <DisplayPinTask
              setTaskdetail={setTaskdetail}
              setContent={setContent}
              handleActive={handleActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

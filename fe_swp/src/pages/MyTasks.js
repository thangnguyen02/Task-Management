import React, { useEffect, useState } from "react";
import ModalCreateTask from "../components/ModalCreateTask";
import TaskDetails from "../components/TaskDetails";
import authAxios from "../services/AxiosInstance";
import "../styles/MyTasks.css";
function MyTasks(props) {
  const [openModal, setOpenModal] = useState(false);
  const [listTask, setListTask] = useState();
  const taskdetail = props.taskdetail;
  const setTaskdetail = props.setTaskdetail;
  const [check, setCheck] = useState();
  useEffect(() => {
    authAxios
      .get(`/Task/AssignedTasks/${localStorage.getItem("id")}`)
      .then(function (response) {
        console.log(response.data.data);
        setListTask(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [check]);
  const getcolor = (dateTo, status) => {
    const currentDate = new Date();
    const date1 = new Date(dateTo);
    if (status) return "green";
    else {
      if (date1.getTime() >= currentDate.getTime()) return "orange";
      else if (date1.getTime() < currentDate.getTime()) return "red";
    }
  };
  const changeDate = (dt) => {
    let date = new Date(dt);
    return date.toISOString().substring(0, 10);
  };
  const handleOnTaskDetails = (alo) => {
    setTaskdetail(alo);
  };
  return taskdetail == null ? (
    <div className="content">
      <div className="personal-task">
        <h1 style={{ color: "white" }}>List of Tasks</h1>
        <div className="content-header">
          <span
            id="buttonOpenModal"
            onClick={() => {
              setOpenModal(!openModal);
            }}
          >
            Create new Task
          </span>
          <ModalCreateTask
            openModal={openModal}
            setOpenModal={setOpenModal}
            check={check}
            setCheck={setCheck}
          />
        </div>
        <div className="listTaskall">
          {listTask != null &&
            listTask.map((element) => {
              return (
                <div
                  className="taskDetail"
                  key={element.id}
                  style={{
                    border:
                      "1px solid " + getcolor(element.taskTo, element.status),
                  }}
                  onClick={() => {
                    handleOnTaskDetails(element);
                  }}
                >
                  <h4
                    style={{
                      color: getcolor(element.taskTo, element.status),
                      marginLeft: "3vw",
                    }}
                  >
                    {element.title}
                  </h4>
                  <p>Time Limited: {changeDate(element.taskTo)}</p>
                  <p
                    style={{
                      color: getcolor(element.taskTo, element.status),
                    }}
                  >
                    {getcolor(element.taskTo, element.status) === "red"
                      ? "Overdue"
                      : getcolor(element.taskTo, element.status) === "green"
                      ? "Finish"
                      : "To be doing"}
                  </p>
                  {/* <p>Status:{element.status ? "blue" : {element.TaskTo}}</p> */}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <TaskDetails
      taskdetail={taskdetail}
      setTaskdetail={setTaskdetail}
      getColor={getcolor}
      check={check}
      setCheck={setCheck}
      setContent={props.setContent}
      handleActive={props.handleActive}
      setProject={props.setProject}
      indexofId={props.indexofId}
    />
  );
}

export default MyTasks;

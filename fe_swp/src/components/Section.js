import React, { useState, useEffect } from "react";
import "../styles/ProjectDetails.css";
import authAxios from "../services/AxiosInstance";
import "../styles/Project.css";
import "../styles/Section.css";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { Button, Collapse } from "@mui/material";
import { swal } from "sweetalert";

function Section(props) {
  const [opened, setOpened] = useState(false);
  const [done, setDone] = useState(true);
  const [tasks, setTasks] = useState();
  const [reload, setReload] = useState(false);
  const showDetails = (id) => {
    let collap = document.getElementById(id + "cl");
    if (collap.style.display == "none") collap.style.display = "block";
    else collap.style.display = "none";
  };
  const drag = props.drag;
  async function drop(ev) {
    let src = ev.dataTransfer.getData("Text");
    let sectionNewID = ev.target.getAttribute("sec");
    let taskid = document.getElementById(src).getAttribute("id");

    await authAxios
      .get(
        `/Task/UpdateSectionTask/?sectionNewID=${sectionNewID}&taskID=${taskid}&userID=${localStorage.getItem(
          "id"
        )}`
      )
      .then(function (response) {
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    let a = document.getElementById(props.section.id + "div");
    a.style.display = "none";
    props.setCheck(!props.check);
    setReload(!reload);
  }
  const dragEnter = (ev) => {
    ev.preventDefault();
    let a = document.getElementById(props.section.id + "div");
    a.style.display = "block";
    return true;
  };
  const dragOver = (ev) => {
    ev.preventDefault();
    let a = document.getElementById(props.section.id + "div");
    a.style.display = "block";
    return false;
  };
  const dragleave = (event) => {
    let a = document.getElementById(props.section.id + "div");
    a.style.display = "none";
    event.preventDefault();
    return true;
  };
  function openAddTaskProject() {
    console.log(props);
    setOpened(!opened);
  }

  async function addTaskProject() {
    const title = document.querySelector(".title").value;
    const describe = document.querySelector(".describe").value;
    const taskFrom = document.querySelector(".From").value;
    const taskTo = document.querySelector(".to").value;
    if (title == "") alert("Title is empty, Please check again !!");
    else if (taskFrom == "" || taskTo == "")
      alert("Date From and Date To is invalid, Please check again !!");
    else {
      const dateF = new Date(taskFrom);
      const dateT = new Date(taskTo);

      if (dateT.getTime() <= dateF.getTime()) alert("Please check date input");
      else {
        await authAxios
          .post(`/Task?userID=${localStorage.getItem("id")}&roleID=1`, {
            sectionId: props.section.id,
            title: title,
            describe: describe,
            taskFrom: taskFrom,
            taskTo: taskTo,
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        setOpened(!opened);
        setDone(!done);
      }
    }
  }

  useEffect(() => {
    authAxios
      .get(`/Task/GetTasksInSection?sectionId=${props.section.id}`)
      .then(function (response) {
        console.log(response.data.data);
        setTasks(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [done, reload, props.check]);

  async function deleteSection() {
    if (window.confirm("Are you sure you want to delete this section")) {
      // /Section/19?userID=1
      await authAxios
        .delete(
          `/Section/${props.section.id}?userID=${localStorage.getItem("id")}`
        )
        .then(function (response) {
          if (response.data.status == 400) {
            alert("You are not allowed to delete");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    props.setCheck(!props.check);
  }
  const getcolor = (dateF, dateTo, status) => {
    const currentDate = new Date();
    const dateEnd = new Date(dateTo);
    const dateStart = new Date(dateF);
    if (status) return "green";
    else {
      if (
        dateEnd.getTime() >= currentDate.getTime() &&
        dateStart.getTime() <= currentDate.getTime()
      )
        return "orange";
      else if (dateEnd.getTime() < currentDate.getTime()) return "red";
      else if (
        dateEnd.getTime() >= currentDate.getTime() &&
        dateStart.getTime() >= currentDate.getTime()
      )
        return "black";
    }
  };
  const changeDate = (dt) => {
    let date = new Date(dt);
    return date.toISOString().substring(0, 10);
  };
  return (
    <div className="section">
      <div className="section_name " draggable="false">
        {props.section.title}
        <div
          className="btnDelete"
          style={{
            borderRadius: "100%",
            cursor: "pointer",
          }}
          onClick={() => deleteSection()}
        >
          <AiFillDelete size="20px" />
        </div>
      </div>
      <div className="content_section">
        <div
          className="listTask"
          id={props.section.id + ""}
          sec={props.section.id + ""}
          onDrop={(event) => {
            drop(event);
          }}
          onDragOver={(event) => {
            return dragOver(event);
          }}
          ondragenter={(event) => {
            return dragEnter(event);
          }}
          onDragLeave={(event) => {
            return dragleave(event);
          }}
          // onDragEnd={() => {
          //   props.setCheck(!props.check);
          // }}
        >
          {tasks != null && tasks.length != 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                id={task.id + ""}
                sec={props.section.id + ""}
                className="task"
                style={{
                  cursor: "pointer",
                }}
                onDragStart={(event) => drag(event)}
                draggable="true"
                onDoubleClick={() => {
                  showDetails(task.id);
                }}
              >
                <div
                  className="task_title"
                  style={{
                    color: getcolor(task.taskFrom, task.taskTo, task.status),
                  }}
                  sec={props.section.id + ""}
                >
                  {task.title}
                </div>
                <Collapse
                  id={task.id + "cl"}
                  in={true}
                  timeout="auto"
                  sx={{
                    display: "none",
                  }}
                  sec={props.section.id + ""}
                  className="detailsTaskOnP"
                >
                  {" "}
                  <div className="task_des">
                    <h4>
                      Status:{" "}
                      <span
                        style={{
                          color: getcolor(
                            task.taskFrom,
                            task.taskTo,
                            task.status
                          ),
                        }}
                      >
                        {getcolor(task.taskFrom, task.taskTo, task.status) ===
                        "red"
                          ? "Overdue"
                          : getcolor(
                              task.taskFrom,
                              task.taskTo,
                              task.status
                            ) === "green"
                          ? "Finish"
                          : getcolor(
                              task.taskFrom,
                              task.taskTo,
                              task.status
                            ) === "black"
                          ? "Not Time yet"
                          : "To be doing"}
                      </span>
                    </h4>
                  </div>
                  <div className="task_des">{task.describe}</div>
                  <div className="task_fromto">
                    From: {changeDate(task.taskFrom)} <br />
                    To: {changeDate(task.taskTo)}
                  </div>
                </Collapse>
              </div>
            ))
          ) : (
            <div style={{ height: "30px" }} sec={props.section.id + ""}></div>
          )}
          <div
            className="draghere"
            id={props.section.id + "div"}
            sec={props.section.id + ""}
          ></div>
        </div>
        <div className="btnOpen" onClick={openAddTaskProject} draggable="false">
          {opened ? "X" : <AiOutlinePlus></AiOutlinePlus>}
        </div>
        {opened && (
          <div className="frmAdd" draggable="false">
            <input
              autoFocus="true"
              className="title"
              placeholder="Title"
            ></input>
            <textarea
              className="describe"
              placeholder="Describe"
              rows={4}
              maxLength={100}
            ></textarea>
            <span>From:</span> <input className="From" type="date" />
            <span>To:</span> <input className="to" type="date"></input>
            <Button size="small" onClick={() => addTaskProject()}>
              Add Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Section;

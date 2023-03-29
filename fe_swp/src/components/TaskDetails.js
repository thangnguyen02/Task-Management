import React, { useState } from "react";
import "../styles/TaskDetails.css";
import {
  BsFillPinAngleFill,
  BsThreeDots,
  BsCheckLg,
  BsXLg,
} from "react-icons/bs";
import authAxios from "../services/AxiosInstance";
import swal from "sweetalert";

const TaskDetails = (props) => {
  const taskdetail = props.taskdetail;
  const setTaskdetail = props.setTaskdetail;
  const getColor = props.getColor;

  const handleOnShowP = (id) => {
    props.handleActive(props.indexofId(id), "listitems", "link");

    props.setContent(3);
    props.setProject(id + "");
  };
  const [edit, setEdit] = useState(false);

  const listTag = [
    { id: "1", name: "tag1" },
    { id: "2", name: "tag2" },
    { id: "3", name: "tag3" },
    { id: "4", name: "tag4" },
  ];
  const handleOnCancel = () => {
    handleOnShow();
    setEdit(false);
  };
  async function handleOnpin(id, section) {
    if (taskdetail.info != null) {
      // /Task/GetUserTaskRoleByUserID?userId=11&taskID=46
      let PIN;

      await authAxios
        .get(
          `/Task/GetUserTaskRoleByUserID?userId=${localStorage.getItem(
            "id"
          )}&taskID=${id}`
        )
        .then(function (response) {
          console.log(response.data.data.pinTask);
          PIN = response.data.data.pinTask;
          console.log(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      if (PIN) {
        // /Task/UpdatePinTask?taskID=46&userID=11&status=false
        swal({
          title: "Do you want to UNPIN this task",
          text: "Do you want to UNPIN this task",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            authAxios
              .put(
                `/Task/UpdatePinTask?taskID=${id}&userID=${localStorage.getItem(
                  "id"
                )}&status=false`
              )
              .then(function (response) {
                window.location.reload();
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
            swal("Upin successfully", {
              icon: "success",
            });
          }
        });
      } else {
        swal({
          title: "Do you want to PIN this task",
          text: "Do you want to PIN this task",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            authAxios
              .put(
                `/Task/UpdatePinTask?taskID=${id}&userID=${localStorage.getItem(
                  "id"
                )}&status=true`
              )
              .then(function (response) {
                window.location.reload();
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
      }
    } else {
      if (taskdetail.pinTask) {
        swal({
          title: "Do you want to UNPIN this task",
          text: "Do you want to UNPIN this task",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            authAxios
              .put(`/Task/${id}?userID=${localStorage.getItem("id")}`, {
                id: id,
                title: taskdetail.title,
                taskFrom: taskdetail.taskFrom,
                taskTo: taskdetail.taskTo,
                describe: taskdetail.describe,
                pinTask: false,
              })
              .then(function (response) {
                console.log(response.data);
                window.location.reload();
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
      } else {
        swal({
          title: "Do you want to pin",
          text: "Do you want to pin",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            authAxios
              .put(`/Task/${id}?userID=${localStorage.getItem("id")}`, {
                id: id,
                title: taskdetail.title,
                taskFrom: taskdetail.taskFrom,
                taskTo: taskdetail.taskTo,
                describe: taskdetail.describe,
                pinTask: true,
              })
              .then(function (response) {
                console.log(response.data);
                window.location.reload();
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
      }
    }
  }
  async function hangleOnFinish(id, section) {
    if (taskdetail.info != null) {
      swal({
        title: "Have you done this task ?",
        text: "Have you done this task ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          authAxios
            .put(
              `/Task/UpdateStatusTask?taskID=${id}&userID=${localStorage.getItem(
                "id"
              )}&status=true`
            )
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    } else {
      swal({
        title: "Have you done this task ?",
        text: "Have you done this task ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          authAxios
            .put(`/Task/${id}?userID=${localStorage.getItem("id")}`, {
              id: id,
              title: taskdetail.title,
              taskFrom: taskdetail.taskFrom,
              taskTo: taskdetail.taskTo,
              describe: taskdetail.describe,
              pinTask: taskdetail.pinTask,
              status: true,
            })
            .then(function (response) {
              console.log(response.data);
              window.location.reload();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    }
  }
  const onEdit = () => {
    handleOnShow();
    setEdit(true);
  };
  async function onSave(id) {
    handleOnShow();
    let title = document.getElementsByName("title")[0].value;
    let describe = document.getElementsByName("descrip")[0].value;
    let tagid = document.getElementsByName("tag")[0].value;
    let from = document.getElementsByName("from")[0].value;
    let to = document.getElementsByName("to")[0].value;
    console.log(
      `${title},${describe},${tagid == "" ? null : tagid},${from},${to}`
    );
    if (title == "")
      swal({
        title: "Error",
        text: "Title is empty, Please check again !!",
        icon: "warning",
      });
    else if (from == "" || to == "")
      swal({
        title: "Error",
        text: "Date From and Date To is invalid, Please check again !!",
        icon: "warning",
      });
    else {
      const dateF = new Date(from);
      const dateT = new Date(to);
      if (dateT.getTime() <= dateF.getTime())
        swal({
          title: "Error",
          text: "Please check date input !!",
          icon: "warning",
        });
      else {
        if (window.confirm("Save now ?")) {
          swal({
            title: "Edit success",
            text: "",
            icon: "success",
          });
          await authAxios
            .put(`/Task/${id}?userID=${localStorage.getItem("id")}`, {
              id: id,
              sectionId: taskdetail.sectionId,
              title: title,
              describe: describe,
              image: taskdetail.image,
              status: taskdetail.status,
              taskTo: dateT,
              taskFrom: dateF,
              pinTask: taskdetail.pinTask,
              tagId: tagid == "" ? null : tagid,
              attachment: taskdetail.attachment,
            })
            .then(function (response) {
              setTaskdetail(response.data.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          setEdit(false);
        }
      }
    }
  }
  async function handleOnDelete(id) {
    handleOnShow();
    //delete
    await authAxios
      .delete(`/Task/${id}?userID=${localStorage.getItem("id")}`)
      .then(function (response) {})
      .catch(function (error) {
        alert("This task you are not allowed to delete");
      });
    props.setCheck(!props.check);
    setTaskdetail(null);
  }
  const handleOnShow = () => {
    let a = document.getElementById(taskdetail.id);

    if (a.style.display === "block") {
      a.style.display = "none";
    } else {
      a.style.display = "block";
    }
  };
  const changeDate = (dt) => {
    let date = new Date(dt);
    return date.toISOString().substring(0, 10);
  };

  return edit == false ? (
    <div className="content">
      <div className="tasksdetail">
        <div className="taskheader">
          <h1>{taskdetail.title}</h1>
          <div id="icon_tasks">
            <BsFillPinAngleFill
              className="icons_task"
              style={{ color: taskdetail.pinTask ? "red" : "black" }}
              onClick={() => {
                handleOnpin(taskdetail.id, taskdetail.section);
              }}
            />
            <BsCheckLg
              className="icons_task"
              style={{
                color: "green",
                display:
                  getColor(taskdetail.taskTo, taskdetail.status) === "green"
                    ? "none"
                    : "",
              }}
              onClick={() => {
                hangleOnFinish(taskdetail.id, taskdetail.section);
              }}
            />
            {taskdetail.info == null && (
              <BsThreeDots
                className="icons_task"
                onClick={() => {
                  handleOnShow();
                }}
              />
            )}
            <div className="menu_task" id={taskdetail.id}>
              <ul>
                <li
                  onClick={() => {
                    onEdit(taskdetail.id);
                  }}
                >
                  Edit
                </li>
                <li
                  onClick={() => {
                    handleOnDelete(taskdetail.id);
                  }}
                  style={{ color: "red" }}
                >
                  Delete
                </li>
              </ul>
            </div>
            <BsXLg
              className="icons_task"
              onClick={() => {
                setTaskdetail();
              }}
            />
          </div>
        </div>
        <div className="taskcontent">
          <div className="left">
            <h3 className="tag">
              Tag:
              <span style={{ marginLeft: "10px", fontWeight: "normal" }}>
                {taskdetail.tagID == null ? "None" : taskdetail.tagID}
              </span>
            </h3>
            <h3 className="status">
              Status:
              <span
                style={{
                  color: getColor(taskdetail.taskTo, taskdetail.status),
                  marginLeft: "10px",
                }}
              >
                {getColor(taskdetail.taskTo, taskdetail.status) === "red"
                  ? "Overdue"
                  : getColor(taskdetail.taskTo, taskdetail.status) === "green"
                  ? "Finish"
                  : "To be doing"}
              </span>
            </h3>

            <div className="des">
              <h3>Desctiption</h3>
              <p>{taskdetail.describe}</p>
              <p>{taskdetail.attachment}</p>
            </div>
          </div>
          <div className="right">
            <div className="time_tas">
              <h4>
                From: <span>{changeDate(taskdetail.taskFrom)}</span>
              </h4>
              <h4>
                To: <span>{changeDate(taskdetail.taskTo)}</span>
              </h4>
            </div>
            {taskdetail.info != null && (
              <div className="projectinfo">
                <div className="manager_infor">
                  Manager: <span>{taskdetail.info.user}</span>
                </div>
                <div className="section_infor">
                  Section: <span>{taskdetail.info.section}</span>
                </div>
                <div className="project_infor">
                  Project: <span>{taskdetail.info.workSpace}</span>
                  <span
                    className="viewnow"
                    onClick={() => {
                      handleOnShowP(taskdetail.info.workSpace);
                    }}
                  >
                    View Now
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="content">
      <div className="tasksdetail">
        <div className="taskheader">
          <h1>
            <input
              className="input_title"
              name="title"
              defaultValue={taskdetail.title}
            />
          </h1>
          <div id="icon_tasks">
            <BsFillPinAngleFill
              className="icons_task"
              style={{ color: taskdetail.pinTask ? "red" : "black" }}
              onClick={() => {
                handleOnpin(taskdetail.id);
              }}
            />
            <BsCheckLg
              className="icons_task"
              style={{
                color: "green",
                display:
                  getColor(taskdetail.TaskTo, taskdetail.status) === "green"
                    ? "none"
                    : "",
              }}
              onClick={() => {
                hangleOnFinish(taskdetail.id);
              }}
            />
            <BsThreeDots
              className="icons_task"
              onClick={() => {
                handleOnShow();
              }}
            />
            <div className="menu_task" id={taskdetail.id}>
              <ul>
                <>
                  <li
                    onClick={() => {
                      onSave(taskdetail.id);
                    }}
                  >
                    Save
                  </li>
                  <li style={{ color: "red" }} onClick={() => handleOnCancel()}>
                    Cancel
                  </li>
                </>
              </ul>
            </div>
            <BsXLg
              className="icons_task"
              onClick={() => {
                setTaskdetail(null);
              }}
            />
          </div>
        </div>
        <div className="taskcontent">
          <div className="left">
            <h3 className="tag">
              Tag:
              <select
                name="tag"
                defaultValue={taskdetail.tagID}
                className="tagh3"
              >
                <option value="">None</option>
                {listTag != null &&
                  listTag.map((tag) => {
                    return <option value={tag.id}>{tag.name}</option>;
                  })}
              </select>
            </h3>
            <h3 className="status">
              Status:
              <span
                style={{
                  color: getColor(taskdetail.taskTo, taskdetail.status),
                  marginLeft: "10px",
                }}
              >
                {getColor(taskdetail.taskTo, taskdetail.status) === "red"
                  ? "Overdue"
                  : getColor(taskdetail.taskTo, taskdetail.status) === "green"
                  ? "Finish"
                  : "To be doing"}
              </span>
            </h3>

            <div className="des">
              <h3>Desctiption</h3>
              <textarea
                className="textare"
                name="descrip"
                defaultValue={taskdetail.description}
                rows={8}
              ></textarea>
            </div>
          </div>
          <div className="right">
            <div className="time_tas">
              <h4>
                From:
                <input
                  className="tagh4"
                  type="date"
                  name="from"
                  defaultValue={changeDate(taskdetail.taskFrom)}
                />
              </h4>
              <h4>
                To:
                <input
                  className="tagh4"
                  type="date"
                  name="to"
                  defaultValue={changeDate(taskdetail.taskTo)}
                />
              </h4>
            </div>
            {taskdetail.info != null && (
              <div className="projectinfo">
                <div>
                  Manager: <span>{taskdetail.info.user}</span>
                </div>
                <div>
                  Section: <span>{taskdetail.info.section}</span>
                </div>
                <div>
                  Project: <span>{taskdetail.info.workSpace}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

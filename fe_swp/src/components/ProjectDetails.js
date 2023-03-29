import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import swal from "sweetalert";
import { FaUserFriends } from "react-icons/fa";
import "../styles/ProjectDetails.css";
import authAxios from "../services/AxiosInstance";
import "../styles/Project.css";
import Section from "./Section";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "28%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const styleList = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
};

function ProjectDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const handleClose = () => setOpen(false);
  const [sections, setSections] = useState();
  const [check, setCheck] = useState(false);
  const [opened, setOpened] = useState(false);
  const [userInWorkSpace, setUserInWorkSpace] = useState();
  const [openListMember, setOpenListMember] = React.useState(false);
  const [tasksInP, setTasksInP] = useState();
  const [idUser, setIdUser] = useState();
  const drag = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("Text", e.target.getAttribute("id"));
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };
  const handleCloseListMember = () => {
    setTaskAss(null);
    setOpenListMember(false);
  };
  const handleOpenListMember = () => setOpenListMember(true);
  const [kicked, setKicked] = React.useState(false);
  const getcolor = (dateTo, status) => {
    const currentDate = new Date();
    const date1 = new Date(dateTo);
    if (status) return "green";
    else {
      if (date1.getTime() >= currentDate.getTime()) return "orange";
      else if (date1.getTime() < currentDate.getTime()) return "red";
    }
  };
  async function kickMemmber(idKicked) {
    console.log(idKicked);
    console.log(props.project.id);
    console.log(localStorage.getItem("id"));
    await authAxios
      .delete(
        `/User/DeleteUserWorkSpace?workSpaceID=${
          props.project.id
        }&userIdDeleted=${idKicked}&userAdminId=${localStorage.getItem("id")}`
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.message != "Request processed successfully") {
          swal("You are not allowed to kick");
        } else {
          swal({
            text: "Kick successfully",
            icon: "success",
          });
        }
        setKicked(!kicked);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
  }
  const [taskAss, setTaskAss] = useState();
  async function assginTask(id) {
    localStorage.setItem("IDDO", id);
    await authAxios
      .get(
        `/Task/GetTaskInWorkSpace?workSpaceID=${
          props.project.id
        }&userID=${localStorage.getItem("id")}`
      )
      .then(function (response) {
        console.log(response.data.data);
        setTaskAss(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleOpen(e) {
    setOpen(true);
  }
  useEffect(() => {
    authAxios
      .get(`/User/Workspace/${props.project.id}`)
      .then(function (response) {
        console.log(response.data.data);
        setUserInWorkSpace(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [kicked, open, props.project]);
  useEffect(() => {
    authAxios
      .get(`/User`)
      .then(function (response) {
        console.log(response.data.data);
        setUsers(
          response.data.data.filter((item) =>
            item.userName.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [searchText]);

  function addSection() {
    setOpened(!opened);
  }
  async function addMemmber() {
    console.log(props.project.id);
    console.log(document.querySelector(".add-member").value);
    await authAxios
      .post(
        `/WorkSpace/AddMember/${props.project.id}?nameUser=${
          document.querySelector(".add-member").value
        }&roleID=2&adminID=${localStorage.getItem("id")}`
      )
      .then(function (response) {
        if (response.data.status == 200) {
          swal({
            text: "Add successfully",
            icon: "success",
          });
        } else {
          swal({
            text: "Add Failed, Please check !!",
            icon: "warning",
          });
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    handleClose();
  }

  async function addSectionApi() {
    document.querySelector(".section_input").style.display = "none";
    await authAxios
      .post(`/Section?userID=${localStorage.getItem("id")}&roleID=1`, {
        workSpaceId: props.project.id,
        title: document.querySelector(".des_section").value,
        describe: document.querySelector(".des_section").value,
        status: false,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCheck(!check);
    setOpened(!opened);
  }

  useEffect(() => {
    authAxios
      .get(`/Section/Workspace/${props.project.id}`)
      .then(function (response) {
        console.log(response.data.data);
        setSections(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [check, props.project]);
  async function assginThisTaskTo(idTask) {
    // /Task/AddMemberIntoTask/38?userID=1&roleID=2&adminID=26
    await authAxios
      .post(
        `/Task/AddMemberIntoTask/${idTask}?userID=${localStorage.getItem(
          "IDDO"
        )}&roleID=2&adminID=${localStorage.getItem("id")}`
      )
      .then(function (response) {
        swal("Assign Successfully");
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setTaskAss(null);
  }
  const showTaskInWs = (id, index) => {
    // let a = document.getElementById(id + "listtask");
    let list = document.getElementsByClassName("listTaskOfM");
    for (let i = 0; i < list.length; i++) {
      if (i != index) {
        list[i].style.display = "none";
      } else list[i].style.display = "block";
    }
    setIdUser(id);
  };
  //get Task by Id member
  useEffect(() => {
    authAxios
      .get(`/Task/AssignedTasks/${idUser}?workspaceID=${props.project.id}`)
      .then(function (response) {
        console.log(response.data.data);
        setTasksInP(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [idUser]);

  return (
    <div className="project_component">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              marginBottom: "1vh",
              color: "white",
              backgroundColor: "rgb(116 113 92)",
              padding: "5px 20px",
              borderRadius: "20px",
            }}
          >
            {props.project.name}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "22px",
            width: "12vw",
          }}
        >
          <div
            className="btn_share kick"
            onClick={() => handleOpenListMember()}
          >
            <FaUserFriends></FaUserFriends>
          </div>
          <div className="btn_share add" onClick={(e) => handleOpen(e)}>
            <AiOutlinePlus></AiOutlinePlus>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={{ marginBottom: "20px" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Member
                </Typography>
              </div>
              <div style={{ display: "flex" }}>
                <input
                  style={{ width: "100%", padding: "0px 20px" }}
                  placeholder="Username"
                  class="add-member"
                  onChange={(e) => setSearchText(e.target.value)}
                ></input>
                <Button onClick={() => addMemmber()}>Add </Button>
              </div>

              {users != null && (
                <div
                  style={{
                    width: "270px",
                    height: "130px",
                    overflowY: "auto",
                    backgroundColor: "white",
                    borderRadius: " 0 0 5px 5px",
                    border: "1px solid gray",
                  }}
                  className="modal_add_member"
                >
                  <ul>
                    {users != null &&
                      users.map((u) => (
                        <li
                          onClick={() => {
                            document.querySelector(".add-member").value =
                              u.userName;
                          }}
                          key={u.id}
                        >
                          {u.userName}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </Box>
          </Modal>
          <Modal
            open={openListMember}
            onClose={handleCloseListMember}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleList}>
              {users != null && taskAss == null && (
                <div
                  style={{
                    marginTop: "2vh",
                    padding: "2vh 2vw",
                    width: "100%",
                    height: "fit-content",
                    overflowY: "auto",
                    backgroundColor: "white",
                    borderRadius: " 5px",
                    border: "1px solid gray",
                    maxHeight: "76vh",
                  }}
                  className="modal_add_member"
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h2"
                  >
                    Member
                  </Typography>
                  {userInWorkSpace != null &&
                    userInWorkSpace.map((u, index) => (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "2px 0",
                            position: "relative",
                          }}
                          key={u.id}
                        >
                          <div
                            onClick={() => {
                              showTaskInWs(u.id, index);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              {u.userName}
                            </span>
                          </div>

                          <div>
                            <Button onClick={() => assginTask(u.id)}>
                              Assign Task
                            </Button>
                            <Button onClick={() => kickMemmber(u.id)}>
                              Kick member
                            </Button>
                          </div>
                        </div>
                        <div className="listTaskOfM">
                          <ul>
                            {tasksInP == null || tasksInP.length == 0 ? (
                              <li>Not have Task</li>
                            ) : (
                              <>
                                {tasksInP != null &&
                                  tasksInP.map((task) => {
                                    return (
                                      <li style={{}}>
                                        <h5>{task.title}</h5>
                                        <p>
                                          Status:{" "}
                                          <span
                                            style={{
                                              color: getcolor(
                                                task.taskTo,
                                                task.status
                                              ),
                                            }}
                                          >
                                            {getcolor(
                                              task.taskTo,
                                              task.status
                                            ) === "red"
                                              ? "Overdue"
                                              : getcolor(
                                                  task.taskTo,
                                                  task.status
                                                ) === "green"
                                              ? "Finish"
                                              : "To be doing"}
                                          </span>
                                        </p>
                                      </li>
                                    );
                                  })}
                              </>
                            )}
                          </ul>
                        </div>
                      </>
                    ))}
                </div>
              )}
              {taskAss != null && (
                <div
                  style={{
                    cursor: "pointer",
                    marginTop: "2vh",
                    padding: "2vh 2vw",
                    width: "100%",
                    height: "fit-content",
                    overflowY: "auto",
                    backgroundColor: "white",
                    borderRadius: " 5px",
                    border: "1px solid gray",
                  }}
                  className="modal_add_member"
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Task In Project
                  </Typography>
                  {taskAss != null &&
                    taskAss.map((u) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "2px 0",
                        }}
                        key={u.id}
                      >
                        <div> {u.title}</div>
                        <div>
                          <Button onClick={() => assginThisTaskTo(u.id)}>
                            Assign This
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Box>
          </Modal>
        </div>
      </div>

      <div className="Create_section">
        {sections != null &&
          sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              check={check}
              setCheck={setCheck}
              drag={drag}
            ></Section>
          ))}
        <div className="section_base">
          <div className="section_name">Name section</div>
          <div className="section_task">
            <div onClick={() => addSection()} className="section_btnAdd">
              {opened ? "X" : <AiOutlinePlus size="30px"></AiOutlinePlus>}
            </div>
          </div>
        </div>
        {opened && (
          <div className="section_input">
            <div className="section_in">
              <div className="section_name">
                <input
                  autoFocus="true"
                  name="data"
                  className="des_section"
                ></input>
                <button onClick={() => addSectionApi()}>Add</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;

import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import ModalCreateProject from "../components/ModalCreateProject";
import "../styles/Project.css";
import authAxios from "../services/AxiosInstance";
import ProjectDetails from "./../components/ProjectDetails";

function Project(props) {
  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState();
  const project = props.project;
  const setProject = props.setProject;
  useEffect(() => {
    authAxios
      .get(`/WorkSpace/user/${localStorage.getItem("id")}`)
      .then(function (response) {
        console.log(response.data.data);
        // const data = response.data.data.sort((a, b) => b.id - a.id);
        setProjects(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [openModal]);
  function openProject(project) {
    console.log(project);
    setProject(project);
  }
  return project == null ? (
    <div className='project_component'>
      <div style={{}}>
        <h1 style={{ marginBottom: "3vh", color: "white" }}>Your Project</h1>
        <p style={{ color: "yellow" }}>Create new project </p>
      </div>
      <div className='big_btns'>
        <div
          className='big_btn'
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          <div>
            <AiOutlinePlus size='30px'></AiOutlinePlus>
          </div>
          <div> Create empty project</div>
        </div>
        <ModalCreateProject
          openModal={openModal}
          setOpenModal={setOpenModal}
        ></ModalCreateProject>
        <div className='big_btn'>
          <div>
            <BsFillPencilFill size='25px'></BsFillPencilFill>
          </div>
          <div>Use Template</div>
        </div>
      </div>
      <div style={{ marginTop: "5vh" }}>
        <p>Your Project</p>
        {/* map */}
        <div className='your_pr'>
          {projects != null &&
            projects.map((project) => (
              <div
                className='project'
                onClick={() => openProject(project)}
                key={project.id}
              >
                <div className='project_img'></div>
                <div className='project_title'> {project.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <ProjectDetails project={project} />
  );
}

export default Project;

import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import authAxios from "../services/AxiosInstance";
import "../styles/Modal.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const ModalCreateProject = (props) => {
  const openModal = props.openModal;
  const setOpenModal = props.setOpenModal;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  async function handleSubmitModal() {
    await authAxios
      .post(`/WorkSpace?userID=${localStorage.getItem("id")}&roleID=1`, {
        name: name,
        describe: description,
      })
      .then(function (response) {
        console.log(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
      })
      .catch(function (error) {
        console.log(error);
        localStorage.removeItem("token");
      });
    handleCloseModal();
  }

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };
  const handleOnChangeDes = (event) => {
    setDescription(event.target.value);
  };
  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ ...style, borderRadius: 3 }}>
          <h2 id='modal-header'>New Project</h2>
          <div id='modal-content'>
            <div className='name'>
              <TextField
                fullwidth='true'
                sx={{ width: "100%" }}
                type='text'
                label='Name'
                variant='outlined'
                onChange={(event) => handleOnChangeName(event)}
              />
            </div>
            <div className='description'>
              <TextField
                fullwidth='true'
                sx={{ width: "100%" }}
                type='text'
                label='Description'
                variant='outlined'
                multiline
                maxRows={5}
                rows={5}
                onChange={(event) => handleOnChangeDes(event)}
              />
            </div>
          </div>
          <div id='modal-footer'>
            <Button
              variant='outlined'
              color='error'
              onClick={handleCloseModal}
              sx={{ margin: "0 20px" }}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              disabled={name === "" ? true : false}
              onClick={() => {
                handleSubmitModal();
              }}
            >
              Create
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ModalCreateProject;

import { List, ListItemButton, ListItemText } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const DisplayProject = (props) => {
  const listProject = props.listProject;
  const handleDeleteProject = props.handleDeleteProject;
  const handleActive = props.handleActive;
  const setProject = props.setProject;
  const setContent = props.setContent;
  const showProject =
    listProject != null &&
    listProject.map((element, index) => {
      return (
        <ListItemButton
          sx={{ pl: 8, color: "#645d5d" }}
          key={element.name}
          className="listitems"
          onClick={() => {
            handleActive(index, "listitems", "link");
            setProject(element);
            setContent(3);
          }}
        >
          <ListItemText primary={element.name} />
        </ListItemButton>
      );
    });

  return (
    <>
      <List component="div" disablePadding>
        {showProject}
      </List>
    </>
  );
};
export default DisplayProject;

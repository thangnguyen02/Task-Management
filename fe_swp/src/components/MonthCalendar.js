import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TableCalendar from "../components/TableCalendar.js";
import TaskListPickDay from "../components/TaskListPickDay.js";
import dayjs from "dayjs";

const Calendar = (props) => {
  const [dayObj, setDayObj] = useState(dayjs());

  return (
    <div className="calendar">
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={5}>
          <TableCalendar dayObj={dayObj} setDayObj={setDayObj} />
        </Grid>
        <Grid xs={1}>{/* {dayObj.format('YYYY-MM-DD')} */}</Grid>
        <Grid xs={4}>
          <TaskListPickDay
            setTaskdetail={props.setTaskdetail}
            setContent={props.setContent}
            handleActive={props.handleActive}
            daystring={dayObj.format("YYYY-MM-DD")}
          />
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
};
export default Calendar;

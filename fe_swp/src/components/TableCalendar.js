import React, { useState } from "react";
import dayjs from "dayjs";
import range from "lodash/range";
import "../styles/TableCalendar.css";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const todayObj = dayjs()

const Calendar = (props) => {

  const dayObj = props.dayObj;
  const setDayObj = props.setDayObj;
  const thisYear = dayObj.year()
  const thisMonth = dayObj.month() // (January as 0, December as 11)
  const daysInMonth = dayObj.daysInMonth()

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
  const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
  const weekDayOfLast = dayObjOfLast.day()
  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"))
  }

  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"))
  }

  const handleDateChange = (day) => {
    const newDate = dayObj.date(day);
    setDayObj(newDate);
  };
  return (
    <div className="TableCalendar">
      <div className="header-TableCalendar">
        <button type="button" className="nav nav--prev" onClick={handlePrev}>
          &lt;
        </button>
        <div className="datetime">{dayObj.format("MMM DD YYYY")}</div>
        <button type="button" className="nav nav--prev" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="week-container">
        {weekDays.map(d => (
          <div className="week-cell" key={d}>
            {d}
          </div>
        ))}
      </div>
      <div className="day-container"  >
        {range(weekDayOf1).map(i => (
          <div className="day-cell day-cell--faded" key={i}>
            {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
          </div>
        ))}
        {range(daysInMonth).map(i => (
          <div 
            className={`day-cell day-cell--in-month${
                i + 1 === dayObj.date() &&
                thisMonth === dayObj.month() &&
                thisYear === dayObj.year()
                ?
                " day-cell--picking"
                : 
                i + 1 === todayObj.date() &&
                thisMonth === todayObj.month() &&
                thisYear === todayObj.year()
                ?
                " day-cell--today"
                :
                ""
              }`}
            key={i}
            onClick={() => handleDateChange(i + 1)}
          >
            {i + 1}
          </div>
        ))}

        {range(6 - weekDayOfLast).map(i => (
          <div className="day-cell day-cell--faded" key={i}>
            {dayObjOfLast.add(i + 1, "day").date()}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
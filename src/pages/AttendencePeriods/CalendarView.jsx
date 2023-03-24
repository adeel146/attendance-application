import React from "react";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
 

const CalendarView = ({ data }) => {
  const dataevents = data?.map((obj, index) => {
    const { courseName, teacherName, startDate, endDate } = obj;
    return {
      id: index,
      title: `${courseName} (${teacherName})`,
      start: startDate,
      end: endDate,
    };
  });

  return (
    <>
      <div className="Header">
        <div className="title">
          <h3>Period Detail Calendar view</h3>
        </div>
      </div>
      <FullCalendar
        headerToolbar={{
          left: "",
          center: "",
          right: "",
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        allDaySlot={false}
        events={dataevents}
      />
    </>
  );
};
export default CalendarView;

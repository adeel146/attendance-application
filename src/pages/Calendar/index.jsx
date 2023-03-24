import React, { useMemo, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import CommonDropDown from "../../Components/CommonComponents/CommonDropdown";
import { weekList } from "../../constants/constants";
import AddEventModal from "../../Modals/AddEventModals";
import { addOffDays, getCalendarList } from "../../services/CalendarServices";
import { getSchoolList } from "../../services/schoolServices";

function Calendar() {
  const [addeventModal, setaddeventModal] = useState(false);
  const [dataObj, setdataObj] = useState({});
  const [disableDays, setdisableDays] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [schoolId, setSchoolId] = useState();
  const [offDaysList, setOffDaysList] = useState();
  const [calendarEvents, setcalendarEvents] = useState([]);
  console.log(currentDate, "currentDate");

  const {
    data: CalendarList,
    refetch: refetchCalendar,
    isFetching: loadingDays,
  } = useQuery({
    queryKey: ["calendarList", , { currentDate, schoolId }],
    queryFn: () =>
      getCalendarList({
        start_date: currentDate?.startStr?.slice(0, 10),
        end_date: currentDate?.endStr?.slice(0, 10),
        schoolId,
      }),
    onSuccess: (data) => {
      if (data.success) {
        const offDays = weekList.filter((obj) =>
          data.data.offDays.includes(obj.value)
        );
        console.log(offDays, "offDays");
        setOffDaysList(offDays);
        setcalendarEvents([
          ...data.data.calenderDays,
          {
            daysOfWeek: data.data.offDays,
            display: "background",
            backgroundColor: "darkgrey",
          },
        ]);
      } else {
        toast.error(data.message);
      }
    },
    refetchOnWindowFocus: false,
    enabled: schoolId && currentDate ? true : false,
  });

  console.log(calendarEvents, "calendarEvents");

  const { mutate: handleAddOffDays, isLoading } = useMutation({
    mutationKey: "addOffDays",
    mutationFn: (data) => addOffDays(data),
    onSuccess: (data) => {
      if (data.success) {
        refetchCalendar();
      } else {
        toast.error(data.message);
      }
    },
  });

  const { data: SchoolList } = useQuery({
    queryKey: ["getSchoolList"],
    queryFn: getSchoolList,
    select: (res) =>
      res.data.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      }),
    refetchOnWindowFocus: false,
  });

  let events = [
    {
      daysOfWeek: disableDays,
      display: "background",
      backgroundColor: "darkgrey",
    },
    { title: "event 2", start: "2023-02-02", fullday: true },
    { title: "event 2", start: "2023-02-03", end: "2023-02-03", fullday: true },
    {
      title: "event 2",
      start: "2023-02-10",
      end: "2023-02-10",
      backgroundColor: "green",
    },
    {
      title: "event 3",
      start: "2023-02-11",
      end: "2023-02-13",
    },
    { title: "event 2", start: "2023-02-04", end: "2023-02-10", fullday: true },
  ];
  // console.log(
  //   [...CalendarList?.data?.calenderDays],
  //   "CalendarList?.data?.calenderDays"
  // );
  // const memoizedEventsFn = useMemo(() => {
  //   return CalendarList && [...CalendarList?.data?.calenderDays];
  // }, [disableDays, CalendarList]);

  const handleDateClick = (arg) => {
    console.log(arg.start.getDate(), "arg");
    setdataObj(arg);
    setaddeventModal(true);
  };

  function isWeekend(date1, date2) {
    var d1 = new Date(date1),
      d2 = new Date(date2),
      isWeekend = false;

    while (d1 < d2) {
      var day = d1.getDay();
      isWeekend = disableDays?.includes(day);
      if (isWeekend) {
        return true;
      } // return immediately if weekend found
      d1.setDate(d1.getDate() + 1);
    }
    return false;
  }

  const handleSelect = (select) => {
    console.log(select, "select");
    if (CalendarList?.data?.offDays?.includes(select.start.getDay())) {
      toast.error("Off Days Not Allowed!");
      return;
    } else {
      setdataObj(select);
      setaddeventModal(true);
    }
    // if (isWeekend(select.startStr, select.endStr)) {
    //   toast.error("Off Days Not Allowed!");
    //   return;
    // }
  };

  const eventoverllap = (arg) => {
    console.log(arg, "eventoverllap");
  };

  const handleSelectAllow = (arg) => {
    console.log(arg, "handleSelectAllow");
  };

  const handleDisableDays = (data) => {
    console.log(data, "data");
    let result = data.map((obj) => obj.value);
    handleAddOffDays({ days: result, school_Id: schoolId });
  };

  const addEvent = (event) => {
    events.push(event);
  };

  return (
    <>
      <Toaster />
      {addeventModal && (
        <AddEventModal
          isOpen={addeventModal}
          handleClose={() => setaddeventModal(false)}
          obj={dataObj}
          refetchCalendar={refetchCalendar}
          school_Id={schoolId}
        />
      )}
      <div className="container mx-10">
        <div className="flex p-4 justifPy-center ">
          <div className="min-w-[15%] mr-4">
            <label>Select School</label>
            <CommonDropDown
              placeholder="Select School"
              list={SchoolList}
              onChange={(e) => setSchoolId(e.value)}
            />
          </div>
          <div className="min-w-[15%] mr-4">
            <label>Select off Days</label>
            <CommonDropDown
              placeholder="Select off Days"
              isMulti={true}
              list={weekList}
              onChange={handleDisableDays}
              isDisabled={!schoolId}
              value={offDaysList}
              isLoading={isLoading || loadingDays}
            />
          </div>
        </div>
        <div className="w-[90%] ">
          <FullCalendar
            fullday={false}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            // dateClick={handleDateClick}
            events={calendarEvents}
            selectable={true}
            select={handleSelect}
            dragScroll={true}
            eventOverlap={eventoverllap}
            datesSet={(date) => {
              setCurrentDate(date);
            }}

            // weekends={false}
            // selectAllow={handleSelectAllow}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;

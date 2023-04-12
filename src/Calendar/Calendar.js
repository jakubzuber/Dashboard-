import FullCalendar from "@fullcalendar/react";
import daygrid from "@fullcalendar/daygrid";
import { StyledCalendar } from './styled'
import { /*useDispatch,*/ useSelector } from "react-redux";
//import { useEffect } from "react";
import { /*fetchCalendarData,*/ selectCalendarInfo } from "./calendarSlice";

const CalendarSite = () => {
  const { calendar } = useSelector(selectCalendarInfo)
/*
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCalendarData())
  }, [dispatch])
*/
  return (
    <StyledCalendar>
      <FullCalendar
        locale={{
          code: 'pl',
          week: {
            dow: 1,
            doy: 4, // The week that contains Jan 4th is the first week of the year.
          },
          buttonText: {
            prev: 'Poprzedni',
            next: 'Następny',
            today: 'Dziś',
            year: 'Rok',
            month: 'Miesiąc',
            week: 'Tydzień',
            day: 'Dzień',
            list: 'Plan dnia',
          },
          weekText: 'Tydz',
          allDayText: 'Cały dzień',
          moreLinkText: 'więcej',
          noEventsText: 'Brak wydarzeń do wyświetlenia',
        }}
        events={calendar}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[daygrid]}
        initialView={"dayGridWeek"}
        eventDisplay={"block"}
        eventOrder={"ORD"}
        //views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
    </StyledCalendar>
  )
}

export default CalendarSite;




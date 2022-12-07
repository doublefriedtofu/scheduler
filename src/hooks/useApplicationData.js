import { useState } from 'react';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  
  const setDay = day => setState({ ...state, day });
  // GETS APPT FOR THE GIVEN DAY
  const appointments = getAppointmentsForDay(state, state.day);
  // GETS INTERVIEWERS FOR THE GIVEN DAY
  const interviewers = getInterviewersForDay(state, state.day);

  return {state: state, }
}

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(dayName => dayName.name === day);
  const filteredAppointments = state.appointments;

  const foundAppt = [];

  if (filteredDays.length) {
    const appointments = filteredDays[0].appointments;

    for (const appt of appointments) {
      if (appt in filteredAppointments) {
        foundAppt.push(filteredAppointments[appt]);
      }
    }
  }
  return foundAppt;
}


export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(dayName => dayName.name === day);
  const filteredInterviewers = state.interviewers;

  const foundInterviewers = [];

  if (filteredDays.length) {
    const interviewers = filteredDays[0].interviewers;

    for (const selectedInterviewers of interviewers) {
      if (selectedInterviewers in filteredInterviewers) {
        foundInterviewers.push(filteredInterviewers[selectedInterviewers]);
      }
    }
  }
  console.log(foundInterviewers)
  return foundInterviewers;
}


export function getInterview(state, interview) {
  if (interview) {
    const interviewerID = interview.interviewer;
    const foundIntereviews = { ...interview, interviewer: state['interviewers'][interviewerID] };
    return foundIntereviews;
  } else {
    return null;
  }
}

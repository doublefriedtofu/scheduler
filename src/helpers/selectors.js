export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(dayName => dayName.name === day);
  const filteredAppointments = state.appointments;

  const foundAppt = [];
  
  if(filteredDays.length) {
    const appointments = filteredDays[0].appointments
    
    for (const appt of appointments) {
      if(appt in filteredAppointments) {
        foundAppt.push(filteredAppointments[appt])
      }
    }
  }
    
    // const appointments = filteredDays[0].appointments; // [4, 5]
    
    // const filteredAppointments = state.appointments.filter(appt => appt === 1);
    
    
    
    return foundAppt  
}
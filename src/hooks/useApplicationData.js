import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentURL = `http://localhost:8001/api/appointments`;
    const interviewersURL = `http://localhost:8001/api/interviewers`;

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      });
  }, []);

  // function to update Spots count
  const updateSpots = (state, appointments, id) => {
    // find the days
    const dayObj = state.days.find(value => value.name === state.day);
    // const index = state.days.findIndex(value => value.name === state.day);

    let spots = 0;
    // iterate the appointment IDs in that day
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (appointment.interview === null) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };
    const newDays = state.days.map((d) => {
      return d.name === state.day ? day : d;
    });
    return newDays;
  };


  // FUNCTION SAVES INPUT DATA INTO STATE
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments, days: updateSpots(state, appointments, id) }));
  };

  // FUNCTION DELETE
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days: updateSpots(state, appointments, id) }));
  };




  return { state: state, setDay: setDay, bookInterview: bookInterview, cancelInterview: cancelInterview };
}

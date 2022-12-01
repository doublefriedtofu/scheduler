import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';


export default function Appointment(props) {
  const { id, time, interview } = props;

  return (
    <article className="appointment">
      <Header time={time}>
      </Header>
      {interview && <Show student={interview.student} interviewers={interview.interviewer} />}
      {!interview && <Empty />}
    </article>
  );
}
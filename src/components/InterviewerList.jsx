import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem'

export default function InterviewerList(props) {

  const { value, interviewers, onChange} = props;

  const interviewerListItem = interviewers.map((e) => {
    return (
      <InterviewerListItem
      key={e.id}
      name={e.name}
      avatar={e.avatar}
      selected={value === e.id}
      setInterviewer={() => onChange(e.id)}
      />
    );
  });


  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItem}</ul>
    </section>
  );
}
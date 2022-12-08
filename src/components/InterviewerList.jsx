import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const { value, interviewers, onChange } = props;



  const interviewerListItem = interviewers.map((interviewer) => {
    const newValue = typeof value === "object" && value !== null ? value.id : value;

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={newValue === interviewer.id}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  });

  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItem}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

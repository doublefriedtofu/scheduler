import React from 'react';

import "components/InterviewerListItem.scss";
import classNames from 'classnames';

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer } = props;

  const intereviewerClass = (selected) => {
    return selected ? "interviewers__item--selected" : "interviewers__item";
  };

  const showInterviewerName = (selected) => {
    return selected ? name : null;
  };

  return (
    <li className={intereviewerClass(selected)} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {showInterviewerName(selected)}
    </li>
  );
}
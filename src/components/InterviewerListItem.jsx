import React from 'react';

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const { name, avatar, selected, setInterviewer } = props;

  const intereviewerClass = (selected) => {
    return selected ? "interviewers__item--selected" : "interviewers__item";
  };

  return (
    <li className={intereviewerClass(selected)} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}
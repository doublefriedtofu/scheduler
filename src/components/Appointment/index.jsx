import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import { action } from '@storybook/addon-actions';


export default function Appointment(props) {
  const { id, time, interview, interviewers } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={time}>
      </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewers={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={action("onSave")}
          onCancel={() => back(EMPTY)}
        />
      )}
    </article>
  );
}
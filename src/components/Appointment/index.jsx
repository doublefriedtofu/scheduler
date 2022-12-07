import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';


export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview  } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  // SAVES A NEW INTERVIEW APPOINTMENT
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // indicates it's saving
    transition(SAVING);
    // saves and shows the new appointment
    bookInterview(id, interview).then(() => transition(SHOW));
  }

  // FUNCTION DELETES THE INTERVIEW APPOINTMENT
  function toDelete() {
    transition(DELETING);
    cancelInterview(id).then(() => transition(EMPTY));
  }

  // FUNCTION EDITS THE INTERVIEW APPOINTMENT
  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={time}>
      </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewers={interview.interviewer}
          onDelete={toDelete}
          onEdit={edit}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="deleting" />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back(SHOW)}
        />
      )}
    </article>
  );
}
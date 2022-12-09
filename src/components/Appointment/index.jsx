import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Error from './Error';
import Confirm from './Confirm';


export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";


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
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  // FUNCTION DELETES THE INTERVIEW APPOINTMENT
  function toDelete() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  // FUNCTION EDITS THE INTERVIEW APPOINTMENT
  function edit() {
    transition(EDIT);
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time}>
      </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewers={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure about this?"
          onConfirm={toDelete}
          onCancel={() => back()}
        />
      )}
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
      {mode === ERROR_SAVE && (
        <Error
          message={"SERVER ERROR: Cannot save. Please try again later."}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"SERVER ERROR: Cannot delete. Please try again later."}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
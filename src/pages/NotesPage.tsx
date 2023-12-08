import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { showMessage } from "../utils/tools";
import { SnackbarProvider } from "notistack";
import Notes from "../components/Notes";
import { getNotes } from "../api/notes";
import { Note } from "../types/user";

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      showMessage(location.state.message, location.state.type);
      location.state = null;
    }
  }, [location]);

  useEffect(() => {
    const resp = getNotes();
    if (!resp || !resp.data) {
      navigate("/login");
      return;
    }
    setNotes(resp.data);
  }, [refresh]);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const onCancelAdd = () => {
    setIsEditing(false);
  };

  return (
    <SnackbarProvider maxSnack={1}>
      <div className="flex flex-col items-center py-10 gap-5">
        <button
          disabled={isEditing}
          className="btn btn-neutral w-[600px] text-white"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Add New Note
        </button>
        {isEditing && (
          <Notes
            title=""
            content=""
            id={Date.now().toString()}
            createModel={true}
            onCancelAdd={onCancelAdd}
            triggerRefresh={triggerRefresh}
          />
        )}
        {notes.map((note, i) => (
          <Notes
            key={note.id}
            title={note.title}
            content={note.content}
            id={note.id}
            createModel={false}
            triggerRefresh={triggerRefresh}
          />
        ))}

        {/* <Notes
          title="test"
          content="dhohwe weriqwr weqrhqwoi erqweorhwoir ewqhroqw eqworhoewr iewqorqhwq eoiqwhr ewoqhre eihrqow ddjqewoir werhoqwh ewqrihwoqi ewrewqrohwoi erqwoh"
        />
        <Notes
          title="test"
          content="dhohwe weriqwr weqrhqwoi erqweorhwoir ewqhroqw eqworhoewr iewqorqhwq eoiqwhr ewoqhre eihrqow ddjqewoir werhoqwh ewqrihwoqi ewrewqrohwoi erqwoh"
        />
        <Notes
          title="test"
          content="dhohwe weriqwr weqrhqwoi erqweorhwoir ewqhroqw eqworhoewr iewqorqhwq eoiqwhr ewoqhre eihrqow ddjqewoir werhoqwh ewqrihwoqi ewrewqrohwoi erqwoh"
        /> */}
      </div>
    </SnackbarProvider>
  );
};

export default NotesPage;

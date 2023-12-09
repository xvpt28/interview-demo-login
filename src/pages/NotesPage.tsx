// package imports
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { SnackbarProvider } from "notistack";
import { useSelector, useDispatch } from "react-redux";

// modules imports
import { showMessage } from "../utils/tools";
import Notes from "../components/Notes";
import { logout } from "../api/user";
import useBoolean from "../hooks/use-Boolean";
import { removeUser } from "../redux/slices/userSlice";
import { getNotesApi } from "../api/notes";
import { setNotes } from "../redux/slices/noteSlice";
import { Note } from "../types/user";
import { AppDispatch } from "../redux/store";

const NotesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const store = useSelector((state: any) => state.notes);

  const notes: Note[] = store.notes;

  const edit = useBoolean(false);

  const reRender = useBoolean(false);

  const location = useLocation();

  const navigate = useNavigate();

  // Monitor message and show it
  useEffect(() => {
    if (location.state) {
      showMessage(location.state.message, location.state.type);
      location.state = null;
    }
  }, [location]);

  // Get notes
  useEffect(() => {
    const resp = getNotesApi();

    if (!resp || !resp.data) {
      navigate("/login");
      return;
    }
    dispatch(setNotes(resp.data));
  }, [reRender.value]);

  const onLogout = async () => {
    logout();
    dispatch(removeUser());
    navigate("/login", {
      state: { message: "Logout Successful", type: "info" },
    });
  };

  //--------------------------------------------------------------
  // Handle views
  //--------------------------------------------------------------
  const renderButton = (
    <div className="w-[600px] flex gap-3">
      <button
        disabled={edit.value}
        className="btn btn-neutral w-[500px] text-white"
        onClick={edit.setTrue}
      >
        Add New Note
      </button>
      <button className="btn btn-outline flex-grow" onClick={onLogout}>
        Logout
      </button>
    </div>
  );

  const renderEditNote = edit.value && (
    <Notes
      title=""
      content=""
      id={Date.now().toString()}
      createModel={true}
      onCancelAdd={edit.setFalse}
      triggerRefresh={reRender.toggle}
    />
  );

  const renderNotes = notes.map((note, i) => (
    <Notes
      key={note.id}
      title={note.title}
      content={note.content}
      id={note.id}
      createModel={false}
      triggerRefresh={reRender.toggle}
    />
  ));

  return (
    <SnackbarProvider maxSnack={1}>
      <div className="flex flex-col items-center py-20 gap-5">
        {renderButton}
        {renderEditNote}
        {renderNotes}
      </div>
    </SnackbarProvider>
  );
};

export default NotesPage;

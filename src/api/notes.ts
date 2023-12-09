import { Note } from "../types/user";

// this data should be stored and fetch from server side

export function getNotesApi() {
  const user = localStorage.getItem("token");
  if (!user) {
    return {
      code: 401,
      message: "Login expired",
      data: null,
    };
  }
  const notes: Note[] = JSON.parse(localStorage.getItem(user) || "[]");
  return {
    code: 200,
    message: "success",
    data: notes,
  };
}

export function addNotesApi(note: Note) {
  const user = localStorage.getItem("token");
  if (!user) {
    return {
      code: 401,
      message: "Login expired",
      data: null,
    };
  }
  const notes: Note[] = JSON.parse(localStorage.getItem(user) || "[]");
  notes.unshift(note);
  localStorage.setItem(user, JSON.stringify(notes));
  return {
    code: 200,
    message: "success",
    data: null,
  };
}

export function deleteNotesApi(id: string) {
  const user = localStorage.getItem("token");
  if (!user) {
    return {
      code: 401,
      message: "Login expired",
      data: null,
    };
  }
  const notes: Note[] = JSON.parse(localStorage.getItem(user) || "[]");
  const index = notes.findIndex((note) => note.id === id);
  notes.splice(index, 1);
  localStorage.setItem(user, JSON.stringify(notes));
  return {
    code: 200,
    message: "success",
    data: null,
  };
}

export function updateNotesApi(note: Note, id: string) {
  const user = localStorage.getItem("token");
  if (!user) {
    return {
      code: 401,
      message: "Login expired",
      data: null,
    };
  }
  const notes: Note[] = JSON.parse(localStorage.getItem(user) || "[]");
  const index = notes.findIndex((note) => note.id === id);
  notes.splice(index, 1, note);
  localStorage.setItem(user, JSON.stringify(notes));
  return {
    code: 200,
    message: "success",
    data: null,
  };
}

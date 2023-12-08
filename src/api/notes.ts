import { Note } from "../types/user";

export function getNotes() {
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

export function addNotes(note: Note) {
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

export function deleteNotes(id: string) {
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

export function updateNotes(note: Note, id: string) {
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
  console.log(index);
  notes.splice(index, 1, note);
  console.log(notes);
  localStorage.setItem(user, JSON.stringify(notes));
  return {
    code: 200,
    message: "success",
    data: null,
  };
}

const { expect } = require("@jest/globals");
const Database = require("../server/database");
const fs = require('fs');

jest.mock('fs') 

test("Can instantiate Database instance", () => {
    // add some sample data (mocked)
    fs.readFileSync = jest.fn().mockReturnValue("[{\"title\":\"a\", \"text\":\"b\"}]");
    const e = new Database();
    let notes = e.getNotes();
    let note = notes[0];
    expect(note.title).toBe('a');
    //expect(e.getNotes()).toHaveLength();
});

test("Can save note to notesArr", () => {
    fs.readFileSync = jest.fn().mockReturnValue("[]");
    const e = new Database();
    e.saveNote({title:'', text: ''});
    let notes = e.getNotes();
    expect(notes.length).toBe(1);
});

test("Can delete note", () => {
    fs.readFileSync = jest.fn().mockReturnValue("[{\"title\":\"a\", \"text\":\"b\"}]");
    const e = new Database();
    let notes = e.getNotes();
    let note = notes[0];
    e.deleteNote(note)
    expect(notes).toHaveLength(0);
});

test("Can find note index", () => {
    fs.readFileSync = jest.fn().mockReturnValue("[{\"title\":\"a\", \"text\":\"b\"}]");
    const e = new Database();
    let notes = e.getNotes({title:'', text:''});
    let note = notes[0];
    e.findNoteIndex(note)
    expect(e.findNoteIndex(note)).toBe(0);
});

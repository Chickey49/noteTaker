const { expect } = require("@jest/globals");
const Database = require("../server/database");
const fs = require('fs');
jest.mock('fs');

const mockValue = "[{\"title\":\"a\", \"text\":\"b\",\"id\":1}]"

test("Can instantiate Database instance", () => {
    fs.readFileSync = jest.fn().mockReturnValue(mockValue);
    const e = new Database();
    let notes = e.getNotes();
    let note = notes[0];
    expect(note.title).toBe('a');
});

test("Can save note to notesArr", () => {
    fs.readFileSync = jest.fn().mockReturnValue("[]");
    const e = new Database();
    e.saveNote({title:'', text: '', id: 1});
    let notes = e.getNotes();
    expect(notes.length).toBe(1);
});

test("Can delete note", () => {
    fs.readFileSync = jest.fn().mockReturnValue(mockValue);
    const e = new Database();
    let notes = e.getNotes();
    let note = notes[0];
    e.deleteNote(note.id);
    expect(notes).toHaveLength(0);
});

test("Can find note index", () => {
    fs.readFileSync = jest.fn().mockReturnValue(mockValue);
    const e = new Database();
    let notes = e.getNotes({title:'', text:'', id: 1});
    let note = notes[0];
    e.findNoteIndex(note)
    expect(e.findNoteIndex(note)).toBe(0);
});

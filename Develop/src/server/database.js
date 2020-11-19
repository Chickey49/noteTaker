const fs = require('fs');
const path = require('path');
class Database {
    constructor() {
        this.dbPath = path.join(__dirname, "../../db/database.json");
        this.notes = this.readNotes();        
    }
    readNotes() {
        let data = fs.readFileSync(this.dbPath);
        let arr = JSON.parse(data);
        if (arr == null) {
            arr = [];
        }
        return arr;
    }
    saveNote(note) {
        if (note === null) {
            console.log("note is null");
            return;
        }
        const index = this.findNoteIndex(note);
        if (index === -1) {
            // add new one
            this.notes.push(note);
        } else {
            // found existing, so update it.
            this.notes[index] = note;
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(this.notes));
    }
    deleteNote(note) {
        // search the notes arr for the matching note title
        if (note === null) {
            console.log("note is null");
            return;
        }
        const index = this.findNoteIndex(note);
        if (index === -1) {
            console.log("could not find note");
        } else {
            this.notes.splice(index, 1);
            fs.writeFileSync(this.dbPath, JSON.stringify(this.notes));
        }
    }
    findNoteIndex(note) {
        return this.notes.findIndex(element => element.title.toLowerCase() == note.title.toLowerCase());
    }
    getNotes(){
        return this.notes;
    }
}
module.exports = Database;
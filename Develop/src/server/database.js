const { EACCES } = require('constants');
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
            throw new Error("InvalidParameter");       //400     
        }

        const index = this.findNoteIndex(note);
        if (index === -1) {
            // add new one
            this.notes.push(note);
        } else {
            // found existing, so update it.
            // this.notes[index] = note;
            throw new Error("NotFound"); //404
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(this.notes));
    }
    deleteNote(id) {
        // search the notes arr for the matching note title
        if (id === null) {
            console.log("note id is null");
            return;
        }
        const index = this.findNoteIndex({ "id": id });
        if (index === -1) {
            console.log("could not find note");
        } else {
            this.notes.splice(index, 1);
            fs.writeFileSync(this.dbPath, JSON.stringify(this.notes));
        }
    }
    findNoteIndex(note) {
        return this.notes.findIndex(element => element.id == note.id);
    }
    getNotes() {
        return this.notes;
    }
    autoIncrementID() {
        for (let i = 0; i < this.notes.length; i++) {
            

        }
    }
}
module.exports = Database;
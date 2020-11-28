const express = require('express');
const Database = require('../server/database');
const path = require("path");
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../public')));


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

app.get("/", function (req, res, err) {
  res.sendFile("index.html", { root: path.resolve(__dirname, '../../public/') });
});

app.get("/api/notes", function (req, res, err) {
  const e = new Database();
  res.json(e.getNotes());
});

app.post("/api/notes", function (req, res, err) {

  const e = new Database();
  console.log('Got body:', req.body);
  const newNote = req.body;
  // if new note id is null create a random id using uuid
  if (!newNote.id) {
    newNote.id = uuidv4();
  } 
  try {
    e.saveNote(newNote);
    res.json(newNote);
  }
  catch (error) {
    switch (error.message.toLowerCase()) {
      case "notfound":
        res.sendStatus(404);
        break;
      case "invalidparameter":
        res.sendStatus(400);
        break;
      default:
        res.sendStatus(500);
    }
  }

});

// notes does not have a good identifier, so we will ask user to post entire object
// this way we dont' have to URLEncode the title querystring
app.delete("/api/notes/:id", function (req, res, err) {
  const e = new Database();
  var id = req.params.id;
  e.deleteNote(id);
  res.sendStatus(204);
})





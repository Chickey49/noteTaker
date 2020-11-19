const express = require('express');
const Database = require('../server/database');

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

app.get("/api/notes", function (req, res, err) {
  const e = new Database();
  res.json(e.getNotes());

  if (err){
    res.sendStatus(404);
  }
});

app.post("/api/notes", function (req, res, err) {
  const e = new Database();
  console.log('Got body:', req.body);
  const newNote = req.body;
  e.saveNote(newNote);
  res.json(newNote); 
  
  if (err){
    res.sendStatus(404);
  }
});

// notes does not have a good identifier, so we will ask user to post entire object
// this way we dont' have to URLEncode the title querystring
app.delete("/api/notes", function (req, res, err) {
  const e = new Database();
  const newNote = req.body;
  e.deleteNote(newNote);
  res.sendStatus(204); 

  if (err){
    res.sendStatus(404);
  }
})





const fs = require('fs');
const dbJson= require('../db/db.json')

module.exports = function(app) {
  app.get('/api/notes', function(req, res) {
    console.log('route hit')
      fs.readFile('./db/db.json','utf8', (err, data) => {
        let dbData = JSON.parse(data);
        console.log(dbData);
       
        if (err) {console.log(err)}
        
        else{
        
          return res.json(dbData);
       
        } 
      });
    });


      app.post('/api/notes', function(req, res) {
        const userNotes = req.body;
    
        fs.readFile('./db/db.json', (err, data) => {
          if (err) throw err;
          dbData = JSON.parse(data);
          dbData.push(userNotes);
          let number = 1;
          dbData.forEach((note, index) => {
            note.id = number;
            number++;
            return dbData;
          });
          console.log(dbData);
    
          stringData = JSON.stringify(dbData);
    
          fs.writeFile('./db/db.json', stringData, (err, data) => {
            if (err) throw err;
          });
        });
        res.send('Thank you for your note!');
      });

      app.delete('/api/notes/:id', function(req, res) {
        // Gets id number of note to delete
        const deleteNote = req.params.id;
        console.log(deleteNote);
    
        fs.readFile('./db/db.json', (err, data) => {
          if (err) throw err;
    
          // Comparing each note's id to delete note

          dbData = JSON.parse(data);
          for (let i = 0; i < dbData.length; i++) {
            if (dbData[i].id === Number(deleteNote)) {
              dbData.splice([i], 1);
            }
          }
          console.log(dbData);
          stringData = JSON.stringify(dbData);
    
          fs.writeFile('./db/db.json', stringData, (err, data) => {
            if (err) throw err;
          });
        });
        // Express response.status(204)
        res.status(204).send();
      });
    };
    
  
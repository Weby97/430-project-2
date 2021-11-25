const models = require('../models');

const { Note } = models;

const makeNote = (req, res) => {
    if (!req.body.name || !req.body.note) {
        return res.status(400).json({ error: 'Name and Message are both required.' });
    }

    const noteData = {
        name: req.body.name,
        note: req.body.note,
        // owner: req.session.account._id,
    };

    const newNote = new Note.NoteModel(noteData);

    const notePromise = newNote.save();

    notePromise.then(() => 
        res.json({ status: 'Note has been made!'})
    );

    notePromise.catch((err) => {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Note already exists.' });
        }

        return res.status(400).json({ error: 'An error occurred' });
    });

    return notePromise;
};

const getNotes = (request, response) => {
    const req = request;
    const res = response;

    return Note.NoteModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }

        return res.json({ notes: docs });
    });
};

const getRandomNote = (request, response) => {
    const req = request;
    const res = response;

    return Note.NoteModel.findRandom((err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }

        return res.json({ note: docs });
    })
}

module.exports.getRandom = getRandomNote;
module.exports.getNotes = getNotes;
module.exports.make = makeNote;

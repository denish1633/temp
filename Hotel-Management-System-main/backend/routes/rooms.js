const router = require('express').Router();
let Room = require('../models/rooms.model');

router.route('/').get((req, res) => {
    Room.find()
    .then(Room => res.json(Room))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);

    const newRoom = new Room({
        username,
        description,
        duration,
        date,
    });

    newRoom.save()
    .then(() => res.json('Room Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Room.findById(req.params.id)
    .then(Room => res.json(Room))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) => {
    Room.findByIdAndDelete(req.params.id)
    .then(() => res.json('Room deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    Room.findById(req.params.id)
    .then(Room => {
        Room.username = req.body.username;
        Room.description = req.body.description;
        Room.duration = Number(req.body.duration);
        Room.date = Date.parse(req.body.date);

        Room.save()
            .then(() => res.json('Room updated'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;
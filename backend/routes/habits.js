const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Habits route is live!');
    console.log('Habits route is live!');
});

router.post('/', (req, res) => {
    const { name, frequency } = req.body;
    res.send('Habit added!: ' + name + ' ' + frequency);
    console.log(req.body);
});

module.exports = router;
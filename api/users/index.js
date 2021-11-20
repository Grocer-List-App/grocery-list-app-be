const express = require('express');
const router = express.Router();
const Users = require('./users-model');

router.get('/:id', (req,res,next) => {
    Users.findUser(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(next)    
})

router.put('/:id', (req,res) => {
    res.status(201).json( { message: "PUT /user/:id valid"})
})

router.delete('/:id', (req,res) => {
    res.status(200).json({ message: "DELETE /user/:id valid"})
})

module.exports = router
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');



let users = [];

// all routes in here are starting with /users (== /)
router.get("/", (req, res) => {
    res.send(users)
})

// It changes the data in the webpage, but doesn't chanage the original array.
router.post("/", (req, res) => {
    
    const user = req.body

    const userId = uuidv4();

    const userWithId = { ...user, id: userId}
    
    users.push(userWithId)

    // or user.push({ ...user, id: userId})

    res.status(200).send(`User with the name ${user.firstName} registered successfully`)
});

// :id == params
router.get("/:id", (req, res) => {
    const id = req.params.id;
    // const {id} = req.params;

    res.send(users.find( (user) => user.id == id));
})

router.delete("/:id", (req, res) => {
    const {id} = req.params

    // filter returns true or false, false is deleted from de array. Since user.id IS EQUAL to id, it returns false and eliminates the user with this ID.
    users = users.filter( (user) => user.id != id)

    res.send(`User with the id ${id} deleted from the database!`)
})

router.patch("/:id", (req, res) => {
    const {id} = req.params;    
    // sent from the client
    const {firstName, lastName, age} = req.body;
    const user = users.find( (user) => user.id == id);

 

    if(firstName) {
        user.firstName = firstName
    }
    if(lastName){
         user.lastName = lastName
    }
    if(age) {
        user.age = age
    }
    res.send(`User with the id ${id} updated.`)
})



module.exports = router;
const express = require('express');
const router = express.Router();
const notes = require("../models/NotesModel")
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1: Fetch all the notes using: GET "/api/notes/fetchnotes."
router.get('/fetchnotes', fetchuser, async (req, res) => {

    try { 
        let allnotes = await notes.find({ userId: req.user.id });
        res.json(allnotes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Fetch Notes: Notes feth fails.")
    }
})


// Route 2: Add new notes using: POST "/api/notes/addnote."
router.post('/addnote', fetchuser, [
    body('title', "Title cannot be empty").notEmpty(),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {

    //If there are errors return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const {title, description, tag} =  req.body
        let newNote = new notes({title, description, tag, userId:req.user.id})
        const note = await newNote.save()
        return res.json(note)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Create Note: Note add fails.")
    }
})

// Route 3: Update an existing note using: PUT "/api/notes/updatenote."
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title, description, tag} =  req.body
        //Create a newNote object
        let newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
        
        //finding note by note id given to params
        let note = await notes.findById(req.params.id)

        //if note not available
        if(!note){
            return res.status(404).send("Not found")
        }

        //if note userId not matched with given token user id
        if(note.userId.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        //if above statements goes false
        note = await notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.send(note)

    } catch (error) {
        console.error(error)
        res.status(500).send("Update Note: Note update fails.")
    }

})


// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote."
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        
        //finding note by note id given to params
        let note = await notes.findById(req.params.id)

        //if note not available
        if(!note){
            return res.status(404).send("Not found")
        }

        //if note userId not matched with given token user id
        if(note.userId.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        //if above statements goes false
        deleteNote = await notes.findByIdAndDelete(req.params.id)
        res.send(deleteNote)

    } catch (error) {
        console.error(error)
        res.status(500).send("Delete Note: Note Deletion fails.")
    }

})

module.exports = router
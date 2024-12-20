import React, { useState } from 'react';
import NoteContext from './NotesContext';
// import notesSample from './notesSample';


const NoteState = (props) => {
    const host= "http://localhost:5000"
    
    const [notes, setnotes] = useState([])

    //Get Notes
    const getNotes = async ()=>{
        const response = await fetch (`${host}/api/notes/fetchnotes`, {
            method: "GET",
            headers:{
                "auth-token": localStorage.getItem('Token')
            }
        })
        let json = await response.json()
        setnotes(json)
    }

    //Add Note
    const addNote = async (title, description, tag)=>{
        const response = await fetch (`${host}/api/notes/addnote`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('Token')
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "tag": tag,
            })
        })
        let json = await response.json()
        setnotes(notes.concat(json))
    }

    // Delete Note
    const deleteNote = async (id) =>{
        await fetch (`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('Token')
            }
        })
        
        const newNotes = notes.filter((note)=>{
            return note._id !== id
        })
        setnotes(newNotes)
    }
    
    // Edit Note
    const editNote = async (id, title, description, tag)=>{
        const response = await fetch (`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('Token')
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "tag": tag,
            })
        })
        
        const json = await response.json()
        console.log(json)

        // Logic to Edit in Client
        for (let i = 0; i < notes.length; i++) {
            const e = notes[i];
            if (e._id === id) {
                e.title = title;
                e.description = description;
                e.tag = tag;
            }
            break;
        }
        getNotes()
    }

    const [newNote, setnewNote] = useState({eid:"", etitle: "", edescription: "", etag: "" })

    const updateNote= (currentNote)=>{
        setnewNote({eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    return (
        <NoteContext.Provider value={{notes, addNote, getNotes, editNote, deleteNote, newNote, setnewNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
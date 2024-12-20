import React, { useContext } from 'react';
import NoteContext from '../context/notes/NotesContext';

function Noteitem(props) {
    const Context = useContext(NoteContext)
    const { deleteNote, updateNote } = Context
    const {note}= props
    return (
        <div className="card m-2">
            <div className="card-header d-flex justify-content-between">
                <div>
                {note.tag} 
                </div>
                <div>
                <i className="fa-solid fa-trash-can mx-2" role="button" onClick={()=>{deleteNote(note._id); props.showalert("success", "Note Deleted Successfully")} }></i>
                <i className="fa-solid fa-pen-to-square mx-2" role="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <a href="/" className="btn btn-primary">{note.date}</a>
            </div>
        </div>
    )
}

export default Noteitem
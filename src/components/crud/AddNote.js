import React, { useContext, useState } from 'react';
import NoteContext from '../../context/notes/NotesContext';

function AddNote(props) {
  const Context = useContext(NoteContext)
  const { addNote } = Context

  const [newNote, setnewNote] = useState({title:"", description:"", tag:""})

  const noteSaver = (e) => {
    e.preventDefault();
    addNote(newNote.title, newNote.description, newNote.tag)
    props.showalert("success", "Note Saved Successfully")
    setnewNote({title:"", description:"", tag:""})
  }

  const onChange = (e) => {
      setnewNote({...newNote, [e.target.name] : e.target.value})
  }

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className='my-3'>
        <div className="mb-3 w-75">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" onChange={onChange} value={newNote.tag}/>
        </div>
        <div className="mb-3 w-75">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={newNote.title}/>
        </div>
        <div className="mb-3 w-75">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={newNote.description}/>
        </div>
        <button disabled={newNote.title.length <5 || newNote.description.length<5}  className="btn btn-primary"  onClick={noteSaver}>Save</button>
      </form>
    </div>
  )
}

export default AddNote
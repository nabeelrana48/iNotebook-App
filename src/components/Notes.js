import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NotesContext';
import Noteitem from './Noteitem';
import AddNote from './crud/AddNote';
import EditNote from './crud/EditNote';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Notes(props) {
    const Context = useContext(NoteContext)
    const { notes, getNotes } = Context
    const history = useHistory();
    useEffect(() => {
        if(localStorage.getItem("Token")){
            getNotes()
        }
        else{
            history.push("/login")
        }
      // eslint-disable-next-line
    }, [])
    
    return (
        <>
            <AddNote showalert={props.showalert} />
            <EditNote showalert={props.showalert}/>
            <div className="container my-3">
                <h2>Your Notes</h2>
                <div className="d-flex flex-wrap justify-content-evenly">
                    {notes.length===0 && "No Notes to display"}
                    {notes.map((note) => {
                        return <Noteitem note={note} key={note._id + Math.random()} showalert={props.showalert}/>
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default Notes
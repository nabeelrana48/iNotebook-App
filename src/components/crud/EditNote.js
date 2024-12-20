import React, { useContext } from 'react';
import NoteContext from '../../context/notes/NotesContext';

function EditNote(props) {
    const Context = useContext(NoteContext)
    const { editNote, newNote, setnewNote } = Context

    const noteSaver = () => {
        editNote(newNote.eid, newNote.etitle, newNote.edescription, newNote.etag)
        props.showalert("success", "Note Edited Successfully")
    }

    const onChange = (e) => {
        setnewNote({ ...newNote, [e.target.name]: e.target.value })
    }

    return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit a Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Tag:</label>
                                    <input type="text" className="form-control" value={newNote.etag} name="etag" id="recipient-name"  onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                                    <input type="text" className="form-control" value={newNote.etitle} name="etitle" id="recipient-name"  onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Description:</label>
                                    <textarea className="form-control" value={newNote.edescription} name="edescription" id="message-text" onChange={onChange} ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={newNote.etitle.length <5 || newNote.edescription.length<5} className="btn btn-primary" data-bs-dismiss="modal" onClick={noteSaver} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default EditNote
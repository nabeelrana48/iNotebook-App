import React from 'react'

export default function Alert(props) {

    const capitalize = (word) => {
        if(word==="danger"){
            word = "error"
        }
        const titleCase = word
        return titleCase.charAt(0).toUpperCase() + titleCase.slice(1)
    }
    return (
        props.alert && <div className='position-relative d-flex justify-content-center'>
            <div className={`alert alert-${props.alert.type} d-flex align-items-center justify-content-center w-25 m-auto position-absolute mt-2`} role="alert">
            <div>
                <strong>{capitalize(props.alert.type)}:</strong> {props.alert.msg}
            </div>
        </div>
        </div>
    )
}
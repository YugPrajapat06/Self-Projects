import React from 'react'

const FormGroup = ({value,placeholder,label,onChange}) => {
    return (

        <div className="form-group">
            <label htmlFor={label}>{label}</label>
            <input onChange={onChange}  name={label} type={label} id={label} placeholder={placeholder} />
        </div>

    )
}

export default FormGroup

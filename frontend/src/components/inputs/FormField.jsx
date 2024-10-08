function FormField({generalClass, htmlFor, classNameLabel, textLabel, type, id, placeholder, classNameInput}) {
    return (
        <div className={generalClass}>
            <label htmlFor={htmlFor} className={classNameLabel}>{textLabel}</label><br></br>
            <input type={type} id={id} placeholder={placeholder} className={classNameInput} />
        </div>
    )
}

export default FormField
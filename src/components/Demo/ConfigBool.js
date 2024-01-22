const ConfigBool = (props) => {
    const { name, label, value, setValue } = props

    const handleChange = (e) => {
        setValue(!value)
    }

    return (
        <label htmlFor={name} className="property">
            {label}:
            <span className="value">
                {String(value)}
            </span>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={value}
                onChange={handleChange}
            /> 
        </label>
    )
}

export default ConfigBool
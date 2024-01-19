const ConfigBool = (props) => {
    const handleChange = (e) => {
        props.setValue(!props.value)
    }

    return (
        <label htmlFor={props.name} className="property">
            <span className="value">
                {String(props.value)}
            </span>
            <input
                type="checkbox"
                id={props.name}
                name={props.name}
                checked={props.value}
                onChange={handleChange}
            /> 
        </label>
    )
}

export default ConfigBool
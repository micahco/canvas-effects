const ConfigInc = (props) => {
    const { label, value, setValue, step, max, min } = props

    const handleClick = (e) => {
        if (value === undefined) {
            setValue(min)
        } else if (e.target.value === '+') {
            setValue(value + step)
        } else {
            setValue(value - step)
        }
    }

    return (
        <div className="property">
            <span className="label">{label}:</span>
            <span className="value">{String(props.value)}</span>
            <div>
                <input type="button" onClick={handleClick} value="-" disabled={value <= min ? "disabled" : ""} />
                <input type="button" onClick={handleClick} value="+" disabled={value >= max ? "disabled" : ""} />
            </div>
        </div>
    )
}

export default ConfigInc
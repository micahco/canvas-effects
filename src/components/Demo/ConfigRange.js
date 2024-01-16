import { useState, useEffect } from 'react'
import { useDebounce } from 'hooks/useDebounce'

const ConfigRange = (props) => {
    const [value, setValue] = useState(props.value)
    const [maxWidth, setMaxWidth] = useState(null)
    const debouncedValue = useDebounce(value, 200)

    useEffect(() => {
        const max = props.range[1]
        setMaxWidth(String(max).length)
    }, [])

    useEffect(() => {
        props.setValue(Number(value))
    }, [debouncedValue])

    return (
        <label htmlFor={props.name}>
            <span style={{width: maxWidth + 'ch'}}>
                {String(value)}
            </span>
            {maxWidth && <input
                type="range"
                id={props.name}
                name={props.name}
                min={props.range[0]} max={props.range[1]}
                value={value}
                onChange={e => setValue(e.target.value)}
                step={props.step}
            />}
        </label>
    )
}

export default ConfigRange
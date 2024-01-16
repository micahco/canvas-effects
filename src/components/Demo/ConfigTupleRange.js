import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'hooks/useDebounce'

const ConfigTupleRange = (props) => {
    const [value, setValue] = useState(0)
    const baseRef = useRef(Array.from(props.tuple))
    const debouncedValue = useDebounce(value, 200)
    const str = `[${String(props.tuple)}]`

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        const base = baseRef.current
        console.log(base)
        if (value > 0) {
            props.setTuple(base.map(x => x * value))
        } else if (value < 0) {
            let absValue = Math.abs(value)
            props.setTuple(base.map(x => x / absValue))
        } else {
            props.setTuple(base)
        }
    }, [debouncedValue])

    return (
        <label htmlFor={props.name}>
            <span style={{width: 8 + 'ch'}}>
                {str}
            </span>
            <input
                type="range"
                id={props.name}
                name={props.name}
                min={props.min} max={props.max}
                value={value}
                onChange={handleChange}
                step={props.step}
            />
        </label>
    )
}

export default ConfigTupleRange
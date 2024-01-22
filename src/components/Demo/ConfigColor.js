import { useState, useEffect } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import { RGBAToHex, hexToRGBA } from 'helpers/colors'


const ConfigColor = (props) => {
    const { name, label, value, setValue } = props
    const [hexValue, setHexValue] = useState('')
    const debouncedHexValue = useDebounce(hexValue, 300)

    useEffect(() => {
        if (value) {
            setHexValue(RGBAToHex(value))
        }
    }, [value])

    useEffect(() => {
        if (debouncedHexValue) {
            setValue(hexToRGBA(debouncedHexValue))
        }
    }, [debouncedHexValue, setValue])

    return (
        <label className='property' htmlFor={name}>
            {label}:
            <span className='value'>[{String(value)}]</span>
            <input
                type='color'
                id={name}
                name={name}
                value={hexValue || "#000000"}
                onChange={e => setHexValue(e.target.value)}
            />
        </label>
    )
}

export default ConfigColor
import { useState, useEffect } from 'react'
import { useDebounce } from 'hooks/useDebounce'

const RGBAToHex = (rgba) => '#' + rgba.slice(0, -1).map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

const hexToRGB = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                ,(m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

const ConfigColor = (props) => {
    const [color, setColor] = useState(RGBAToHex(props.value))
    const debouncedColor = useDebounce(color, 300)

    useEffect(() => {
        props.setValue([...hexToRGB(color), 1])
    }, [debouncedColor])

    return (
        <label htmlFor={props.name}>
            [{String(props.value)}]
            <input
                type='color'
                id={props.name}
                name={props.name}
                value={color}
                onChange={e => setColor(e.target.value)}
            />
        </label>
    )
}

export default ConfigColor
import React, { useState, useEffect } from 'react'
import { Delaunay } from 'canvas-effects'
import Canvas from './Canvas'
import ConfigBool from './ConfigBool'
import ConfigInc from './ConfigInc'
import ConfigColor from './ConfigColor'

const DelaunayDemo = (props) => {
    const [seedValue, setSeedValue] = useState(5000)
    const [color, setColor] = useState([255, 255, 255, 1])
    const [mouse, setMouse] = useState(false)
    const [shade, setShade] = useState(0.5)
    const [strokeColor, setStrokeColor] = useState(undefined)
    const [strokeWidth, setStrokeWidth] = useState(undefined)

    useEffect(() => {
        if (props.darkTheme) {
            if (color.toString() === '255,255,255,1') {
                setColor([155, 155, 155, 1])
            }
        } else {
            if (color.toString() === '155,155,155,1') {
                setColor([255, 255, 255, 1])
            }
        }
    }, [props.darkTheme])
    
    return (
        <div className='demo'>
            <div>
                <h2>Delaunay</h2>
                <pre className='config'>{`
{
    height: 500,
    width: 1000,
    `}<ConfigInc label='seed' value={seedValue} setValue={setSeedValue} step={1000} max={12000} min={3000} />{`
    `}<ConfigColor name='delaunay-color' label='color' value={color} setValue={setColor} />{`
    `}<ConfigBool label='mouse' value={mouse} setValue={setMouse} />{`
    `}<ConfigInc label='shade' value={shade} setValue={setShade} step={0.25} max={1} min={0.25} />{`
    stroke: {
        `}<ConfigColor name='delaunay-stroke-color' label='color' value={strokeColor} setValue={setStrokeColor} />{`
        `}<ConfigInc label='width' value={strokeWidth} setValue={setStrokeWidth} step={1} max={5} min={1} />{`
    }
}
                `}</pre>
            </div>
            <div>
                <Canvas effect={Delaunay} config={{
                    height: 500,
                    width: 1000,
                    seed: seedValue,
                    color: color,
                    mouse: mouse,
                    shade: shade,
                    stroke: {
                        color: strokeColor,
                        width: strokeWidth
                    }
                }} />
            </div>
        </div>
    )
}

export default DelaunayDemo
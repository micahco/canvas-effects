import React, { useState } from 'react'
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

    return (
        <article className='demo delaunay'>
            <div className='left'>
                <h2>Delaunay</h2>
                <pre className='config'>{`
{
    height: 500,
    width: 1000,
    seed: `}<ConfigInc value={seedValue} setValue={setSeedValue} step={1000} max={12000} min={3000} />{`
    color: `}<ConfigColor name='delaunay-color' value={color} setValue={setColor} />{`
    mouse: `}<ConfigBool value={mouse} setValue={setMouse} />{`
    shade: `}<ConfigInc value={shade} setValue={setShade} step={0.25} max={1} min={0.25} />{`
    stroke: {
        color: `}<ConfigColor name='delaunay-stroke-color' value={strokeColor} setValue={setStrokeColor} />{`
        width: `}<ConfigInc value={strokeWidth} setValue={setStrokeWidth} step={1} max={5} min={1} />{`
    }
}
                `}</pre>
            </div>
            <div className='right'>
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
        </article>
    )
}

export default DelaunayDemo
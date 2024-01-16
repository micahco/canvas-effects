import './Demo.css'
import React, { useState } from 'react'
import { Galileo } from 'canvas-effects'
import Canvas from './Canvas'
import ConfigRange from './ConfigRange'
import ConfigTupleRange from './ConfigTupleRange'
import ConfigBool from './ConfigBool'
import ConfigColor from './ConfigColor'

const GalileoDemo = props => {
    const [seedValue, setSeedValue] = useState(8000)
    const [pointColor, setPointColor] = useState([0, 0, 0, 1])
    const [pointRadius, setPointRadius] = useState([4, 2])
    const [pointVelocity, setPointVelocity] = useState([0.2, 0.1])
    const [lineColor, setLineColor] = useState([0, 0, 0, 1])
    const [lineFade, setLineFade] = useState(true)
    const [lineMax, setLineMax] = useState(100)
    const [lineWidth, setLineWidth] = useState(1)

    return (
        <article className='demo'>
            <h2>Galileo</h2>
            <pre>{`
new Galileo(HTMLCanvasElement, {
    height: 500,
    width: Infinity,
    seed: `}<ConfigRange name="seed" range={[1000, 15000]} value={seedValue} setValue={setSeedValue} step={1000} />{`
    point: {
        color: `}<ConfigColor value={pointColor} setValue={setPointColor} />{`
        radius: `}<ConfigTupleRange name="galileo-point-radius" tuple={pointRadius} setTuple={setPointRadius} min={-4} max={4} step={0.5} />{`
        velocity: ${pointVelocity}
    },
    line: {
        color: `}<ConfigColor value={lineColor} setValue={setLineColor} />{`
        fade: `}<ConfigBool value={lineFade} setValue={setLineFade} />{`
        max: `}<ConfigRange name="galileo-line-max" range={[50, 500]} value={lineMax} setValue={setLineMax} step={50} />{`
        width: `}<ConfigRange name="galileo-line-width" range={[1, 5]} value={lineWidth} setValue={setLineWidth} step={1} />{`
    }
});
            `}</pre>
            <Canvas effect={Galileo} config={{
                height: 500,
                width: Infinity,
                seed: seedValue,
                point: {
                    color: pointColor,
                    radius: pointRadius,
                    velocity: pointVelocity
                },
                line: {
                    color: lineColor,
                    fade: lineFade,
                    max: lineMax,
                    width: lineWidth
                }
            }} />
        </article>
    )
}

export default GalileoDemo
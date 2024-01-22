import React, { useState } from 'react'
import { Galileo } from 'canvas-effects'
import Canvas from './Canvas'
import ConfigBool from './ConfigBool'
import ConfigInc from './ConfigInc'
import ConfigColor from './ConfigColor'

const GalileoDemo = (props) => {
    const [seedValue, setSeedValue] = useState(5000)
    const [pointColor, setPointColor] = useState([0, 0, 0, 1])
    const [pointRadius, setPointRadius] = useState(2)
    const [pointVelocity, setPointVelocity] = useState(10)
    const [lineColor, setLineColor] = useState([0, 0, 0, 1])
    const [lineFade, setLineFade] = useState(true)
    const [lineMax, setLineMax] = useState(100)
    const [lineWidth, setLineWidth] = useState(1)

    return (
        <article className='demo galileo'>
            <div className='left'>
                <h2>Galileo</h2>
                <pre className='config'>{`
{
    height: 500,
    width: 1000,
    seed: `}<ConfigInc value={seedValue} setValue={setSeedValue} step={2000} max={9000} min={2000} />{`
    point: {
        color: `}<ConfigColor name='galileo-point-color' value={pointColor} setValue={setPointColor} />{`
        radius: `}<ConfigInc name="galileo-point-radius" value={pointRadius} setValue={setPointRadius} min={1} max={5} step={1} />{`
        velocity: `}<ConfigInc name="galileo-point-velocity" value={pointVelocity} setValue={setPointVelocity} min={10} max={510} step={100} />{`
    },
    line: {
        color: `}<ConfigColor name='galileo-line-color' value={lineColor} setValue={setLineColor} />{`
        fade: `}<ConfigBool value={lineFade} setValue={setLineFade} />{`
        max: `}<ConfigInc value={lineMax} setValue={setLineMax} step={100} max={500} min={100} />{`
        width: `}<ConfigInc value={lineWidth} setValue={setLineWidth} step={1} max={5} min={1} />{`
    }
}
                `}</pre>
            </div>
            <div className='right'>
                <Canvas effect={Galileo} config={{
                    height: 500,
                    width: 1000,
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
            </div>
        </article>
    )
}

export default GalileoDemo
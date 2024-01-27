import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        if (props.darkTheme) {
            if (pointColor.toString() === '0,0,0,1') {
                setPointColor([255, 255, 255, 1])
            }
            if (lineColor.toString() === '0,0,0,1') {
                setLineColor([255, 255, 255, 1])
            }
        } else {
            if (pointColor.toString() === '255,255,255,1') {
                setPointColor([0, 0, 0, 1])
            }
            if (lineColor.toString() === '255,255,255,1') {
                setLineColor([0, 0, 0, 1])
            }
        }
    }, [props.darkTheme])

    return (
        <div className='demo'>
            <div>
                <h2>Galileo</h2>
                <pre className='config'>{`
{
    height: 500,
    width: 1000,
    `}<ConfigInc label='seed' value={seedValue} setValue={setSeedValue} step={2000} max={9000} min={2000} />{`
    point: {
        `}<ConfigColor name='galileo-point-color' label='color' value={pointColor} setValue={setPointColor} />{`
        `}<ConfigInc name="galileo-point-radius" label='radius' value={pointRadius} setValue={setPointRadius} min={1} max={5} step={1} />{`
        `}<ConfigInc name="galileo-point-velocity" label='velocity' value={pointVelocity} setValue={setPointVelocity} min={10} max={510} step={100} />{`
    },
    line: {
        `}<ConfigColor name='galileo-line-color' label='color' value={lineColor} setValue={setLineColor} />{`
        `}<ConfigBool label='fade' value={lineFade} setValue={setLineFade} />{`
        `}<ConfigInc label='max' value={lineMax} setValue={setLineMax} step={100} max={500} min={100} />{`
        `}<ConfigInc label='width' value={lineWidth} setValue={setLineWidth} step={1} max={5} min={1} />{`
    }
}
                `}</pre>
            </div>
            <div>
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
        </div>
    )
}

export default GalileoDemo
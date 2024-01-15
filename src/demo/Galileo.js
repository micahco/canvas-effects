import React, { useState } from 'react'
import { Galileo } from 'canvas-effects'
import Canvas from './Canvas'

const GalileoDemo = props => {
    const [height, setHeight] = useState(400)

    return (
        <article>
            <h2>Galileo</h2>
            <label>
                Height:
                <input
                    name="height"
                    value={height}
                    onChange={e => setHeight(Number(e.target.value.replace(/\D/,'')))}
                />
            </label>
            <Canvas effect={Galileo} config={{
                height,
                width: Infinity
            }} />
        </article>
    )
}

export default GalileoDemo
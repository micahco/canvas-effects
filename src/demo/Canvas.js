import React, { useRef, useEffect } from 'react'

const Canvas = props => {

	const { effect, config, ...rest } = props
	const canvasRef = useRef(null)
	const effectRef = useRef(null)

	useEffect(() => {
		effectRef.current = new effect(canvasRef.current, config)
	})

	useEffect(() => {
		effectRef.current.update(config)
	}, [config])

	return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas
import React, { useRef, useEffect } from 'react'

const Canvas = (props) => {
	const { config, effect } = props
	const canvasRef = useRef(null)
	const effectRef = useRef(null)

	useEffect(() => {
		if (effectRef.current) {
			effectRef.current.updateConfig(config)
		}
	}, [config])

	useEffect(() => {
		if (canvasRef.current && !effectRef.current) {
			effectRef.current = new effect(canvasRef.current, config)
		}
	})

	return <canvas ref={canvasRef} />
}

export default Canvas
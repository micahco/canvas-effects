import React, { useRef, useState, useEffect } from 'react'

const Canvas = (props) => {
	const canvasRef = useRef(null)
	const effectRef = useRef(null)

	useEffect(() => {
		if (effectRef.current) {
			effectRef.current.updateConfig(props.config)
		}
	}, [props.config])

	useEffect(() => {
		if (canvasRef.current) {
			effectRef.current = new props.effect(canvasRef.current, props.config)
		}
	}, [])

	return <canvas ref={canvasRef} />
}

export default Canvas
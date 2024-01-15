import { ColorRGBA } from './types'

export function colorStyle(RGBA: ColorRGBA): string {
    return `rgba(${RGBA[0]},${RGBA[1]},${RGBA[2]},${RGBA[3]})`
}
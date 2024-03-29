# canvas-effects

A modular HTML Canvas library

[DEMO (React)](https://micahco.github.io/canvas-effects)

[![npm version](https://badge.fury.io/js/canvas-effects.svg)](https://badge.fury.io/js/canvas-effects)

## Usage

```
import { Effect } from 'canvas-effects'

new Effect(HTMLCanvasElement, Config)

```

## Config

These are the required properties.

**width** : number

**height** : number

Setting the width or height value to `Infinity` will fill the respective viewport.

```
const foo = new Effect(bar, {
	width: Infinity,
	height: 500
})

```

All config properties listed from this point on are *optional*.

### Galileo

**seed** : number

Changes the amount of random points generated based on the size of the canvas. A smaller number will produce more points, resulting in lower performance.

	Default: 5000

***point*** : {Object}

**color** : [number, number, number, number]

RGBA value of point.

	Default: [0, 0, 0, 1]

**radius** : number

Range tuple [max, min] of point radius.

	Default: 2

**velocity** : number

Range tuple [max, min] of the velocity at which the vertices travel.

	Default: 10

***line*** : {Object}

**color** : [number, number, number, number]

RGBA value of line.

	Default: [0, 0, 0, 1]

**fade** : boolean

If true, the lines will slowly disappear as they become larger.

	Default: true

**max** : number

Length at which the lines disappear.

	Default: 100

**width** : number

Sets the width of the line.

	Default: 1

### Delaunay

**seed** : number

Changes the amount of random points generated based on the sized of the canvas. A smaller number will produce more points, resulting in lower performance.

	Default: 5000

**color** : [number, number, number, number]

ColorRGBA [r, g, b, a].

	Default: [0, 0, 0, 1]

**mouse** : boolean

If true, the light source will move with the user's mouse.

	Default: false

**shade** : number

A number from 0 to 1 representing the max shade value. If value is 1, then polygons will be completely black when hidden from the light source. If the value is 0, the light source will not affect the polygons at all.

	Default: 0.5

***stroke*** : {Object}

The stroke property is an object that allows the user to configure the strokes of the polygons. By default this property is not initialized and therefore the stroke is the same color as the polygon fill.

**color** : [number, number, number, number]

ColorRGBA [r, g, b, a] of the stroke.

	Default: undefined

**width** : number

Sets the width of the stroke.

	Default: undefined

## Credits

[Daniel Avila](https://github.com/danthecodingman)

## License

[MIT](LICENSE)

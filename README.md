# canvas-effects
[![npm version](https://badge.fury.io/js/canvas-effects.svg)](https://badge.fury.io/js/canvas-effects)

A Javascript library of canvas visualizations. Written in Typescript.

## Getting Started

install:

`yarn add canvas-effects`

usage:

```
import { Stars, Delaunay } from 'canvas-effects'

const foo = new Stars({
	selector: '#stars',
	width: 500,
	height: 500,
	point: {
		color: [184, 142, 141, 1]
	},
	line: {
		color: [216, 210, 225, 1]
	}
});

const bar = new Delaunay({
	selector: '#delaunay',
	width: Infinity,
	height: Infinity
});
```







# Config

These are the required properties.

**selector** : string

**width** : number

**height** : number


Setting the width or height value to `Infinity` will fit the element to the page.

```
const foo = new Effect({
	selector: '#selector'
	width: 500,
	height: 500
});

const bar = new Effect({
	selector: '.selector'
	width: Infinity,
	height: 400
});
```

All config properties listed from this point on are *optional*.





# Stars

**seed** : number

Changes the amount of random points generated based on the area of the element. A smaller number will produce more points, resulting in lower performance.

	Default: 8000

####  point (object)

**color** : [number, number, number, number]

ColorRGBA [r, g, b, a] of point.

	Default: [0, 0, 0, 1]

**radius** : [number, number]

Range [max, min] of point radius.

	Default: [4, 2]

**velocity** : [number, number]

Range [max, min] of the velocity at which the vertices travel.

	Default: [0.2, 0.1]`

#### line

**color** : [number, number, number, number]

ColorRGBA [r, g, b, a] of line.

	Default: [0, 0, 0, 1]

**fade** : boolean

If true, the lines will slowly disappear as they become larger.

	Default: true`


**max** : number

Length at which the lines disappear.

	Default: 100

**width** : number

Sets the width of the line.

	Default: 1`




# Polygonal

**seed** : number

Changes the amount of random points generated based on the area of the element. A smaller number will produce more points, resulting in lower performance.

	Default: 8000

**color** : [number, number, number, number]

ColorRGBA [r, g, b, a].

	Default: [0, 0, 0, 1]

**mouse** : boolean

If true, the light source will move with the user's mouse.

	Default: true

**max** : number

A number from 0 to 1 representing the max shade value. If value is 1, then polygons will be completely black when hidden from the light source. If the value is 0, the light source will not affect the polygons at all.

	Default: 0.5

#### stroke

The stroke property is an object that allows the user to configure the strokes of the polygons. By default this property is not initialized and therefore the stroke is the same color as the polygon fill.

**color** : [number, number, number, number]

ColorRGBA [r, g, b, a] of the stroke.

	Default: undefined

**width** : number

Sets the width of the stroke.

	Default: undefined`

### Example

```
import { Polygonal } from 'canvas-effects';

const foo = new Polygonal({
	selector: '#bar',
	width: '100%',
	height: '100%',
	seed: 8000,
	color: [255, 255, 255, 0.5],
	mouse: true,
	max: 0.5,
	stroke: {
		color: [0,0,0,1],
		width: 0
	}
});
```










# Credits

Math Formulas: [@danthecodingman](https://github.com/danthecodingman)


# License

Everything is under the [MIT License](https://opensource.org/licenses/MIT).

Copyright (c) 2017 Micah Cowell

# canvas-effects
[![npm version](https://badge.fury.io/js/canvas-effects.svg)](https://badge.fury.io/js/canvas-effects)

A Javascript library of canvas visualizations. Written in Typescript.

## Getting Started

Download and install the latest published version from npm:

`npm install --save canvas-effects`

Then import the effects you want into your project:

```
import { Efect } from 'canvas-effects';

const foo = new Effect({
	// ...
});
```










# Config

These are **required** properties that must be present in the config for every effect.

#### container

A CSS selector that points to a **\<div\>** element in your html.

```
const foo = new Effect({
	container: '#selector'
});
```

#### width / height

Declares the desired width and height of the element.

Can either be a fixed px value (number) or a percentage (string).

```
const foo = new Effect({
	width: 500,
	height: 500
});

const bar = new Effect({
	width: '100%',
	height: 400
});
```

All config properties listed from this point on are **optional**.










# Constellations

```
import { Constellations } from 'canvas-effects';

const foo = new Constellations({
	// ...
});
```

**seed**

Changes the amount of random points generated based on the area of the element. A smaller number will produce more points, resulting in lower performance.

`seed: <number> // Default: 8000`

#### point

The point property is an object that allows the user to configure the vertices.

**color**

Sets the color (r, g, b, a) of the vertice.

`color: <number>[4] // Default: [0, 0, 0, 1]`

**radius**

Sets the range (max, min) of the size of the vertices.

`radius: <number>[2] // Default: [4, 2]`

**velocity**

Sets the range (max, min) of the velocity at which the vertices travel.

`velocity: <number>[2] // Default: [0.2, 0.1]`

#### line

The line property is an object that allows the user to configure the lines connecting two vertices.

**color**

Sets the color (r, g, b, a) of the line.

`color: <number>[4] // Default: [0, 0, 0, 1]`

**fade**

If true, the lines will slowly disappear as the become larger.

`fade: <boolean> // Default: true`


**max**

Sets the maximum length at which the line fades away and is no longer rendered.

`max: <number> // Default: 100`

**width**

Sets the width of the line.

`width: <number> // Default: 1`

### Example

```
import { Constellations } from 'canvas-effects';

const foo = new Constellations({
	container: '#bar',
	width: '100%',
	height: '100%',
	seed: 8000,
	point: {
		color: [0, 0, 0, 1],
		radius: [4, 2],
		speed: [0.2, 0.1]
	},
	line: {
		color: [0, 0, 0, 1],
		fade: 0.05,
		max: 100,
		width: 1
	}
});
```










# Polygonal

```
import { Polygonal } from 'canvas-effects';

const foo = new Polygonal({
	// ...
});
```

**seed**

Changes the amount of random points generated based on the area of the element. A smaller number will produce more points, resulting in lower performance.

`seed: <number> // Default: 16000`

**color**

This will set the base color (r, g, b, a) of the polygons.

`color: <number>[4] // Default: [255, 255, 255, 1]`

**mouse**

If true, the position of the light source will move with relation to the mouse pointer.

`mouse: <boolean> // Default: true`

**max**

A number from 0 to 1 representing the max shade value. If value is 1, then polygons will be completely black when hidden from the light source. If the value is 0, the light source will not affect the polygons at all.

`max: <number> // Default: 0.5`

#### stroke

The stroke property is an object that allows the user to configure the strokes of the polygons. By default this property is not initialized and therefore the stroke is the same color as the polygon fill.

**color**

Sets the color (r, g, b, a) of the stroke.

`color: <number>[4] // Default: undefined`

**width**

Sets the width of the stroke.

`width: <number> // Default: undefined`

### Example

```
import { Polygonal } from 'canvas-effects';

const foo = new Polygonal({
	container: '#bar',
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

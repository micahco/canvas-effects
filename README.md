# canvas-effects *WIP*
[![npm version](https://badge.fury.io/js/canvas-effects.svg)](https://badge.fury.io/js/canvas-effects)

A Javascript library of canvas visualizations.

## Getting Started

Download and install the latest published version from npm:

`npm install --save canvas-effects`

Or you can test the version from Github:

`npm install --save getmicah/canvas-effects`

Then import the effects you want into your project:

```
import { Efect } from 'canvas-effects';

const foo = new Effect({
	// ...
});
```

# Config

These are global parameters that **must** be included in the config of every effect.

#### container

A CSS selector that points to a **\<div\>** element in your html.

```
const foo = new Effect({
	container: '#selector'
});
```

#### width / height

Declares the desired width and height of the element.

Can either be a fixed px value or a percentage.

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

All config options listed from this point on are **optional**.






# Constellations

```
import { Constellations } from 'canvas-effects';

const foo = new Constellations({
	// ...
});
```

#### seed

Changes the amount of random points generated based on the area of the element. A smaller number will produce more points, resulting in lower performance.

`seed: <Number> // Default: 8000`

#### point

The point property is an object that allows the user to configure the vertices.

**color**

Sets the color (r, g, b, a) of the vertice.

`color: <Number>[4] // Default: [0, 0, 0, 1]`

**radius**

Sets the range (max, min) of the size of the vertices.

`radius: <Number>[2] // Default: [4, 2]`

**velocity**

Sets the range (max, min) of the velocity at which the vertices travel.

`velocity: <Number>[2] // Default: [0.2, 0.1]`

#### line

The line property is an object that allows the user to configure the lines connecting two vertices.

**color**

Sets the color (r, g, b, a) of the line.

`color: <Number>[4] // Default: [0, 0, 0, 1]`

**fade**

If true, the lines will slowly disappear as the become larger.

`fade: <Boolean> // Default: true`


**max**

Sets the maximum length at which the line fades away and is no longer rendered.

`max: <Number> // Default: 100`

**width**

Sets the width of the line.

`width: <Number> // Default: 1`

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

`seed: <Number> // Default: 8000`

**color**

This will set the base color (r, g, b, a) of the polygons.

`color: <Number>[4] // Default: [255, 255, 255, 1]`

**debug**

Allows developer to view the height (z value) of each vertex.

Defaults to red (255,0,0) text and there's currently no way to change it with the config.

`debug: <Boolean> // Default: false`

**mouse**

If true, the position of the light source will move with relation to the mouse pointer.

`mouse: <Boolean> // Default: true`

### Example

```
import { Polygonal } from 'canvas-effects';

const foo = new Polygonal({
	container: '#bar',
	width: '100%',
	height: '100%',
	seed: 8000,
	color: [255, 255, 255, 0.5],
	debug: false,
	power: 1000
});
```






# Credits

Math Formulas: [@danthecodingman](https://github.com/danthecodingman)






# License

Everything is under the [MIT License](https://opensource.org/licenses/MIT).

Copyright (c) 2017 Micah Cowell

# canvas-effects *BETA*
[![npm version](https://badge.fury.io/js/canvas-effects.svg)](https://badge.fury.io/js/canvas-effects)

A Javascript library of canvas visualizations.

## Getting Started

Download and install the latest version from npm:

`npm install --save canvas-effects`

Or you can test the alpha from Github:

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

A CSS selector that represents a **\<div\>** element.
```
const foo = new Effect({
	container: '#selector'
});
```

#### width / height

Declares the desired width and height of the element.
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

Changes the amount of random points generated based on the area of the element. A smaller number will produce more points, resulting in worse performance.

`seed: <int> // Default: 8000`

#### point

The point property is an object that allows the user to configure the vertices.

**color**

Sets the color (r, g, b, a) of the vertice.

`color: <int>[4] // Default: [0, 0, 0, 1]`

**radius**

Sets the range (max, min) of the size of the vertices.

`radius: <int>[2] // Default: [4, 2]`

**speed**

Sets the range (max, min) of the speed at which the vertices travel.

`speed: <int>[2] // Default: [0.2, 0.1]`

#### line

The line property is an object that allows the user to configure the lines connecting two vertices.

**color**

Sets the color (r, g, b, a) of the line.

`color: <int>[4] // Default: [0, 0, 0, 1]`

**fade**

Sets the speed at which the lines fade away once reaching the *max* length.

`fade: <int> // Default: 0.05`


**max**

Sets the maximum length at which the line fades away and is no longer rendered.

`max: <int> // Default: 100`

**width**

Sets the width of the line.

`width: <int> // Default: 1`

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

Changes the amount of random points generated based on the area of the element. A smaller number will produce more points, resulting in worse performance.

`seed: <int> // Default: 8000`

**color**

This will set the base color (r, g, b, a) of the polygons.

NOTE: It is recommended that you use semi-transparent color values (a < 1);

`color: <int>[4] // Default: [255, 255, 255, 0.5]`

**debug**

Allows developer to view the height (z value) of each vertex.

`debug: <boolean> // Default: false`

**light**

Changes the starting location of the light source and overall distance from the canvas.

The further away the light source is, the less affect it will have on the polygons.

`light: <int>[2] // Default: [-10,10]`

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
	light: [-10,-10]
});
```






# Credits

Math Formulas: [@danthecodingman](https://github.com/danthecodingman)






# License

Everything is under the [MIT License](https://opensource.org/licenses/MIT).

Copyright (c) 2017 Micah Cowell

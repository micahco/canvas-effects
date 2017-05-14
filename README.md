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

These are global parameters that must be included in the config of every effect.

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



---




# Constellations

[Demo](http://micahcowell.com/)

Instantiate:
```
import { Constellations } from 'canvas-effects';

const foo = new Constellations({
	// ...
});
```

## Config

All of the following config options are optional and contain default values.

#### seed

Changes the amount of random points generated based on the area of the element. A smaller number will produce more points, resulting in less performance.
```
const foo = new Constellations({
	seed: int // Default: 8000
});
```

#### point

Changes the properties of the randomly generated points on the canvas which act as vertices for the constellations.
```
const foo = new Constellations({
	point: {				// Defaults:
		color: [r,g,b,a],	// [0, 0, 0, 1]
		radius: [max,min],	// [4, 2]
		speed: [max,min]	// [0.2, 0.1]
	}
});
```

#### line

Changes the properties of lines that connect each point. The code generates every line then programmatically decides whether to render it.
```
const foo = new Constellations({
	line: {					// Defaults:
		color: [r,g,b,a],	// [0, 0, 0, 1]
		fade: int,			// 0.05
		max: int,			// 100
		width: int			// 1
	}
});
```

## Example

```
import { Constellations } from 'canvas-effects';

const foo = new Constellations({
	container: '#bar',
	width: '100%',
	height: 400,
	seed: 4000,
	point: {
		color: [0,0,255,0.5],
		radius: [8,4],
		speed: [0.8,0.4]
	},
	line: {
		color: [255,0,0,0.1],
		fade: 0.01,
		max: 150,
		width: 4
	}
});
```



---



# Polygonal




---




# License

Everything is under the [MIT License](https://opensource.org/licenses/MIT).

Copyright (c) 2017 Micah Cowell




---




# Credits

Math Formulas: [@danthecodingman](https://github.com/danthecodingman)

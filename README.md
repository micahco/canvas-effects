# canvas-effects

**BETA:** Expect everything to change.

A Javascript library of canvas visualizations.

## Getting Started

Download and install the latest version from npm:

`npm install --save canvas-effects`

Then import the effects you want into your project:

```
import { Efect } from 'canvas-effects';

const foo = new Effect({
	// ...
});
```

## Parameters

Whenever you instantiate an effect you need to pass in the following required parameters:

* *container:* `"selector"`
	* Selector **must** be to a `<div>` element.
	* `"#bar"` or `"div.bar"`
* *width:* `int`, `"%"`
	* `800` or `"100%"`
* *height:* `int`, `"%"`
	* `400` or `"50%"`

```
const foo = new Effect({
	container: '#bar',
	width: '100%',
	height: 400
	// ...
});
```

## Effects

Currently there are **1** total effects in the library with more being built.

### Constellations

Instantiate:

```
import { Constellations } from 'canvas-effects';

const foo = new Constellations({
	// ...
});
```

Config:

* *seed:* `int`
	* Changes amount of points based on canvas area.
	* Smaller = more points = less performance.
	* Default: `8000`
* *point:*
	* *color:* `"color"`
		* Default: `"#000000"`
	* *radius:* `[max,min]`
		* Default: `[4,2]`
	* *speed:* `[max,min]`
		* Default: `[0.2,0.1]`
* *line:*
	* *color:* [r,g,b,a]
		* Default: `[0,0,0,1]`
	* *fade:* `int`
		* 1 = no fade
		* Default: `0.05`
	* *max:* `int`
		* Longest distance for a line to appear between points.
		* Bigger = more lines = less performance.
		* Default: `100`
	* *width:* `int`
		* Default: `1`

**Example:**

```
import { Constellations } from 'canvas-effects';

const foo = new Constellations({
	container: '#bar',
	width: '100%',
	height: 400,
	seed: 4000,
	point: {
		color: 'rgba(0,0,255,0.5)',
		radius: [8,4],
		speed: [0.8,0.4]
	},
	line: {
		color: [255,0,0,0.1],
		fade: 1,
		max: 150,
		width: 4
	}
});
```


## License

Everything is under the [MIT License](https://opensource.org/licenses/MIT).

Copyright (c) 2017 Micah Cowell

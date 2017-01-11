# canvas-effects
**BETA:** Expect everything to change.

A Javascript library of canvas visualizations.

Documentation is under construction.


# Getting Started
Download and install the latest version from npm:

`npm install --save canvas-effects`

Then import the effects you want into your project:

```
import { // ... } from 'canvas-effects';

const foo = new Effect({
	// ...
});
```


# Parameters
Whenever you instantiate an effect you need to pass in the following required parameters:

* container (selector of a div)
* width (number or '%')
* height (number or '%')

```
const foo = Effect({
	container: '#bar',
	width: '100%',
	height: 400
});
```

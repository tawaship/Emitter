# @tawaship/emitter

**A little useful emitter.**

[![Build Status](https://travis-ci.org/tawaship/Emitter.svg?branch=master)](https://travis-ci.org/tawaship/Emitter)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

---


## How to install

1. on you npm project

```sh
npm install --save @tawaship/emitter
```

2. on your code

```javascript
import { Emitter } from '@tawaship/emitter';

// or

const { Emitter } = require('@tawaship/emitter');
```

## How to build

```sh
git clone https://github.com/tawaship/Emitter

cd Emitter

npm install

npm run build
```

## How to load on browser

After [install](#how-to-install) or [build](#how-to-build)

```html
<script src="/path/to/dist/Emitter.min.js"></script>
```

## Usage

### Basic
```javascript
const f = a => {
	console.log('ev', a);
};

new Emitter()
	.on('ev', f)
	.emit('ev', 1) // ev 1
	.off('ev', f)
	.emit('ev', 1) // (nothing)
```

### Basic once
```javascript
new Emitter()
	.once('ev', a => {
		console.log('ev', a);
	})
	.emit('ev', 1) // ev 1
	.emit('ev', 1) // (nothing)
```

### Repeatable arguments
```javascript
new Emitter()
	.on('ev', (...args) => {
		console.log('ev', ...args);
	})
	.emit('ev', 1, 2, 3, 4, 5, 6, 7) // ev 1 2 3 4 5 6 7
```

### Specify the context
```javascript
new Emitter()
	.on('ev', function(a) {
		console.log(this, a);
	})
	.cemit('ev', {hoge: 1}, 2) // {hoge: 1} 2
```

However, using the arrow function invalidates the context specification.

```javascript
// on window
new Emitter()
	.on('ev', a => {
		console.log(this, a);
	})
	.cemit('ev', {hoge: 1}, 2) // Window 2
```

### Events delete in groups
```javascript
new Emitter()
	.on('ev', a => {
		console.log('ev', a);
	})
	.on('ev', a => {
		console.log('ev', a);
	})
	.on('ev2', a => {
		console.log('ev', a);
	})
	.on('ev2', a => {
		console.log('ev', a);
	})
	.clear('ev')
	.emit('ev', 1) // (nothing)
	.emit('ev2', 1) // ev 1, ev 1
```

### All events delete at once
```javascript
new Emitter()
	.on('ev', a => {
		console.log('ev', a);
	})
	.on('ev2', a => {
		console.log('ev', a);
	})
	.on('ev3', a => {
		console.log('ev', a);
	})
	.on('ev4', a => {
		console.log('ev', a);
	})
	.clear()
	.emit('ev', 1) // (nothing)
	.emit('ev2', 1) // (nothing)
	.emit('ev3', 1) // (nothing)
	.emit('ev4', 1) // (nothing)
```
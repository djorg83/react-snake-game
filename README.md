# react-snake-game

[![NPM version](http://img.shields.io/npm/v/react-snake-game.svg)](https://www.npmjs.com/package/react-snake-game)
[![Downloads](https://img.shields.io/npm/dm/react-snake-game.svg)](https://www.npmjs.com/package/react-snake-game)
[![David](https://img.shields.io/david/djorg83/react-snake-game.svg?maxAge=2592000)](https://github.com/djorg83/react-snake-game)
[![GitHub issues](https://img.shields.io/github/issues/djorg83/react-snake-game.svg?maxAge=2592000)](https://github.com/djorg83/react-snake-game)
[![license](https://img.shields.io/github/license/djorg83/react-snake-game.svg?maxAge=2592000)](https://github.com/djorg83/react-snake-game)
[![GitHub stars](https://img.shields.io/github/stars/djorg83/react-snake-game.svg?style=social&label=Star&maxAge=2592000)](https://github.com/djorg83/react-snake-game)

[![NPM](https://nodei.co/npm/react-snake-game.png?downloads=true&stars=true)](https://nodei.co/npm/react-snake-game/)

React Snake Game
==========

A React component for embedding a game of snake into your app.  The game board auto-scales to the size of it's parent element.


Demo
----

[See the demo here!](http://djorg83.github.io/react-snake-app/)

Usage
-----

You can install through npm:

```bash
npm install react-snake-game
```

```javascript
import React    from 'react';
import ReactDOM from 'react-dom';
import Snake    from 'react-snake-game';

const WRAPPER_STYLE = {
    margin : '30px auto',
    height : 700,
    width  : 700
};

const App = () => (
	<div style={WRAPPER_STYLE}>
        <Snake />
	</div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```
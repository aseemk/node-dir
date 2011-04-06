dir for Node.js
===============

You ever used Firebug? You know the awesome `dir` function its console has?
Well, this is like that, but for Node.

That means you get *real* object inspection that goes up the prototype chain,
not the pansy-ass, weak-sauce "inspection" Node's `util.inspect` gives you.
And it actually returns an object instead of a string, so you don't have to
tediously and explicitly `console.log` it in the shell to unescape characters.
And best of all, since it returns a real object, the output is just as nicely
colored and formatted as the native shell.

Btw, it turns out Node already has a `console.dir`, but, uh... it doesn't seem
any different than `console.log`! So this monkey-patches it to no longer suck.

With `dir` in hand, you're ready to kick some console ass. Go forth and enjoy!


Installation
------------

    npm install dir


Usage
-----

`dir()` probably won't be terribly useful from within an app or file (though
feel free to let me know if I'm wrong!), but it's super convenient and useful
from within the shell (AKA interactive-mode).

Before:

    $ node
    > console.dir(Function.prototype)
    [Function: Empty]

After:

    $ node
    > require('dir')
    [Function: dir]
    > console.dir(Function.prototype)
    { bind: [Function: bind],
      arguments: null,
      toString: [Function: toString],
      length: 0,
      call: [Function: call],
      name: 'Empty',
      apply: [Function: apply],
      caller: null,
      constructor: [Function: Function],
      '[prototype]': 
       { toString: [Function: toString],
         __lookupGetter__: [Function: __lookupGetter__],
         __defineGetter__: [Function: __defineGetter__],
         toLocaleString: [Function: toLocaleString],
         hasOwnProperty: [Function: hasOwnProperty],
         valueOf: [Function: valueOf],
         __defineSetter__: [Function: __defineSetter__],
         constructor: [Function: Object],
         propertyIsEnumerable: [Function: propertyIsEnumerable],
         isPrototypeOf: [Function: isPrototypeOf],
         __lookupSetter__: [Function: __lookupSetter__] } }

That's the briefest example I could come up with. Some kick-ass-ier examples to
experience first-hand:

    > var dir = require('dir')
    > dir("hello")
    > dir([1, 2, 3])
    > dir(4.56)
    > dir(/regexp/)
    > dir(new Date())

The two samples above show the two different ways of using `dir`:

    // using the monkey-patched console.dir
    > require('dir')
    > console.dir(foo)

    // or grabbing the returned function
    > var dir = require('dir')
    > dir(foo)

I really want to be able to get the best of both worlds:

    // no need to save returned function; it's global
    > require('dir')
    > dir(foo)

But I can't seem to get this to work in the shell. If you have any ideas, let me
know or just submit a pull request!


Next steps
----------

None so far! Ideas, bug reports, praise, patches all welcome. =) Enjoy!

// dir.js
// An implementation of dir() for Node.js inspired by Firebug.
//
// Author: Aseem Kishore <aseem.kishore@gmail.com>
// License: MIT <http://www.opensource.org/licenses/mit-license.php>

// TODO assigning global.dir (or root.dir or this.dir) has no effect when req'd
// from the shell, so took it out. can we get it some way just for the shell?

// TODO can we detect whether we're being require()-ed from the shell or from a
// file? if file, we should console.log() the result, not (just) return it.

console.dir = module.exports = function dir(obj) {
    
    if (obj === null || obj === undefined) {
        return obj;
    }
    
    var keys;
    
    // Object.getOwnPropertyNames() and Object.getPrototypeOf() both throw errors
    // if you pass in a primitive type, but it doesn't correlate directly with
    // the typeof operator. e.g. typeof /foo/ is "function" but /foo/ works fine.
    // that also means we can't objectify everything just based on typeof. so for
    // now, we're simply try-catching both calls and objectifying only on error.
    
    try {
        keys = Object.getOwnPropertyNames(obj);
    } catch (e) {
        keys = Object.getOwnPropertyNames(objectify(obj));
    }
    
    var props = {};
    
    keys.forEach(function (key) {
        props[key] = obj[key];
    });
    
    var proto;
    
    try {
        proto = Object.getPrototypeOf(obj);
    } catch (e) {
        proto = Object.getPrototypeOf(objectify(obj));
    }
    
    if (proto) {
        // important: don't call this key "__proto__" like I originally did!
        // node.js explicitly hides that property from the console output.
        props['[prototype]'] = dir(proto);
    }
    
    return props;
    
};

function objectify(obj) {
    
    switch (typeof obj) {
        
        case "object":
            return obj;
        
        case "number":
            return new Number(obj);
        
        case "string":
            return new String(obj);
        
        case "boolean":
            return new Boolean(obj);
        
        case "function":
            return new Function(obj);
        
    }
    
}

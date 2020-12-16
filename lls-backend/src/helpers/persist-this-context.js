
const argValidator = () => {
    throw new Error('argument obj is required');
};

/**
 * Calls bind on every function in an object. This preserves this context of 
 * function calls irrespective of where the call happened
 * @param {obj} fns Array of function
 * @context {any} the this context to bind the functions to
 */
const persistThisContext = (obj = argValidator()) => {
    console.log(obj);
   return  Object.keys(obj).reduce((aggregate, key) => {
        if (typeof aggregate[key] === 'function') {
            aggregate[key] = aggregate[key].bind(aggregate);
        }

        return aggregate;

    }, obj);
};

module.exports = persistThisContext;
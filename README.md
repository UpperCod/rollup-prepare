# rollup-prepare

creates a minimum configuration of rollup from an object, similar to the operation of [**microbundle**](https://github.com/developit/microbundle), but without intervening on the dependencies of plugins.

## configuration
```javascript
import pkg from "./package.json";
import prepare from "rollup-prepare";

export default {
   ...prepare({
       pkg,
       ignore: ["umd:es5"],
       globals: {
           atomico: "atomico"
       },
       external : ["atomico"]
   })
};
```

## Specifying builds

```
"main": "dist/example.js",
"umd:main": "dist/example.umd.js",
"umd:es5": "dist/example.es5.umd.js",
"module": "dist/example.m.js",
"source": "src/index.js",
```

**umd:***, generate more than one output associated with the type of build.

By default, the name of the file will be taken for the definition of the UMD and IIFE module.

### ignore

Ignore properties associated with the build `main|umd|module|iife` type.

### globals

Define global dependencies, these can also be defined within **package.globals**

### external

Define the external dependencies, these defaults are extracted from ** package.dependencies **

### logger

By default, the rollup log is ignored based on the following regular expression `/MIXED_EXPORTS|MISSING_GLOBAL_NAME|MIXED_EXPORTS/`.
to disable this option simply define `logger: false`.
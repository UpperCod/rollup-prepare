# rollup-prepare

Permite preparar una configuración mínima de rollup desde un objeto, similar al funcionamiento de **microbundle**, pero sin intervenir sobre las dependencias de plugins.

## configuración
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

## Salidas
```
"main": "dist/example.js",
"umd:main": "dist/example.umd.js",
"umd:es5": "dist/example.es5.umd.js",
"module": "dist/example.m.js",
"source": "src/index.js",
```

**umd:***, permite generar más de una salida asociada al tipo de salida.

Por defecto, se tomará el nombre del fichero para la definición del módulo UMD y IIFE.

### ignore

Permite ignorar propiedades asociadas al tipo de salida `main|umd|module|iife`.

### globals
Define las dependencias globales, estas también se pueden definir dentro de **package.globals**

### external

Define las dependencias externas, estas por defecto se extraen de **package.dependencies**

### logger

Por defecto se ignoran los log de rollup a base de la siguiente expresión regular `/MIXED_EXPORTS|MISSING_GLOBAL_NAME|MIXED_EXPORTS/`.
para desactivar esta opción simplemente defina `logger:false`.
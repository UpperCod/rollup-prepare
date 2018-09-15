function getName(file) {
    let match = file.match(/([^\/]+)\.(\w+)$/);
    if (match) {
        return match[1].split(".")[0];
    } else {
        return "";
    }
}

function camelCase(string) {
    return string.replace(/-+([\w])/g, (all, letter) => letter.toUpperCase());
}

function ignoreLog(message, next) {
    if (/MIXED_EXPORTS|MISSING_GLOBAL_NAME|MIXED_EXPORTS/.test(message.code))
        return;
    next(message);
}

export default function bundle({
    pkg,
    ignore = [],
    globals,
    external,
    logger = true,
    sourcemap = true
}) {
    let config = {
        input: pkg.source,
        external: external || Object.keys(pkg.dependencies || {}),
        output: []
    };

    globals = globals || pkg.globals || {};

    if (logger) config.onwarn = ignoreLog;

    for (let prop in pkg) {
        let [all, type] =
            prop.match(/^(umd|module|main|iife)(?::(.+)){0,1}$/) || [];

        if (ignore.indexOf(prop) > -1 || !type) continue;

        let file = pkg[prop],
            name = camelCase(getName(file));
        switch (type) {
            case "umd":
            case "iife":
                config.output.push({
                    file,
                    name,
                    globals,
                    sourcemap,
                    format: type
                });
                break;
            case "module":
            case "main":
                config.output.push({
                    file,
                    sourcemap,
                    format: type === "main" ? "cjs" : "es"
                });
                break;
        }
    }
    return config;
}

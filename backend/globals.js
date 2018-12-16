// List all the properties with global scope

// rootRequire(envVars) would find the envVars file from the directory without drilling down to its actual location.
global.rootRequire = function (name) {
    return require(__dirname + '/' + name);
};
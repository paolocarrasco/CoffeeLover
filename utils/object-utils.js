exports.clone = function (objectToClone) {
    return JSON.parse(JSON.stringify(objectToClone));
};
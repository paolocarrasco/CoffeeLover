/**
 * Clone all the properties and functions of the object in a deep way
 */
exports.clone = function (objectToClone) {
    return JSON.parse(JSON.stringify(objectToClone));
};
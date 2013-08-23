/**
 * Capitalize the first letter of the text string
 */
String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.substr(1);
};

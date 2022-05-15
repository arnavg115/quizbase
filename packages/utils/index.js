"use strict";
exports.__esModule = true;
exports.grabParams = void 0;
var grabParams = function (search) {
    return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
    });
};
exports.grabParams = grabParams;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMongoDuplicationError = exports.validateStringEquality = exports.validateNotEmpty = void 0;
const validateNotEmpty = (received) => {
    expect(received).not.toBeNull();
    expect(received).not.toBeUndefined();
    expect(received).toBeTruthy();
};
exports.validateNotEmpty = validateNotEmpty;
const validateStringEquality = (received, expected) => {
    expect(received).not.toEqual('dummydfasfsdfsdfasdsd');
    expect(received).toEqual(expected);
};
exports.validateStringEquality = validateStringEquality;
const validateMongoDuplicationError = (name, code) => {
    expect(name).not.toEqual(/dummy/i);
    expect(name).toEqual('MongoError');
    expect(code).not.toBe(255);
    expect(code).toBe(11000);
};
exports.validateMongoDuplicationError = validateMongoDuplicationError;
//# sourceMappingURL=validator.utils.js.map
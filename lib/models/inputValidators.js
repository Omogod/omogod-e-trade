"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLoginDetails = exports.validateUser = void 0;
const joi_1 = __importStar(require("joi"));
const usersSignUpSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(30)
        .required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
        .required(),
    password: joi_1.default.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    repeat_password: joi_1.default.any().valid(joi_1.default.ref('password')).required(),
    gender: joi_1.default.string()
        .min(3)
        .max(30),
    // .required(),
    phone: joi_1.default.string()
        .min(3)
        .max(30),
    // .required(),
    address: joi_1.default.string()
        .min(3)
        .max(30),
    // .required(),
    access_token: joi_1.default.string()
});
const usersLoginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
        .required(),
    password: joi_1.default.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
});
const validateUser = function (name, email, password, confirmPassword, gender, phone, address, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const value = yield usersSignUpSchema
                .validateAsync({ name: name, email: email, password: password, repeat_password: confirmPassword, gender: gender, phone: phone, address: address, access_token: access_token });
            if (value) {
                return value;
            }
        }
        catch (error) {
            if (error instanceof joi_1.ValidationError) {
                const { message } = error.details[0];
                console.log(message);
                throw new Error(message);
            }
        }
    });
};
exports.validateUser = validateUser;
const validateUserLoginDetails = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const value = yield usersLoginSchema
                .validateAsync({ email: email, password: password });
            if (value) {
                return value;
            }
        }
        catch (error) {
            if (error instanceof joi_1.ValidationError) {
                const { message } = error.details[0];
                console.log(message);
                throw new Error(message);
            }
        }
    });
};
exports.validateUserLoginDetails = validateUserLoginDetails;
//# sourceMappingURL=inputValidators.js.map
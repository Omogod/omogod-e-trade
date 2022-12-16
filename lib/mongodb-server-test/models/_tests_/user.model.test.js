"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { fakeUserData } from './../../fixtures/index';
const user_model_1 = __importDefault(require("../user.model"));
const fixtures_1 = require("../../fixtures");
const validator_utils_1 = require("../../utils/test-utils/validator.utils");
const dbhandler_utils_1 = require("../../utils/dbhandler.utils");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { return (0, dbhandler_utils_1.dbConnect)(); }), 30000);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return (0, dbhandler_utils_1.dbDisconnect)(); }));
describe('User Model Test Suite', () => {
    test('should validate saving a new student user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const validStudentUser = yield user_model_1.default.create({
            name: 'Dummy',
            email: 'dummy@user.com',
            password: '********',
            gender: 'student',
            role: 'student',
            phone: '1234567890'
        });
        const savedStudentUser = yield validStudentUser.save();
        (0, validator_utils_1.validateNotEmpty)(savedStudentUser);
        (0, validator_utils_1.validateStringEquality)(savedStudentUser.role, fixtures_1.fakeUserData.role);
        (0, validator_utils_1.validateStringEquality)(savedStudentUser.email, fixtures_1.fakeUserData.email);
        (0, validator_utils_1.validateStringEquality)(savedStudentUser.name, fixtures_1.fakeUserData.name);
        (0, validator_utils_1.validateStringEquality)(savedStudentUser.password, fixtures_1.fakeUserData.password);
        (0, validator_utils_1.validateStringEquality)(savedStudentUser.phone, fixtures_1.fakeUserData.phone);
        (0, validator_utils_1.validateStringEquality)(savedStudentUser.gender, fixtures_1.fakeUserData.gender);
    }));
    test('should validate MongoError duplicate error with code 11000', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(0);
        const validStudentUser = yield user_model_1.default.create({
            name: 'dummy',
            email: 'dummy@guser.com',
            password: '********',
            gender: 'student',
            role: 'student',
            phone: '1234567890'
        });
        try {
            yield validStudentUser.save();
        }
        catch (error) {
            const { name, code } = error;
            (0, validator_utils_1.validateMongoDuplicationError)(name, code);
        }
    }));
});
//# sourceMappingURL=user.model.test.js.map
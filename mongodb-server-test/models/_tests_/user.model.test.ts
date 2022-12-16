// import { fakeUserData } from './../../fixtures/index';
import User from '../user.model';
import { fakeUserData } from '../../fixtures';
import { validateNotEmpty, validateStringEquality, validateMongoDuplicationError } 
from '../../utils/test-utils/validator.utils';

import {dbConnect, dbDisconnect} from '../../utils/dbhandler.utils';


beforeAll(async () => dbConnect(), 30000);
afterAll(async () => dbDisconnect());

describe('User Model Test Suite', () => {
  test('should validate saving a new student user successfully', async () => {
    const validStudentUser = await User.create({
            name: 'Dummy',
            email: 'dummy@user.com',
            password: '********',
            gender: 'student',
            role: 'student',
            phone: '1234567890'
         
    });
    const savedStudentUser  = await validStudentUser.save();

    validateNotEmpty(savedStudentUser);

    validateStringEquality(savedStudentUser.role, fakeUserData.role);
    validateStringEquality(savedStudentUser.email, fakeUserData.email);
    validateStringEquality(
      savedStudentUser.name,
      fakeUserData.name
    );
    validateStringEquality(
      savedStudentUser.password,
      fakeUserData.password
    );
    validateStringEquality(
      savedStudentUser.phone,
      fakeUserData.phone
    );
    validateStringEquality(
      savedStudentUser.gender,
      fakeUserData.gender
    );
  });

  test('should validate MongoError duplicate error with code 11000', async () => {
    expect.assertions(0);
    const validStudentUser = await User.create({
        name: 'dummy',
        email: 'dummy@guser.com',
        password: '********',
        gender: 'student',
        role: 'student',
        phone: '1234567890'    
    });

    try {
      await validStudentUser.save();
    } catch (error: any) {
      const { name, code } = error;
      validateMongoDuplicationError(name, code);
    }
  });
});
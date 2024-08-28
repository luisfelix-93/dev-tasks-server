/**
 * UserService test suite
 *
 * This suite tests the UserService module, which provides functionality for
 * registering and retrieving users.
 */
const UserService = require("../src/modules/user/services/UserService");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { checkPassword } = require('../src/service/auth')


/**
 * MongoMemoryServer instance
 *
 * @type {MongoMemoryServer}
 */
let mongoServer;
jest.setTimeout(10000);

/**
 * Before all tests, create a new MongoMemoryServer instance and connect to it
 *
 * @returns {Promise<void>}
 */
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongouri = mongoServer.getUri();
    mongoose.connect(mongouri);
})

/**
 * UserService test suite
 *
 * @description This suite tests the UserService module.
 */
describe('UserService', () => {
    /**
     * registerUser test
     *
     * @description Tests the registerUser method of the UserService.
     */
    describe('registerUser', () => {
        /**
         * Should register a new user
         *
         * @example
         * const userData = {
         *   userName: "test",
         *   fullName: "Test Testov",
         *   email: "test@test.com",
         *   password: "test"
         * };
         * const newUser = await UserService.registerUser(userData);
         * expect(newUser).toBeDefined();
         */
        it('Should register a new user', async () => {
            const userData = {
                userName : "test",
                fullName : "Test Testov",
                email : "test@test.com",
                password : "test"
            }

            const newUser = await UserService.registerUser(userData.userName, userData.fullName, userData.email, userData.password);
            expect(newUser).toBeDefined();
            expect(newUser.userName).toBe(userData.userName);
            expect(newUser.fullName).toBe(userData.fullName);
            expect(newUser.password).toBe(userData.password);
            expect(newUser.email).toBe(userData.email);
        });
    })

    /**
     * getUserById test
     *
     * @description Tests the getUserById method of the UserService.
     */
    describe('getUserById', () => {
        /**
         * Should get the user by id
         *
         * @example
         * const userData = {
         *   userName: "test",
         *   fullName: "Test Testov",
         *   email: "test@testE.com",
         *   password: "test"
         * };
         * const newUser = await UserService.registerUser(userData);
         * const user = await UserService.getUserById(newUser._id);
         * expect(user).toBeDefined();
         */
        it('Should get the user by hid id', async () => {
            const userData = {
                userName : "test",
                fullName : "Test Testov",
                email : "test@testE.com",
                password : "test"
            }

            const newUser = await UserService.registerUser(userData.userName, userData.fullName, userData.email, userData.password);
            const user = await UserService.getUserById(newUser._id);

            expect(user).toBeDefined();
            expect(user.userName).toBe(userData.userName);
            expect(user.fullName).toBe(userData.fullName);
            expect(user.password).toBe(userData.password);
            expect(user.email).toBe(userData.email);
        });
    })
})
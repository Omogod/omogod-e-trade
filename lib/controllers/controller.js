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
exports.generateToken = exports.logout = exports.loginUser = exports.registerUser = exports.getLoginPage = exports.getRegisterPage = exports.getProductToDelete = exports.getUpdatePageById = exports.getUpdatePage = exports.getAddProductPage = exports.deleteProductDetails = exports.updateProductDetails = exports.addProduct = exports.getProductsById = exports.getProductsN = exports.getProducts2 = exports.getProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// import { createData, findAllData, findProductById, updateData, deleteData, createNewUser, User, Product } from '../models/models';
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inputValidators_1 = require("../models/inputValidators");
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = __importDefault(require("../models/userModel"));
const models_1 = __importDefault(require("../models/models"));
const dotENV = dotenv_1.default.config();
// import { upload, fileSizeLimitErrorHandler} from '../middleware/multer'
// import { Request } from "../request";
exports.getProducts = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        let user;
        if (token) {
            user = req.cookies.user;
        }
        const { page = 1, limit = 5 } = req.query;
        const skip = (page - 1) * limit;
        const allData = yield models_1.default.find({}).skip(skip).limit(limit);
        return res.status(200).render('showProducts', { title: 'Products', data: allData, token, user: user.name });
    });
});
exports.getProducts2 = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        let user;
        if (token) {
            user = req.cookies.user;
        }
        const { page = 2, limit = 5 } = req.query;
        const skip = (page - 1) * limit;
        const allData = yield models_1.default.find({}).skip(skip).limit(limit);
        return res.status(200).render('showProducts', { title: 'Products', data: allData, token, user: user.name });
    });
});
exports.getProductsN = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page = 2, limit = 5 } = req.query;
        const skip = (page - 1) * limit;
        const data = yield models_1.default.find({}).skip(skip).limit(limit);
        return res.status(200).render('showProductsN', { title: 'Products', data });
    });
});
exports.getProductsById = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const data = models_1.default.findById(id);
        console.log(data);
        const token = req.cookies.token;
        let user;
        if (token) {
            user = req.cookies.user;
        }
        return res.status(200).render('getById', { title: "Product", data: data, token, user: user.name });
    });
});
exports.addProduct = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
        const product = models_1.default.create({
            name,
            image: req.file.path,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
        });
        // const allData = Product.find({});
        const token = req.cookies.token;
        // const user = req.user?.fullname
        let user;
        if (token) {
            user = req.cookies.user;
        }
        //  return res.status(200).render('showProducts', {title: 'Products', data: allData, token, user: user.name,});
        return res.status(200).redirect('/users');
    });
});
const updateProductDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = req.params.id
    if (!req.body) {
        res.status(400);
        throw new Error('No new data given');
    }
    // updates = req.body;
    const { name, brand, image, category, description, price, countInStock, rating, numReviews } = req.body;
    const update = {
        name,
        image: req.file.path,
        brand,
        category,
        description,
        price,
        countInStock,
        rating,
        numReviews
    };
    // const updateProduct = Product.findByIdAndUpdate(req.params.id,  {name,
    //   image,
    //   brand,
    //   category,
    //   description,
    //   userId : req.user.id,
    //   price,
    //   countInStock,
    //   rating,
    //   numReviews}, { new: true })
    // const prod = await Product.find({});
    // console.log(prod)
    const updateProduct2 = models_1.default.findOneAndUpdate({ _id: req.params.id }, update, { new: true }, function (error, success) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(success);
        }
    });
    if (updateProduct2) {
        console.log(updateProduct2);
        return res.status(200).redirect('/users');
        // return res.status(200).json({prod});
        // }
    }
});
exports.updateProductDetails = updateProductDetails;
exports.deleteProductDetails = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const deleteData = models_1.default.findOneAndDelete({ _id: id }, { new: true }, function (error, success) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(success);
            }
        });
        const data = yield models_1.default.find({});
        const token = req.cookies.token;
        let user;
        if (token) {
            user = req.cookies.user;
            return res.status(200).redirect('/users');
            // return res.status(200).render('showProducts', {title: 'Products', data, token, user: user.name,});
        }
    });
});
exports.getAddProductPage = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).render('/users/login');
        }
        let user;
        if (token) {
            user = req.cookies.user;
        }
        return res.status(200).render('addProduct', { title: 'Add Product', token, user: user.name });
    });
});
exports.getUpdatePage = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).render('login');
        }
        let user;
        if (token) {
            user = req.cookies.user;
        }
        res.status(201).render('update', { title: 'Update', token: token, user: user.name });
        // const user = req.user
    });
});
exports.getUpdatePageById = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.path.split('/')[2];
        const token = req.cookies.token;
        if (!token) {
            res.status(401).render('login');
        }
        let user;
        if (token) {
            user = req.cookies.user;
        }
        res.status(201).render('updateById', { title: 'Update', token: token, id: id, user: user.name });
    });
});
exports.getProductToDelete = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqPath = req.path;
        // const user = req.user;
        const customerId = reqPath.split('/')[3];
        const token = req.cookies.token;
        let user;
        if (token) {
            user = req.cookies.user;
        }
        res.status(201).render('deleteProduct', { title: 'Delete Product Records', token, id: customerId, user: user.name });
    });
});
/*******************************************Authentication and Authorization************************************/
exports.getRegisterPage = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(200).render('register', { title: "Register" });
    });
});
exports.getLoginPage = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(200).render('login', { title: "Login" });
    });
});
exports.registerUser = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, confirmPassword, gender, phone, address, access_token } = req.body;
        const valid = yield (0, inputValidators_1.validateUser)(name, email, password, confirmPassword, gender, phone, address, access_token);
        if (valid) {
            if (!name || !email || !password) {
                res.status(400);
                // err.status()
                throw new Error('Please add all fields');
            }
            // Check if User email exists
            const userExists = yield userModel_1.default.findOne({ email: email });
            if (userExists) {
                res.status(400);
                throw new Error('A user already exists with same email');
            }
            // Hash Password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            // Create id
            const newUser = yield userModel_1.default.create({
                name,
                email,
                password: hashedPassword,
                gender,
                phone,
                address
            });
            const nuser = yield userModel_1.default.findOne({ email });
            if (nuser) {
                const token = (0, exports.generateToken)(nuser.id);
                console.log(token);
                res.cookie('token', token);
                let user;
                if (token) {
                    user = newUser;
                    res.cookie('user', user);
                }
                console.log(newUser);
                // Store cookies
                return res.status(302).redirect('/users/login');
                // return res.status(200).redirect('/users')
            }
        }
    });
});
exports.loginUser = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const valid = yield (0, inputValidators_1.validateUserLoginDetails)(email, password);
        if (valid) {
            const user = yield userModel_1.default.findOne({ email });
            if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
                //Store cookies 
                const token = yield (0, exports.generateToken)(user.id);
                console.log(user);
                res.cookie('token', token);
                if (token) {
                    res.cookie('user', user);
                }
                res.cookie('user', user);
                console.log(token);
                return res.status(302).redirect('/users');
                // res.status(201).render('showPustomers', {token, user: user});
            }
            else {
                res.status(400);
                throw new Error('Invalid password or email');
            }
        }
    });
});
exports.logout = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.cookie('token', '');
        req.cookies.token = '';
        res.cookie('user', '');
        req.cookies.user = '';
        // res.cookie(req.cookies.token, '') 
        res.status(200).redirect('/');
    });
});
// Generate Token
const generateToken = function (_id) {
    if (process.env.APP_SECRET) {
        return jsonwebtoken_1.default.sign({ _id }, process.env.APP_SECRET, {
            expiresIn: '30d',
        });
    }
};
exports.generateToken = generateToken;
//# sourceMappingURL=controller.js.map
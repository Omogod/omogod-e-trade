// import {fetchData, writeData, fetchUsersData, writeUsersData} from '../utils/utils';
import createError, {HttpError} from 'http-errors';
import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler'
// import { createData, findAllData, findProductById, updateData, deleteData, createNewUser, User, Product } from '../models/models';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid'; 
import jwt, {JwtPayload} from 'jsonwebtoken';
import { validateUser, validateUserLoginDetails } from '../models/inputValidators';
import dotenv from 'dotenv';
import User from '../models/userModel';
import Product from '../models/models';
import { isValidObjectId } from 'mongoose';
const dotENV = dotenv.config();
// import { upload, fileSizeLimitErrorHandler} from '../middleware/multer'
// import { Request } from "../request";


export const getProducts = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
 
  let user;
  if(token){
    user = req.cookies.user
  }

  const {page = 1, limit = 5}: any = req.query;
  
  const skip = (page - 1) * limit;
      const allData = await Product.find({}).skip(skip).limit(limit);
      return res.status(200).render('showProducts', {title: 'Products', data: allData, token, user: user.name});
    
  });

  export const getProducts2 = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
   
    let user;
    if(token){
      user = req.cookies.user
    }
  
    const {page = 2, limit = 5}: any = req.query;
    
    const skip = (page - 1) * limit;
        const allData = await Product.find({}).skip(skip).limit(limit);
        return res.status(200).render('showProducts', {title: 'Products', data: allData, token, user: user.name});
      
    });


export const getProductsN = asyncHandler(async function (req:Request, res: Response, next: NextFunction) {
  const {page = 2, limit = 5}: any = req.query;
    
  const skip = (page - 1) * limit;
    const data = await Product.find({}).skip(skip).limit(limit);
    return res.status(200).render('showProductsN', {title: 'Products', data});
  });


export const getProductsById = asyncHandler(async function(req: JwtPayload, res: Response, next: NextFunction) {
  const id = req.params.id
 
  const data = Product.findById(id);
  console.log(data)
  const token = req.cookies.token
  let user;
  if(token){
    user = req.cookies.user
  }
    return res.status(200).render('getById', {title: "Product", data: data, token, user: user.name});
  });


export const addProduct = asyncHandler(async function(req: Request | JwtPayload, res: Response, next: NextFunction) {
  const {name, image, brand, category, description, price, countInStock, rating, numReviews} = req.body;
  const product = Product.create({
      name,
      image:req.file.path,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews
  })

    // const allData = Product.find({});

    const token = req.cookies.token
    // const user = req.user?.fullname
    let user;
    if(token){
      user = req.cookies.user
    }

    //  return res.status(200).render('showProducts', {title: 'Products', data: allData, token, user: user.name,});
     return res.status(200).redirect('/users');
    }
  );


  export const updateProductDetails = async (req: JwtPayload, res: Response, next: NextFunction) => {
  // const id = req.params.id

    if(!req.body){
        res.status(400);
        throw new Error('No new data given');
    }
 
    // updates = req.body;
    const {name, brand, image, category, description, price, countInStock, rating, numReviews} = req.body;
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
    }
  
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


    const updateProduct2 = Product.findOneAndUpdate({_id: req.params.id}, update, { new: true }, 
  function (error, success) {
      if (error) {
          console.log(error);
          } else {
            console.log(success);
            }})

    if (updateProduct2) {
              
    console.log(updateProduct2);

    return res.status(200).redirect('/users');
    // return res.status(200).json({prod});
  // }
}
  }



 
export const deleteProductDetails = asyncHandler(async function(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id

    const deleteData = Product.findOneAndDelete({_id: id}, { new: true }, function (error, success) {
      if (error) {
          console.log(error);
          } else {
           console.log(success);                                  
            }})
    
    const data = await Product.find({});

      const token = req.cookies.token
    let user;
    if(token){
      user = req.cookies.user
    

    return res.status(200).redirect('/users');
    // return res.status(200).render('showProducts', {title: 'Products', data, token, user: user.name,});
  }
  })


  export const getAddProductPage = asyncHandler(async function(req:JwtPayload, res: Response, next: NextFunction){
    const token = req.cookies.token
    if(!token){
      res.status(401).render('/users/login')
    }
  
    let user;
    if(token){
      user = req.cookies.user
    }
      return res.status(200).render('addProduct', {title: 'Add Product', token, user: user.name});
  })


export const getUpdatePage = asyncHandler(async function(req:JwtPayload, res: Response, next: NextFunction){

  const token = req.cookies.token
  if(!token){
    res.status(401).render('login')
  }

  let user;
  if(token){
    user = req.cookies.user
  }
  res.status(201).render('update', {title: 'Update', token: token, user: user.name});
  // const user = req.user
})


export const getUpdatePageById = asyncHandler(async function(req:JwtPayload, res: Response, next: NextFunction){
  const id = req.path.split('/')[2]
  const token = req.cookies.token
  if(!token){
    res.status(401).render('login')
  }
 
  let user;
  if(token){
    user = req.cookies.user
  }
  res.status(201).render('updateById', {title: 'Update', token: token, id: id, user: user.name});
})


export const getProductToDelete = asyncHandler(async function(req:JwtPayload, res: Response, next: NextFunction){
  const reqPath = req.path;
  // const user = req.user;
  const customerId = reqPath.split('/')[3];
  const token = req.cookies.token
  let user;
  if(token){
    user = req.cookies.user
  }
  res.status(201).render('deleteProduct', {title: 'Delete Product Records',token , id: customerId, user: user.name})
});


/*******************************************Authentication and Authorization************************************/

export const getRegisterPage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){

  return res.status(200).render('register', {title: "Register"})
})


export const getLoginPage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){

  return res.status(200).render('login', {title: "Login"})
})

export const registerUser = asyncHandler(async function(req:Request, res:Response, next:NextFunction){
  const {name, email, password, confirmPassword, gender, phone, address, access_token} = req.body
  const valid = await validateUser(name, email, password, confirmPassword, gender, phone, address, access_token)
  if(valid){
    if(!name || !email || !password){
      res.status(400);
      // err.status()
      throw new Error('Please add all fields')
    }

    // Check if User email exists
    const userExists = await User.findOne({email:email});
    if(userExists){
      res.status(400);
      throw new Error('A user already exists with same email');
    }
    
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create id
    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      phone,
      address
    });
    
    const nuser = await User.findOne({email});
    if(nuser) {
    const token = generateToken(nuser.id);
    console.log(token)
    res.cookie('token', token);
    let user;
    if (token){
      user = newUser
      res.cookie('user', user)
    }
  
    console.log(newUser)
    // Store cookies
    return res.status(200).redirect('/users/login');
    // return res.status(200).redirect('/users')
    }

  }

   
})



export const loginUser = asyncHandler(async function(req: Request, res: Response, next: NextFunction){

  const {email, password} = req.body;
  const valid = await validateUserLoginDetails(email, password)
  if (valid){

    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))){
        //Store cookies 
        const token = await generateToken(user.id);
        console.log(user)
        res.cookie('token', token);
        if (token){
          res.cookie('user', user)
        }
        res.cookie('user', user)

        

        console.log(token)
        return res.status(200).redirect('/users');
        // res.status(201).render('showPustomers', {token, user: user});
    }else{
      res.status(400);
      throw new Error('Invalid password or email');
    }
  }


})  

export const logout = asyncHandler( async function(req: Request, res: Response, next: NextFunction){


  
      res.cookie('token', '')
      req.cookies.token = ''
      res.cookie('user', '')
      req.cookies.user = ''


      // res.cookie(req.cookies.token, '') 
      
      res.status(200).redirect('/');
   
})

// Generate Token
export const generateToken = function(_id: string) {
  if(process.env. APP_SECRET ){
      return jwt.sign({_id}, process.env.APP_SECRET, {
        expiresIn: '30d',
    })
  }   
}
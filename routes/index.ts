// import { findAllData } from './../models/models';
import express, { Express, Request, Response, NextFunction } from 'express';
// import { findAllData, findProductById } from '../models/models';
// import { fetchData } from '../utils/utils';



const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  console.log(token)
  const user = req.cookies.user;
res.status(200).render('index', { title: 'Home', token, user: user?.name, });
});

export default router;

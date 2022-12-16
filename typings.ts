
interface IProduct {
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    price: string;
    countInStock: string;
    rating: string;
    numReviews: string;
}

interface InewProduct {
    _id: number;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}

interface IupdateProduct {
    _id: number;
    name?: string;
    image?: string;
    brand?: string;
    category?: string;
    description?: string;
    price?: number;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
}

// interface IProduct extends InewProduct {
//     _id: string;
// }

interface IProductReview {
    name: string;
    rating: number;
    comment: string;
}


interface Iuser{
    name: string,
    email: string,
    password: string
    gender: string,
    phone: string,
    address: string,
    role: string
  }

  declare namespace Express {
    interface Request {
      user?: Iuser;
    }
  }
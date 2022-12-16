import { JwtPayload } from 'jsonwebtoken';
import { stringify } from "querystring";
// import { fetchData, writeData, writeUpdatedData } from "../utils/utils";
import mongoose, {Schema, Document} from "mongoose";


  const productSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
      brand: {
        type: String,
        required: false,
      },
      category: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      price: {
        type: String,
        required: false,
      },
      countInStock: {
        type: String,
        required:false,
      },
      rating: {
        type: String,
        required: false,
      },
        numReviews: {
        type: String,
        required: false,
      },
      userId: {
        type: String,
        // ref: 'user',
        required: false,
      }
    },
    {
      timestamps: true,
    }
  );
  
  const Product = mongoose.model<IProduct>("product", productSchema);

  export default Product;
  


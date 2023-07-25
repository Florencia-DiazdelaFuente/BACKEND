import {model, Schema, Types} from "mongoose"

const collection = "carts";
// const schema = new Schema({ 
//         product: { type:Types.ObjectId, ref:'products', required:true },
//         quantity: { type:Number,required:true }
// })

const schema = new Schema({
        products: [{
                productId: {type: Schema.Types.ObjectId, ref: "products", required: true},
                quantity: {type: Number, required: true, min: 1}
        }]
})

const Cart = model(collection, schema)
export default Cart;
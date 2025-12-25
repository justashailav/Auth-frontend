import { useEffect } from "react";
import { getAllProducts } from "../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch=useDispatch();
  const {productList}=useSelector((state)=>state.products)

  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch])
  return (
     <div className="mt-10">
      <h1>Product List</h1>

      {productList.map((product) => (
        <div key={product._id}>
          <h3>{product.productName}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  )
}

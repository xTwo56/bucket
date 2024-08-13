import Navbar from "@/components/buy/navbar";
import ProductCard from "@/components/buy/productcard";
import axios from "axios";

export default async function Buy() {

  console.log("from buy")
  const response = await axios.get("http://localhost:3000/api/product/getallproducts");
  console.log("products: " + JSON.stringify(response.data.products))
  console.log("req sent")
  return (
    <div>
      <Navbar />
      <div>
        <ProductCard />
      </div>
    </div>
  )
}

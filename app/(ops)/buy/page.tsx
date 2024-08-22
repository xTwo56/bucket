import Navbar from "@/components/buy/navbar";
import ProductCard from "@/components/buy/productcard";
import axios from "axios";

export default async function Buy() {

  console.log("from buy")
  console.log("req sent")
  return (
    <div className="bg-gray-300 h-screen">
      <Navbar />
      <div>
        <ProductCard />
      </div>
    </div>
  )
}

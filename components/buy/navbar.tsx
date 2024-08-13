import SignIn from "./signIn";

export default function Navbar() {
  return (
    <div className="flex justify-between bg-blue-200 p-4 items-center">
      <b className="text-4xl text-blue-900">Buy</b>
      <div><SignIn /></div>
    </div>
  )
}

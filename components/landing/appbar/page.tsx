import { SignupButton } from "./signupButton";

export default function Appbar() {
  return (
    <div className="flex flex-row justify-between bg-blue-200 p-4 b-16">
      <div className="text-2xl">bucket</div>
      <div>
        <SignupButton />
      </div>
    </div>
  )

}

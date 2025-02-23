import HomePage from "@/components/Homepage/page";
import Image from "next/image";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* <HomePage></HomePage> */}
      <LoginPage/>
    </div>
  );
}

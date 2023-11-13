// app/page.tsx
import { User, Link } from "@nextui-org/react";
import { getCurrentUser } from "@/lib/session";

export default function Home() {
  const getUserInfo = () => {
    getCurrentUser().then((res) => {
      console.log('res',res);
    });
  };


  getUserInfo();
  return <div className="m-auto"></div>;
}

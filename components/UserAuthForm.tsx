// components/UserAuthForm.tsx

"use client";

import * as React from "react";
import { signIn } from "next-auth/react";


import { Button,Image} from "@nextui-org/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);

  const login = async () => {
    setIsGitHubLoading(true);
    signIn("github", { // 登录方法，第一个参数标注平台
      callbackUrl: `${window.location.origin}`, // 设置登录成功后的回调地址
    });
  };

  return (
    <div  {...props}>
      <Button
        color="primary"
        onClick={login}
        disabled={isGitHubLoading}
      >
        Github
      </Button>
    </div>
  );
}

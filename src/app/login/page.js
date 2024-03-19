"use client";

import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

import { Amplify } from "aws-amplify";
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

export default function App() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col min-h-screen mt-16">
      <Authenticator>
        {({ user: authUser }) => {
          setUser(authUser);
          return (
            <div className="flex justify-center">
              <h1>{authUser.username} Successfully Logged In</h1>
            </div>
          );
        }}
      </Authenticator>
    </div>
  );
}

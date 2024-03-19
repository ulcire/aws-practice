"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useRefresh } from "../context/RefreshContext";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profileToggle, setProfileToggle] = useState(false);
  const { refresh } = useRefresh();
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    currentAuthenticatedUser();
  }, [refresh]);

  useEffect(() => {
    currentAuthenticatedUser();
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileToggle(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          console.log("user have been signedIn successfully.");
          currentAuthenticatedUser();
          break;
        case "signedOut":
          console.log("user have been signedOut successfully.");
          break;
        case "tokenRefresh":
          console.log("auth tokens have been refreshed.");
          break;
        case "tokenRefresh_failure":
          console.log("failure while refreshing auth tokens.");
          break;
        case "signInWithRedirect":
          console.log("signInWithRedirect API has successfully been resolved.");
          break;
        case "signInWithRedirect_failure":
          console.log(
            "failure while trying to resolve signInWithRedirect API."
          );
          break;
        case "customOAuthState":
          logger.info("custom state returned from CognitoHosted UI");
          break;
      }
    });

    const hubListenerCancelToken = Hub.listen("auth", (data) => {
      console.log("Listening for all auth events: ", data.payload.data);
    });

    return () => {
      hubListenerCancelToken();
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      setUsername(username);
      setUserId(userId);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSignOut() {
    try {
      setUsername(null);
      setUserId(null);
      await signOut();
      router.push("/");
      location.reload();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  function toggleProfileOptions() {
    setProfileToggle(!profileToggle);
  }

  function handleLogin() {
    currentAuthenticatedUser().then(() => {
      if (!username) {
        router.push("/login");
      } else {
        router.push("/profile");
      }
    });
  }

  return (
    <nav className="flex items-center justify-between w-full p-4 shadow-md bg-white">
      <Link href="/" className="text-xl font-bold">
        SiteName
      </Link>
      {username ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleProfileOptions}
            className="px-4 py-2 text-blue-500 hover:text-blue-700"
          >
            Hi, {username}
          </button>
          {profileToggle && (
            <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-lg shadow-xl z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Profile
              </Link>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={handleSignOut}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 text-blue-500 hover:text-blue-700"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default NavBar;

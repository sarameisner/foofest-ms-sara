import React, { useState } from "react";
import Image from "next/image";
import backgroundCard from "../../public/pics/card.png";
import ButtonWIcon from "./ButtonWIcon";
import Star from "../../public/pics/star.svg";

export default function Modal({ isOpen, closeModal }) {
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [isSignUp, setIsSignUp] = useState(false); // Toggle for sign-up or login

  // Handle form submission for login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
    closeModal(); // Close the modal after login
  };

  // Handle form submission for sign-up
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signing up with", email, password);
    closeModal(); // Close the modal after sign-up
  };

  // Continue as guest (no login)
  const handleContinueAsGuest = () => {
    console.log("Continuing as guest");
    closeModal(); // Close the modal when continuing as guest
  };

  // Switch to sign-up form
  const switchToSignUp = () => {
    setIsSignUp(true);
  };

  // Switch to login form
  const switchToLogin = () => {
    setIsSignUp(false);
  };

  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-10 w-96 before:content-[''] before:absolute before:-top-8 before:-right-8 before:-z-10 before:w-full before:h-full before:border-[8px] before:border-[#881523] before:opacity-100 before:rounded-lg">
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundCard}
            alt="Ticket background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-lg"
          />
        </div>

        <div className="relative z-10">
          <h1 className="text-[2rem] text-center mb-4 text-white">
            {isSignUp ? "Sign Up" : "Welcome to Foo"}
          </h1>

          {/* Login or Sign-up Form */}
          <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-center items-center">
              <ButtonWIcon
                text={isSignUp ? "Sign Up" : "Login"}
                defaultIcon={<Image src={Star} alt="Star" width={20} height={20} />}
                defaultBgColor="#2c2c2a"
                type="submit" // Set the button to submit the form
              />
            </div>
          </form>

          {/* Switch between login and sign-up */}
          {!isSignUp ? (
            <p className="text-center text-sm mt-4 font-sans text-white">
              Don't have an account?{" "}
              <span
                onClick={switchToSignUp}
                className="text-white cursor-pointer font-sans"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-center text-sm mt-4 text-white">
              Already have an account?{" "}
              <span
                onClick={switchToLogin}
                className="text-white cursor-pointer"
              >
                Login
              </span>
            </p>
          )}

          {/* Continue as guest */}
          <div className="mt-4 flex justify-center text-center">
            <ButtonWIcon
              defaultIcon={<Image src={Star} alt="Star" width={20} height={20} />}
              text="Continue as guest"
              defaultBgColor="#2c2c2a"
              onClick={handleContinueAsGuest}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

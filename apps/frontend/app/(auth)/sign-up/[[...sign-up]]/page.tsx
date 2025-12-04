"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import React from "react";

const Page = () => {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center flex-row gap-4 text-sm text-gray-400">
          <Loader2Icon className="animate-spin" />
          Loading...ခနစောင့်ပေးနော်😘😘😘
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-full h-full my-5">
      <SignUp />
    </div>
  );
};

export default Page;

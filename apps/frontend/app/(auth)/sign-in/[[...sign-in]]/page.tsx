"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";

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
    <div className="flex items-center justify-center w-full my-5 h-screen">
      <SignIn />
    </div>
  );
};

export default Page;

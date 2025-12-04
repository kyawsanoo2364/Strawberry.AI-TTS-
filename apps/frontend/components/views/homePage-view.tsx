"use client";

import { use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { DEFAULT_LIMIT_CHARACTERS } from "@/lib/constants";
import { cn, countCharacters, randomEmoji } from "@/lib/utils";
import {
  DownloadIcon,
  Loader,
  LoaderPinwheel,
  RotateCcwIcon,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import axios from "axios";

const HomePageView = () => {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [isExceed, setIsExceed] = useState(false);
  const { getToken, isLoaded } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGetPermission, setIsGetPermission] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (text) {
      setCount(countCharacters(text));
    } else {
      setCount(0);
    }
  }, [text]);

  useEffect(() => {
    if (count > DEFAULT_LIMIT_CHARACTERS) {
      setIsExceed(true);
    } else {
      setIsExceed(false);
    }
  }, [count]);

  useEffect(() => {
    if (isLoaded) {
      const getPermission = async () => {
        const token = await getToken();
        try {
          setIsGetPermission(true);
          const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URI!, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status === 403) {
            setAllowed(false);
          } else {
            setAllowed(true);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsGetPermission(false);
        }
      };

      getPermission();
    }
  }, [isLoaded]);

  if (!isLoaded || isGetPermission) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-1">
          <Loader className="animate-spin" />
          <p className="text-sm text-gray-400">Authentication...</p>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-medium text-slate-600">
            Permission Denied!
          </h2>
          <p className="text-sm text-gray-400">
            You do not have permission for use. This is only for specialize
            person
          </p>
          <p className="text-xs text-gray-400">
            သင့်တွင် ဒီ AI ကို အသုံးပြုရန် ခွင့်ပြုချက်မရှိပါ။{" "}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-500 mt-4 hover:bg-blue-600 text-white cursor-pointer"
          >
            <RotateCcwIcon />
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  const generateSpeech = async () => {
    try {
      const token = await getToken();
      if (text.length === 0) return;
      setIsGenerating(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/ai/speech/standard`,
        { text },
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const audioBlob = res.data;
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "တခုခု မှားယွင်းသွားသည်။");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center w-full p-2 min-h-screen">
      <div className="flex flex-col items-center gap-1 mt-4">
        <h1 className="md:text-2xl text-lg text-center font-bold">
          Text To Speech (Only Burmese Language)
        </h1>
        <h1 className="md:text-xl text-base text-center font-bold">
          စာသားမှ အသံသို့ ပြောင်းရန် (မြန်မာဘာသာစကား အတွက်သာ)
        </h1>
      </div>
      <div className="my-4 ">
        <p className="md:text-sm text-xs text-center text-gray-400">
          စာသားများအား တခုနှင့်တခု ခြားထားပါက အသံသည် သဘာ၀ပိုကျစေရန်အတွက်
          အနည်းငယ်ရပ်မည် ခြားဖတ်ပေးမည် ဖြစ်ပြီး "။" (သို့) "၊" ထည့်ပါက
          ခနနားဖတ်ပေးမည်ဖြစ်သည်။
        </p>
      </div>
      <div className="flex items-center w-full max-w-xl mx-auto mt-5 gap-4 flex-col">
        <div className="flex flex-col w-full gap-1">
          <Textarea
            disabled={isGenerating}
            placeholder="စာသားများ ထည့်ပေးပါ...🫣"
            className="h-42"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p
            className={cn(
              "text-sm text-gray-400",
              isExceed && "text-red-500 mt-2",
            )}
          >
            {count}/{DEFAULT_LIMIT_CHARACTERS}
            {"  "}
            {isExceed && "စာသားတွေများသွားလို့ နည်းနည်းပြန်လျော့ပေးပါလား🥺"}
          </p>
        </div>
        {audioUrl && (
          <div className="my-2">
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
            </audio>
          </div>
        )}
        {!audioUrl && (
          <Button
            disabled={isExceed || isGenerating}
            className="bg-blue-500 hover:bg-blue-600 text-white hover:cursor-pointer"
            onClick={generateSpeech}
          >
            {isGenerating
              ? "Generating...ခနစောင့်ပေးနော်" + randomEmoji()
              : "အသံသို့ပြောင်းရန် နှိပ်ပါ 🤗"}
          </Button>
        )}
        {audioUrl && (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white hover:cursor-pointer"
            asChild
          >
            <a download href={audioUrl} target="_blank">
              <DownloadIcon /> Download
            </a>
          </Button>
        )}
        {audioUrl && (
          <Button
            variant={"ghost"}
            className="cursor-pointer underline"
            onClick={() => {
              setText("");
              setCount(0);
              setAudioUrl(null);
            }}
          >
            နောက်ထပ် အသံများလုပ်ရန် ဒီမှာ နှိပ်နော်😘😘😘
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomePageView;

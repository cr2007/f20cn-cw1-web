"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { KeyLengthGuess } from "@/components/keyLengthGuess";
import { Separator } from "@/components/ui/separator";
import { Encrypt } from "@/components/encrypt";

export default function Home() {
  const [ciphertext, setCiphertext] = useState(() => localStorage.getItem("ciphertext") || "");
  const [plaintext, setPlaintext] = useState(() => localStorage.getItem("plaintext") || "");
  const [cipherKey, setCipherKey] = useState(() => localStorage.getItem("cipherKey") || "");
  const [keyLength, setKeyLength] = useState(() => Number(localStorage.getItem("keyLength")) || 0);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Tabs defaultValue="keyLengthGuess" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keyLengthGuess">Key Length Guess</TabsTrigger>
            <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
            <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
          </TabsList>
          {/* Key Length Guess Tab */}
          <TabsContent value="keyLengthGuess">
            <Card>
              <CardHeader>
                <CardTitle>Vignere Cipher - Key Length Guess</CardTitle>
                <CardDescription>
                  Enter your ciphertext and your key length guess to check whether the value is valid or not
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="ciphertext">Ciphertext</Label>
                  <Textarea id="ciphertext" placeholder="Enter your ciphertext" onChange={(e) => {setCiphertext(e.target.value)}}></Textarea>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="keyLength">Key Length - Guess</Label>
                  <Input id="keyLength" placeholder="Enter your key length" type="number" onChange={(e) => {setKeyLength(Number(e.target.value))}}></Input>
                </div>
              </CardContent>
              <CardFooter>
                {/* Display the Guess */}
                {keyLength != 0 && (
                  <div className="w-full">
                    <KeyLengthGuess ciphertext={ciphertext} keyLengthGuess={keyLength}/>
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="encrypt">
            <Card>
              <CardHeader>
                <CardTitle>Vignere Cipher - Encryption</CardTitle>
                <CardDescription>
                  Enter your plaintext and your cipher key word to see your encrypted message
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="cipherKey">Cipher Key</Label>
                  <Input
                    id="cipherKey"
                    placeholder="Enter your Cipher Key"
                    type="text"
                    pattern="[A-Za-z]+"
                    title="Only alphabets are allowed"
                    value={cipherKey}
                    onKeyDown={(e) => {
                      // Prevent non-alphabet characters (including numbers) from being typed
                      if (!/[a-zA-Z]/.test(e.key)) {
                        e.preventDefault(); // Block the input of non-alphabet characters
                      }
                    }}
                    onChange={(e) => {
                      setCipherKey(e.target.value);
                      localStorage.setItem("cipherKey", e.target.value);
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="plaintext">Plain text</Label>
                  <Textarea
                    id="plaintext"
                    placeholder="Enter your plaintext to encrypt"
                    value={plaintext}
                    onChange={(e) => {
                      setPlaintext(e.target.value);
                      localStorage.setItem("plaintext", e.target.value); // Save to local storage
                    }}
                  />
                </div>
              </CardContent>
              <Separator className="w-[350px] mx-auto" />
              <CardFooter>
                {/* Display the Ciphertext */}
                {cipherKey != "" && plaintext != "" && (
                  <div className="w-full">
                    <Encrypt plaintext={plaintext} cipherKey={cipherKey} />
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div> */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

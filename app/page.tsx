"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { KeyLengthGuess } from "@/components/keyLengthGuess";
import { Separator } from "@/components/ui/separator";

import { Encrypt } from "@/components/encrypt";
import { Decrypt } from "@/components/decrypt";
import { ModeToggle } from "@/components/modeToggle";

export default function Home() {
  const [ciphertext, setCiphertext] = useState("");
  const [plaintext, setPlaintext] = useState("");
  const [cipherKey, setCipherKey] = useState("");
  const [keyLength, setKeyLength] = useState(0);
  const [hydrated, setHydrated] = useState(false); // Prevent SSR access to localStorage

  useEffect(() => {
    setCiphertext(localStorage.getItem("ciphertext") || "");
    setPlaintext(localStorage.getItem("plaintext") || "");
    setCipherKey(localStorage.getItem("cipherKey") || "");
    setKeyLength(Number(localStorage.getItem("cipherKey")) || 0);
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ModeToggle />
        <Tabs defaultValue="keyLengthGuess" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keyLengthGuess">Key Length Guess</TabsTrigger>
            <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
            <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
          </TabsList>
          {/* Key Length Guess Tab */}
          <TabsContent value="keyLengthGuess">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Vignere Cipher - Key Length Guess</CardTitle>
                <CardDescription>
                  Enter your ciphertext and your key length guess to check
                  whether your guess was a possible key length to break this
                  ciphertext.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="ciphertext">Ciphertext</Label>
                  <Textarea
                    id="ciphertext"
                    placeholder="Enter your ciphertext"
                    className="break-words whitespace-pre-wrap"
                    value={ciphertext}
                    onChange={(e) => {
                      setCiphertext(e.target.value);
                      localStorage.setItem("ciphertext", e.target.value);
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="keyLength">Key Length - Guess</Label>
                  <Input
                    id="keyLength"
                    placeholder="Enter your key length"
                    type="number"
                    onChange={(e) => {
                      setKeyLength(Number(e.target.value));
                      localStorage.setItem("keyLength", e.target.value);
                    }}
                  />
                </div>
              </CardContent>
              <Separator className="w-[350px] mx-auto" />
              <CardFooter>
                {/* Display the Guess */}
                {keyLength != 0 && ciphertext != "" && (
                  <div className="w-full">
                    <KeyLengthGuess
                      ciphertext={ciphertext}
                      keyLengthGuess={keyLength}
                    />
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="encrypt">
            <Card className="w-full max-w-4xl mx-auto">
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
                    className="break-words whitespace-pre-wrap"
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
          <TabsContent value="decrypt">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Vignere Cipher - Decryption</CardTitle>
                <CardDescription>
                  Enter your ciphertext and your cipher key word to see your decrypted message
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
                  <Label htmlFor="ciphertext">Cipher text</Label>
                  <Textarea
                    id="ciphertext"
                    placeholder="Enter your ciphertext to encrypt"
                    className="break-words whitespace-pre-wrap"
                    value={ciphertext}
                    onChange={(e) => {
                      setCiphertext(e.target.value);
                      localStorage.setItem("ciphertext", e.target.value); // Save to local storage
                    }}
                  />
                </div>
              </CardContent>
              <Separator className="w-[350px] mx-auto" />
              <CardFooter>
                {/* Display the Decrypted Plaintext */}
                {cipherKey != "" && ciphertext != "" && (
                  <div className="w-full">
                    <Decrypt ciphertext={ciphertext} cipherKey={cipherKey} />
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/cr2007/F20CN-CW1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/f20cn-cw1-web/github-mark.svg"
            alt="GitHub Logo"
            className="dark:invert"
            width={32}
            height={32}
          />
          Coursework Source Code
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/cr2007/F20CN-CW1-web"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/f20cn-cw1-web/github-mark.svg"
            alt="GitHub Logo"
            className="dark:invert"
            width={32}
            height={32}
          />
          Web App Source Code
        </a>
      </footer>
    </div>
  );
}

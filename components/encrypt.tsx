import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Clipboard, } from "lucide-react";

const isLetter: (character: string) => boolean = (character) => character.length === 1 && !!character.match(/[a-zA-Z]/i);

const isUppercase: (char: string) => boolean = (char) => char === char.toUpperCase();

interface VigenereEncrypt {
  plaintext: string;
  cipherKey: string;
}

export const Encrypt: React.FC<VigenereEncrypt> = ({
  plaintext,
  cipherKey,
}) => {
    const [copied, setCopied] = useState(false);

  let ciphertext: string = "";
  let cipherKeyIndex: number = 0;

  for (const char of plaintext) {
    if (isLetter(char)) {
      ciphertext += isUppercase(char)
        ? String.fromCharCode(((char.charCodeAt(0) + cipherKey.toUpperCase().charCodeAt(cipherKeyIndex) - 2 * 65) % 26) + 65)  // A: 65
        : String.fromCharCode(((char.charCodeAt(0) + cipherKey.toLowerCase().charCodeAt(cipherKeyIndex) - 2 * 97) % 26) + 97 ); // a: 97
    } else
        ciphertext += char

    cipherKeyIndex = ++cipherKeyIndex % cipherKey.length;
  }

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(ciphertext).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="text-center space-y-4">
      <p className="leading-7 break-words whitespace-pre-wrap">{ciphertext}</p>
      <Button onClick={copyToClipboard} className="px-4 py-2" variant="outline" size="icon">
        {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
      </Button>
    </div>
  );
};

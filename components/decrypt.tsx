import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Clipboard, } from "lucide-react";

const isLetter: (character: string) => boolean = (character) => character.length === 1 && !!character.match(/[a-zA-Z]/i);

const isUppercase: (char: string) => boolean = (char) => char === char.toUpperCase();

interface VigenereEncrypt {
  ciphertext: string;
  cipherKey: string;
}

export const Decrypt: React.FC<VigenereEncrypt> = ({
  ciphertext,
  cipherKey,
}) => {
    const [copied, setCopied] = useState(false);

  let plaintext: string = "";
  let cipherKeyIndex: number = 0;

  for (const char of ciphertext) {
    if (isLetter(char)) {
      plaintext += isUppercase(char)
        ? String.fromCharCode(90 - (25 - (char.charCodeAt(0) - cipherKey.toUpperCase().charCodeAt(cipherKeyIndex))) % 26)
        : String.fromCharCode(122 - (25 - (char.charCodeAt(0) - cipherKey.toLowerCase().charCodeAt(cipherKeyIndex))) % 26);
    } else
      plaintext += char;

    cipherKeyIndex = ++cipherKeyIndex % cipherKey.length;
  }

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(plaintext).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="text-center space-y-4">
      <p className="leading-7 break-words whitespace-pre-wrap">{plaintext}</p>
      <Button onClick={copyToClipboard} className="px-4 py-2" variant="outline" size="icon">
        {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
      </Button>
    </div>
  );
};

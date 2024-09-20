"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import Flag from "react-world-flags";

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", label: "English", flag: "GB" },
  { code: "da", label: "Danish", flag: "DK" },
  { code: "de", label: "German", flag: "DE" },
];

export function LanguageSelector() {
  const router = useRouter(); // Initialize useRouter
  const [mounted, setMounted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
  
    // Get the current path
    const currentPath = window.location.pathname;
  
    // Remove existing locale from the path
    const updatedPath = currentPath.replace(/^\/(en|da|de)(\/.*)?/, `/${lang}`);
  
    // Redirect to the updated path
    router.push(updatedPath);
  };
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={selectedLanguage === lang.code ? "font-bold" : ""}
          >
            <Flag code={lang.flag} className="mr-2 h-4 w-4 rounded-sm" />
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

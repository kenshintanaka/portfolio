"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl"; // Import next-intl hooks

interface Language {
  code: string;
  label: string;
  flag: string;
}

export function LanguageSelector() {
  const router = useRouter();
  const currentLocale = useLocale(); // Get the current locale
  const t = useTranslations("languageSelector"); // Load translations from JSON
  const [mounted, setMounted] = useState(false);

  const languages: Language[] = [
    { code: "en", label: t("languages.en"), flag: "GB" }, // Dynamically translated
    { code: "da", label: t("languages.da"), flag: "DK" }, // Dynamically translated
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (lang: string) => {
    if (lang === currentLocale) return; // Prevent unnecessary changes

    const currentPath = window.location.pathname;

    // Remove the current locale from the path (if exists)
    const pathWithoutLocale = currentPath.replace(`/${currentLocale}`, "");

    // Build the new path with the selected language
    const updatedPath = `/${lang}${pathWithoutLocale}`;

    // Redirect to the new path
    router.push(updatedPath);
  };

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("title")}>
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLocale === lang.code ? "font-bold" : ""}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

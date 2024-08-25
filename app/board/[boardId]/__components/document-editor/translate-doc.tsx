import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Markdown from "react-markdown";
import { LanguagesIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import * as Y from "yjs";
import { Skeleton } from "@/components/ui/skeleton";
import useAuthenticatedFetch from "@/hooks/use-authenticated-fetch";
interface TranslateDocProps {
  doc: Y.Doc;
}

type Language = "hindi" | "english" | "spanish" | "chinese";
const languages: Language[] = ["chinese", "english", "hindi", "spanish"];
const TranslateDoc = ({ doc }: TranslateDocProps) => {
  const { authenticatedFetch } = useAuthenticatedFetch();
  const [language, setLanguage] = useState("");
  const [summary, setSummary] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const document = doc.get("document-store").toJSON();
      console.log(document);
      const res = await authenticatedFetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/translate-doc",
        {
          method: "POST",
          body: JSON.stringify({
            document,
            targetLang: language,
          }),
        }
      );
      if (res.ok) {
        const { translated_text } = await res.json();
        setSummary(translated_text);
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <LanguagesIcon />
          &nbsp;Translate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Translate Document</DialogTitle>
          <DialogDescription>
            Select a language and AI will translate a summary of the document in
            the selected language
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {(isPending || summary) && (
            <div className="border p-3 rounded-md max-h-72 overflow-y-auto overflow-x-hidden">
              {isPending ? (
                <div className="w-full space-y-2">
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-full h-[20px]" />
                  <Skeleton className="w-3/4 h-[20px]" />
                </div>
              ) : (
                summary && <Markdown>{summary}</Markdown>
              )}
            </div>
          )}

          <form onSubmit={handleAskQuestion} className="flex gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={!language || isPending}>
              {isPending ? "Translating..." : "Translate"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TranslateDoc;

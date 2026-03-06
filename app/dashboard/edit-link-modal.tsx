"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction } from "./actions";

type FieldErrors = { url?: string[]; shortCode?: string[] };

type Link = {
  id: number;
  url: string;
  shortCode: string;
};

interface EditLinkModalProps {
  link: Link;
  open: boolean;
  onClose: () => void;
}

export function EditLinkModal({ link, open, onClose }: EditLinkModalProps) {
  const [url, setUrl] = useState(link.url);
  const [shortCode, setShortCode] = useState(link.shortCode);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setUrl(link.url);
      setShortCode(link.shortCode);
      setFieldErrors(null);
      setGeneralError(null);
    }
  }, [open, link]);

  function handleClose() {
    if (isPending) return;
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors(null);
    setGeneralError(null);

    startTransition(async () => {
      const result = await updateLinkAction({ id: link.id, url, shortCode });

      if ("error" in result) {
        if (typeof result.error === "string") {
          setGeneralError(result.error);
        } else {
          setFieldErrors(result.error);
        }
        return;
      }

      onClose();
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-url">Destination URL</Label>
            <Input
              id="edit-url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            {fieldErrors?.url && (
              <p className="text-xs text-red-500">{fieldErrors.url[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-shortCode">Short code</Label>
            <Input
              id="edit-shortCode"
              placeholder="e.g. my-link"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              required
            />
            {fieldErrors?.shortCode && (
              <p className="text-xs text-red-500">{fieldErrors.shortCode[0]}</p>
            )}
          </div>
          {generalError && (
            <p className="text-xs text-red-500">{generalError}</p>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

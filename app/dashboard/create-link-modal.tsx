"use client";

import { useState, useTransition } from "react";
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
import { createLinkAction } from "./actions";

type FieldErrors = { url?: string[]; shortCode?: string[] };

export function CreateLinkModal() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClose() {
    if (isPending) return;
    setOpen(false);
    setUrl("");
    setShortCode("");
    setFieldErrors(null);
    setGeneralError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors(null);
    setGeneralError(null);

    startTransition(async () => {
      const result = await createLinkAction({ url, shortCode });

      if ("error" in result) {
        if (typeof result.error === "string") {
          setGeneralError(result.error);
        } else {
          setFieldErrors(result.error);
        }
        return;
      }

      handleClose();
      router.refresh();
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Link</Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new short link</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="url">Destination URL</Label>
              <Input
                id="url"
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
              <Label htmlFor="shortCode">Short code</Label>
              <Input
                id="shortCode"
                placeholder="e.g. my-link"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
                required
              />
              {fieldErrors?.shortCode && (
                <p className="text-xs text-red-500">
                  {fieldErrors.shortCode[0]}
                </p>
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
                {isPending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

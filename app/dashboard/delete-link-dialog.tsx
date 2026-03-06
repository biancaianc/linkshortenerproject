"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteLinkAction } from "./actions";

type Link = {
  id: number;
  shortCode: string;
};

interface DeleteLinkDialogProps {
  link: Link;
  open: boolean;
  onClose: () => void;
}

export function DeleteLinkDialog({ link, open, onClose }: DeleteLinkDialogProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await deleteLinkAction({ id: link.id });
      onClose();
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={isPending ? () => {} : onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete link</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Are you sure you want to delete{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            /{link.shortCode}
          </span>
          ? This action cannot be undone.
        </p>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

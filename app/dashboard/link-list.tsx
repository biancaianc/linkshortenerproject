"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditLinkModal } from "./edit-link-modal";
import { DeleteLinkDialog } from "./delete-link-dialog";

type Link = {
  id: number;
  url: string;
  shortCode: string;
  createdAt: Date;
};

interface LinkListProps {
  links: Link[];
}

export function LinkList({ links }: LinkListProps) {
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingLink, setDeletingLink] = useState<Link | null>(null);

  return (
    <>
      <ul className="w-full max-w-2xl divide-y divide-zinc-200 dark:divide-zinc-800">
        {links.map((link) => (
          <li key={link.id} className="flex items-center justify-between gap-4 py-4">
            <div className="flex flex-col gap-1 overflow-hidden">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline truncate"
              >
                {link.url}
              </a>
              <span className="text-sm text-zinc-500">/{link.shortCode}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-zinc-400">
                {new Date(link.createdAt).toLocaleDateString()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingLink(link)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => setDeletingLink(link)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {editingLink && (
        <EditLinkModal
          link={editingLink}
          open={true}
          onClose={() => setEditingLink(null)}
        />
      )}

      {deletingLink && (
        <DeleteLinkDialog
          link={deletingLink}
          open={true}
          onClose={() => setDeletingLink(null)}
        />
      )}
    </>
  );
}

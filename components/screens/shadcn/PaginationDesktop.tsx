"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@shadcn/components/ui/pagination";

interface PaginationLinkType {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationType {
  current_page: number;
  last_page: number;
  links: PaginationLinkType[];
}

interface PaginationDesktopProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export function PaginationDesktop({
  pagination,
  onPageChange,
}: PaginationDesktopProps) {
  return (
    <Pagination aria-label="Pagination" className="flex w-full">
      <PaginationContent className="ml-auto flex items-center gap-2">
        {pagination.current_page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pagination.current_page - 1);
              }}
            />
          </PaginationItem>
        )}

        {pagination.links
          .filter((link) => !isNaN(Number(link.label)))
          .map((link, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={link.active}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.url) {
                    const page = new URL(link.url).searchParams.get("page");
                    if (page) onPageChange(Number(page));
                  }
                }}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Tombol Next */}
        {pagination.current_page < pagination.last_page && (
          <PaginationItem>
            <PaginationNext
              href="#"
              className="mx-1"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pagination.current_page + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

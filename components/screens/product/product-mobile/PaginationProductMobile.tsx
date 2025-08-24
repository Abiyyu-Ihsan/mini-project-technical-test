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

interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Meta {
  current_page: number;
  last_page: number;
  per_page?: number;   
  total?: number;      
  links: MetaLink[];
}

interface PaginationMobileProps {
  meta: Meta | null;
  onPageChange: (page: number) => void;
}

export function PaginationMobile({ meta, onPageChange }: PaginationMobileProps) {
  if (!meta) return null;

  const { current_page, last_page, links } = meta;

  const handlePreviousClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (current_page > 1) {
      onPageChange(current_page - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (current_page < last_page) {
      onPageChange(current_page + 1);
    }
  };

  const handlePageClick = (e: React.MouseEvent, pageNum: number) => {
    e.preventDefault();
    onPageChange(pageNum);
  };

  return (
    <Pagination>
      <PaginationContent className="ml-auto flex items-center mr-3 mb-8">
        {/* Previous */}
        {current_page > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={handlePreviousClick}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}

        {/* Nomor Halaman */}
        {links.slice(1, -1).map((link, index) => {
          const pageNum = Number(link.label);
          if (isNaN(pageNum)) return null;

          return (
            <PaginationItem key={`page-${pageNum}`}>
              <PaginationLink
                onClick={(e) => handlePageClick(e, pageNum)}
                isActive={link.active}
                className="cursor-pointer"
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        {current_page < last_page && (
          <PaginationItem>
            <PaginationNext 
              onClick={handleNextClick}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
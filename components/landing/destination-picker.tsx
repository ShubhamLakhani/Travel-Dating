"use client";

import * as React from "react";
import { Search, MapPin, X } from "lucide-react";
import { DestinationOption } from "@/types/trip";
import { searchDestinations } from "@/lib/destinations/validation-destinations.ts";
import { Modal } from "@/components/ui/modal";

interface DestinationPickerProps {
  onClose: () => void;
  onSelect: (destination: DestinationOption) => void;
  selectedDestination: DestinationOption | null;
}

export function DestinationPicker({
  onClose,
  onSelect,
  selectedDestination,
}: DestinationPickerProps) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const results = React.useMemo(() => {
    return searchDestinations(query);
  }, [query]);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Where are you heading?"
      description="Select your travel destination"
      size="md"
      initialFocusRef={inputRef}
    >
      <div className="flex flex-col">
        {/* Search Input */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative flex items-center">
            <Search
              className="absolute left-3.5 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city or destination"
              aria-label="Search city or destination"
              className="w-full pl-10 pr-4 py-3 text-sm text-[var(--foreground)] bg-[var(--surface-muted)] rounded-[var(--radius-input)] border border-[var(--border)] focus-visible:outline-2 focus-visible:outline-[var(--focus)] transition-colors placeholder:text-[var(--muted-foreground)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search query"
                className="absolute right-3 p-1 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Destination List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
            Suggested destinations
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--muted-foreground)]">
              No matching destinations found in validation catalogue.
            </div>
          ) : (
            results.map((dest) => {
              const isSelected = selectedDestination?.id === dest.id;
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => onSelect(dest)}
                  className={`w-full text-left flex items-center gap-3.5 px-3.5 py-3 rounded-[var(--radius-button)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "bg-[var(--travel-accent)] text-[#1C3F5E]"
                      : "hover:bg-[var(--surface-muted)] text-[var(--foreground)]"
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-[#1C3F5E]/15 text-[#1C3F5E]"
                        : "bg-[var(--surface-muted)] text-[var(--primary)]"
                    }`}
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{dest.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)] truncate">
                      {dest.country}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#1C3F5E]/10 text-[#1C3F5E]">
                      Selected
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
}

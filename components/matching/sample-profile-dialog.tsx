"use client";

import { Heart, MapPin, Calendar, Compass } from "lucide-react";
import { SampleMatch, INTENTION_LABELS, INTEREST_LABELS } from "@/lib/validation/sample-profiles.ts";
import { formatSingleDateDisplay } from "@/lib/validation/trip-dates.ts";
import { TripOverlapTimeline } from "./trip-overlap-timeline";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SampleProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  match: SampleMatch;
  userArrival: string;
  userDeparture: string;
  onInterested: (match: SampleMatch) => void;
}

export function SampleProfileDialog({
  isOpen,
  onClose,
  match,
  userArrival,
  userDeparture,
  onInterested,
}: SampleProfileDialogProps) {
  const { profile, destination, arrivalDate, departureDate } = match;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span>{profile.name}, {profile.age}</span>
          <Badge variant="neutral" className="text-[10px] tracking-normal uppercase">
            Example profile
          </Badge>
        </div>
      }
      description={`${profile.homeCity}, ${profile.homeCountry}`}
      size="lg"
    >
      <div className="p-5 sm:p-6 flex flex-col gap-6">
        {/* Profile Avatar Banner */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)]">
          <div
            style={{ backgroundColor: profile.avatarColor }}
            className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-md shrink-0 select-none"
            aria-hidden="true"
          >
            {profile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-bold text-[var(--foreground)] truncate">
                {profile.name}, {profile.age}
              </h3>
            </div>
            <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5 mt-0.5">
              <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
              <span>From {profile.homeCity}, {profile.homeCountry}</span>
            </div>
            <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5 mt-0.5">
              <Compass className="h-3.5 w-3.5 text-[#1C3F5E]" aria-hidden="true" />
              <span>Traveling {profile.travelMode === "solo" ? "Solo" : "With Friends"}</span>
            </div>
          </div>
        </div>

        {/* Trip & Overlap Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
              <span>{destination.name} Trip Dates</span>
            </span>
            <span className="text-[var(--muted-foreground)]">
              {formatSingleDateDisplay(arrivalDate)} &ndash; {formatSingleDateDisplay(departureDate)}
            </span>
          </div>

          <TripOverlapTimeline
            userArrival={userArrival}
            userDeparture={userDeparture}
            otherArrival={arrivalDate}
            otherDeparture={departureDate}
            otherName={profile.name}
            destinationName={destination.name}
          />
        </div>

        {/* About Bio */}
        <div className="flex flex-col gap-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
            About
          </div>
          <p className="text-sm text-[var(--foreground)]/90 leading-relaxed italic bg-[var(--surface-muted)]/60 border border-[var(--border)] p-3.5 rounded-xl">
            &ldquo;{profile.shortBio}&rdquo;
          </p>
        </div>

        {/* Travel Style / Interests */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
            Travel Style &amp; Interests
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--travel-accent)] text-[#1C3F5E] border border-[#1C3F5E]/15"
              >
                {INTEREST_LABELS[interest] || interest}
              </span>
            ))}
          </div>
        </div>

        {/* Looking For / Intentions */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
            Looking For
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.intentions.map((intention) => (
              <span
                key={intention}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)]"
              >
                {INTENTION_LABELS[intention] || intention}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-end gap-3">
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            className="text-sm rounded-[var(--radius-button)]"
          >
            Close
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onClose();
              onInterested(match);
            }}
            rightIcon={<Heart className="h-4 w-4 fill-white ml-1.5" aria-hidden="true" />}
            className="text-sm font-semibold rounded-[var(--radius-button)] px-6"
          >
            Interested
          </Button>
        </div>
      </div>
    </Modal>
  );
}

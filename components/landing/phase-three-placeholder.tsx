import { ArrowLeft, MapPin, Calendar, Compass } from "lucide-react";
import { TripSearchDraft } from "@/types/trip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  calculateTripNights,
  formatDateRangeDisplay,
} from "@/lib/validation/trip-dates";

interface PhaseThreePlaceholderProps {
  draft: TripSearchDraft;
  onEditTrip: () => void;
}

export function PhaseThreePlaceholder({
  draft,
  onEditTrip,
}: PhaseThreePlaceholderProps) {
  const nights =
    draft.arrivalDate && draft.departureDate
      ? calculateTripNights(draft.arrivalDate, draft.departureDate)
      : 0;

  return (
    <div className="w-full max-w-xl mx-auto py-8 sm:py-12 animate-in fade-in duration-300">
      <Card className="text-center p-6 sm:p-8">
        <CardHeader className="items-center">
          <Badge variant="travel" className="mb-3">
            Phase 3 Boundary
          </Badge>
          <div className="h-12 w-12 rounded-full bg-[var(--travel-accent)] text-[#1C3F5E] flex items-center justify-center mb-2">
            <Compass className="h-6 w-6" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">
            Finding travelers around your trip comes next.
          </CardTitle>
          <CardDescription className="max-w-md mx-auto pt-2">
            Trip search state captured successfully. The match preview and compatibility experience will be built in Phase 3.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 pt-4">
          {/* Captured Trip Details */}
          <div className="bg-[var(--surface-muted)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 text-left flex flex-col gap-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Your Validation Trip
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)] flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs text-[var(--muted-foreground)]">Destination</div>
                <div className="font-semibold text-sm sm:text-base text-[var(--foreground)]">
                  {draft.destination?.label || "Unknown destination"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[var(--surface)] text-[#1C3F5E] border border-[var(--border)] flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-[var(--muted-foreground)]">Travel Dates</div>
                <div className="font-semibold text-sm sm:text-base text-[var(--foreground)] flex items-center gap-2">
                  <span>
                    {formatDateRangeDisplay(draft.arrivalDate, draft.departureDate)}
                  </span>
                  {nights > 0 && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--travel-accent)] text-[#1C3F5E]">
                      {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action to modify search */}
          <div className="flex justify-center pt-2">
            <Button
              variant="secondary"
              size="md"
              onClick={onEditTrip}
              leftIcon={<ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />}
              className="text-sm rounded-[var(--radius-button)]"
            >
              Modify Trip Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

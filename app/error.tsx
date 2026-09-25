"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors in development
    if (process.env.NODE_ENV === "development") {
      console.error("[Roam Application Error]", error);
    }
  }, [error]);

  return (
    <main className="flex-1 flex flex-col justify-center items-center py-16">
      <Section spacing="sm">
        <Container size="narrow">
          <Card className="text-center">
            <CardHeader className="items-center">
              <Badge variant="primary" className="mb-2">
                Error
              </Badge>
              <CardTitle>Something Went Wrong</CardTitle>
              <CardDescription>
                An unexpected issue occurred while rendering this view.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pt-2">
              <Button variant="primary" size="md" onClick={() => reset()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}

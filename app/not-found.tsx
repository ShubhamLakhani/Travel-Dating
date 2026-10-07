import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center py-16">
      <Section spacing="sm">
        <Container size="narrow">
          <Card className="text-center">
            <CardHeader className="items-center">
              <Badge variant="primary" className="mb-2">
                404
              </Badge>
              <CardTitle>Destination Not Found</CardTitle>
              <CardDescription>
                The page or route you are looking for does not exist on Triply.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pt-2">
              <Link href="/">
                <Button variant="primary" size="md">
                  Return to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}

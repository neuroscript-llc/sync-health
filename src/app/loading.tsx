import { PageShell, SectionsSkeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <PageShell>
      <SectionsSkeleton blocks={2} />
    </PageShell>
  );
}

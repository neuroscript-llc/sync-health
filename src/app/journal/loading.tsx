import { PageShell, GridSkeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <PageShell>
      <GridSkeleton cards={6} />
    </PageShell>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export default function NotFound() {
  return (
    <div>
      <PageHeader
        title="That page is not in the playbook"
        description="The link may be out of date, or the guide may have been renamed. Try the search (press /) or go back to the dashboard."
      />
      <div className="flex gap-2">
        <Button render={<Link href="/" />}>Back to dashboard</Button>
        <Button variant="outline" render={<Link href="/guides" />}>
          All guides
        </Button>
      </div>
    </div>
  );
}

import HomePage from "@/components/home-page";
import SiteShell from "@/components/site-shell";
import { getColeContent } from "@/lib/content";

export default async function Page() {
  const { salidas, viajes } = await getColeContent();
  return (
    <SiteShell>
      <HomePage salidas={salidas} viajes={viajes} />
    </SiteShell>
  );
}

import { EventGrid } from "@/components/interactive-events";
import SiteShell from "@/components/site-shell";
import { getColeContent } from "@/lib/content";

export const metadata = {
  title: "Eventos | Cole Together",
  description: "Todas las salidas y eventos de Cole Together."
};

export default async function EventosPage() {
  const { salidas } = await getColeContent();

  return (
    <SiteShell>
      <section className="section-block section-block-first">
        <div className="section-head">
          <p className="eyebrow">Eventos y salidas</p>
          <h1>Todos los eventos de Cole Together</h1>
          <p className="lead">
            Selecciona cualquier evento para ver informacion completa, detalle de precio, incluye y plan.
          </p>
        </div>
        <EventGrid items={salidas} />
      </section>
    </SiteShell>
  );
}

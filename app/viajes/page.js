import { EventGrid } from "@/components/interactive-events";
import SiteShell from "@/components/site-shell";
import { getColeContent } from "@/lib/content";

export const metadata = {
  title: "Viajes | Cole Together",
  description: "Todos los viajes economicos de Cole Together."
};

export default async function ViajesPage() {
  const { viajes } = await getColeContent();

  return (
    <SiteShell>
      <section className="section-block section-block-first">
        <div className="section-head">
          <p className="eyebrow">Viajes economicos</p>
          <h1>Todos los viajes publicados</h1>
          <p className="lead">
            Explora destinos, fechas y presupuesto. Haz click en cada viaje para ver el detalle completo.
          </p>
        </div>
        <EventGrid items={viajes} />
      </section>
    </SiteShell>
  );
}

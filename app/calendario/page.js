import { EventCalendar } from "@/components/interactive-events";
import SiteShell from "@/components/site-shell";
import { getColeContent } from "@/lib/content";

export const metadata = {
  title: "Calendario | Cole Together",
  description: "Calendario de salidas y viajes de Cole Together."
};

export default async function CalendarioPage() {
  const { salidas, viajes } = await getColeContent();
  const allEvents = [...salidas, ...viajes];

  return (
    <SiteShell>
      <section className="section-block section-block-first">
        <div className="section-head">
          <p className="eyebrow">Agenda general</p>
          <h1>Calendario de eventos y viajes</h1>
          <p className="lead">
            Visualiza todas las fechas en orden. Haz click en cualquier item para ver la informacion completa.
          </p>
        </div>
        <EventCalendar items={allEvents} />
      </section>
    </SiteShell>
  );
}

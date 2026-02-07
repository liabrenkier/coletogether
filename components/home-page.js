import Link from "next/link";
import { formatRange } from "@/lib/date-format";
import { homeHeroImage, resolveEventImage } from "@/lib/image-fallback";

function HomePreviewCard({ evento }) {
  return (
    <article className="event-card">
      <div className="event-image-wrap">
        <img src={resolveEventImage(evento)} alt={evento.titulo} loading="lazy" className="event-image" />
      </div>
      <div className="event-body">
        <span className={`type ${evento.tipo}`}>{evento.tipo}</span>
        <h3>{evento.titulo}</h3>
        <p className="meta">
          {formatRange(evento.fechaInicio, evento.fechaFin)} | {evento.lugar}
        </p>
        <p className="meta">Desde {evento.precio}</p>
        <p className="desc">{evento.descripcion}</p>
      </div>
    </article>
  );
}

export default function HomePage({ salidas, viajes }) {
  const proximasSalidas = salidas.slice(0, 3);
  const proximosViajes = viajes.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Comunidad activa desde hace anos</p>
          <h1>Conoce gente, pasa un gran momento y sumate a planes que valen la pena.</h1>
          <p>
            En Cole Together armamos salidas, eventos y viajes economicos para que disfrutes de verdad:
            risas, nuevas amistades y experiencias bien organizadas.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href="/eventos">
              Ver eventos
            </Link>
            <Link className="btn btn-secondary" href="/viajes">
              Explorar viajes
            </Link>
          </div>
        </div>
        <div className="hero-media reveal">
          <div className="hero-photo-wrap">
            <img src={homeHeroImage} alt="Grupo de Cole Together en una salida" className="hero-photo" />
            <span className="hero-photo-chip">Veni a pasarla bien con Cole Together</span>
          </div>
          <div className="hero-cards">
            <article className="mini-card">
              <h3>+6 anos de comunidad</h3>
              <p>Eventos continuos y grupos activos todo el ano.</p>
            </article>
            <article className="mini-card">
              <h3>Precios claros</h3>
              <p>Valores finales publicados para decidir rapido y sin vueltas.</p>
            </article>
            <article className="mini-card">
              <h3>Coordinacion simple</h3>
              <p>Info clara, fechas ordenadas y contacto directo por WhatsApp.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-head section-head-inline">
          <div>
            <p className="eyebrow">Proximos eventos</p>
            <h2>Salidas para cortar la rutina</h2>
          </div>
          <Link className="btn btn-secondary" href="/eventos">
            Ver todos
          </Link>
        </div>
        <div className="card-grid">
          {proximasSalidas.map((evento) => (
            <HomePreviewCard key={evento.id} evento={evento} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head section-head-inline">
          <div>
            <p className="eyebrow">Viajes economicos</p>
            <h2>Escapadas grupales con presupuesto cuidado</h2>
          </div>
          <Link className="btn btn-secondary" href="/viajes">
            Ver todos
          </Link>
        </div>
        <div className="card-grid">
          {proximosViajes.map((evento) => (
            <HomePreviewCard key={evento.id} evento={evento} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head section-head-inline">
          <div>
            <p className="eyebrow">Agenda general</p>
            <h2>Organizacion simple por fecha</h2>
          </div>
          <Link className="btn btn-secondary" href="/calendario">
            Abrir calendario
          </Link>
        </div>
      </section>
    </>
  );
}

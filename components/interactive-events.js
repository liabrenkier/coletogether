"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDate, formatRange, formatRangeCompact } from "@/lib/date-format";
import { resolveEventImage } from "@/lib/image-fallback";

function DetailPanel({ evento, onClose }) {
  if (!evento) return null;

  return (
    <>
      <button
        type="button"
        className={`detail-backdrop ${evento ? "open" : ""}`}
        aria-hidden={evento ? "false" : "true"}
        onClick={onClose}
      />
      <aside className={`detail-panel ${evento ? "open" : ""}`} aria-hidden={evento ? "false" : "true"}>
        <button type="button" className="detail-close" aria-label="Cerrar detalle" onClick={onClose}>
          X
        </button>
        <div className="detail-image-wrap">
          <img src={resolveEventImage(evento)} alt={evento.titulo} className="detail-image" />
        </div>
        <div className="detail-head">
          <span className={`type ${evento.tipo}`}>{evento.tipo}</span>
          <h3>{evento.titulo}</h3>
          <p className="detail-meta">
            {formatRange(evento.fechaInicio, evento.fechaFin)} | {evento.lugar}
          </p>
          <p className="detail-meta">
            <strong>Precio:</strong> {evento.precio}
          </p>
        </div>
        <div className="detail-block">
          <h4>Descripcion</h4>
          <p>{evento.descripcion}</p>
        </div>
        <div className="detail-block">
          <h4>Incluye</h4>
          <ul>
            {evento.incluye.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="detail-block">
          <h4>No incluye</h4>
          <ul>
            {evento.noIncluye.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="detail-block">
          <h4>Itinerario resumido</h4>
          <ul>
            {evento.plan.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

function EventCard({ evento, onOpen }) {
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
        <button type="button" onClick={() => onOpen(evento.id)}>
          Ver mas info
        </button>
      </div>
    </article>
  );
}

export function EventGrid({ items }) {
  const [activeId, setActiveId] = useState(null);
  const eventMap = useMemo(() => {
    return items.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }, [items]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  const activeEvent = activeId ? eventMap[activeId] : null;

  return (
    <>
      <div className="card-grid">
        {items.map((evento) => (
          <EventCard key={evento.id} evento={evento} onOpen={setActiveId} />
        ))}
      </div>
      <DetailPanel evento={activeEvent} onClose={() => setActiveId(null)} />
    </>
  );
}

export function EventCalendar({ items }) {
  const [activeId, setActiveId] = useState(null);
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(() => toIsoDate(today));
  const [filterType, setFilterType] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyUpcoming, setOnlyUpcoming] = useState(true);

  const ordered = useMemo(() => {
    return [...items].sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
  }, [items]);

  const eventMap = useMemo(() => {
    return ordered.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }, [ordered]);

  const eventsByDay = useMemo(() => {
    const map = {};

    ordered.forEach((evento) => {
      const start = parseIsoDate(evento.fechaInicio);
      const end = parseIsoDate(evento.fechaFin || evento.fechaInicio);

      for (let date = new Date(start); date <= end; date = addDays(date, 1)) {
        const iso = toIsoDate(date);
        if (!map[iso]) map[iso] = [];
        map[iso].push(evento);
      }
    });

    return map;
  }, [ordered]);

  const calendarDays = useMemo(() => buildCalendarDays(currentMonth), [currentMonth]);
  const selectedEvents = eventsByDay[selectedDate] || [];
  const todayNoon = useMemo(() => parseIsoDate(toIsoDate(today)), [today]);
  const listFiltered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ordered.filter((evento) => {
      if (filterType !== "todos" && evento.tipo !== filterType) return false;
      if (query) {
        const haystack = `${evento.titulo} ${evento.lugar}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (onlyUpcoming) {
        const end = parseIsoDate(evento.fechaFin || evento.fechaInicio);
        if (end < todayNoon) return false;
      }
      return true;
    });
  }, [ordered, filterType, searchQuery, onlyUpcoming, todayNoon]);
  const listGroups = useMemo(() => {
    return listFiltered.reduce((acc, evento) => {
      const start = parseIsoDate(evento.fechaInicio);
      const key = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`;
      if (!acc[key]) {
        acc[key] = {
          label: start.toLocaleDateString("es-AR", { month: "long", year: "numeric" }),
          items: []
        };
      }
      acc[key].items.push(evento);
      return acc;
    }, {});
  }, [listFiltered]);
  const groupKeys = useMemo(() => Object.keys(listGroups).sort(), [listGroups]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  useEffect(() => {
    const selected = parseIsoDate(selectedDate);
    if (
      selected.getFullYear() !== currentMonth.getFullYear() ||
      selected.getMonth() !== currentMonth.getMonth()
    ) {
      setSelectedDate(toIsoDate(currentMonth));
    }
  }, [currentMonth, selectedDate]);

  const activeEvent = activeId ? eventMap[activeId] : null;
  const monthLabel = currentMonth.toLocaleDateString("es-AR", { month: "long", year: "numeric" });

  return (
    <>
      <div className="calendar-wrap calendar-interactive">
        <div className="calendar-toolbar">
          <button
            type="button"
            className="calendar-nav"
            onClick={() => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
          >
            Mes anterior
          </button>
          <p className="calendar-month-title">{monthLabel}</p>
          <button
            type="button"
            className="calendar-nav"
            onClick={() => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
          >
            Mes siguiente
          </button>
        </div>

        <div className="calendar-weekdays">
          <span>Dom</span>
          <span>Lun</span>
          <span>Mar</span>
          <span>Mie</span>
          <span>Jue</span>
          <span>Vie</span>
          <span>Sab</span>
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day) => {
            const count = eventsByDay[day.iso]?.length || 0;
            const isSelected = day.iso === selectedDate;

            return (
              <button
                key={day.iso}
                type="button"
                className={[
                  "calendar-day",
                  !day.inCurrentMonth ? "outside" : "",
                  day.isToday ? "today" : "",
                  isSelected ? "selected" : "",
                  count > 0 ? "has-events" : ""
                ]
                  .join(" ")
                  .trim()}
                onClick={() => setSelectedDate(day.iso)}
              >
                <div className="calendar-day-top">
                  <span className="calendar-day-number">{day.date.getDate()}</span>
                  {count > 0 ? <span className="calendar-day-badge">{count}</span> : null}
                </div>
                {count > 0 ? (
                  <>
                    <span className="calendar-day-event-text calendar-day-event-text--full">
                      {count === 1 ? "Dia con evento" : "Dia con eventos"}
                    </span>
                    <span className="calendar-day-event-text calendar-day-event-text--short">
                      {count === 1 ? "Evento" : "Eventos"}
                    </span>
                  </>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="calendar-selected-panel">
          <div className="calendar-selected-head">
            <h3>Eventos del {formatDate(selectedDate)}</h3>
            <button
              type="button"
              className="calendar-nav calendar-nav-small"
              onClick={() => {
                const now = new Date();
                setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
                setSelectedDate(toIsoDate(now));
              }}
            >
              Ir a hoy
            </button>
          </div>

          {selectedEvents.length === 0 ? (
            <p className="calendar-selected-empty">No hay eventos en esta fecha. Proba otro dia.</p>
          ) : (
            <ul className="calendar-event-list">
              {selectedEvents.map((evento) => (
                <li key={`${selectedDate}-${evento.id}`}>
                  <button type="button" className="calendar-event-row" onClick={() => setActiveId(evento.id)}>
                    <span className={`type ${evento.tipo}`}>{evento.tipo}</span>
                    <strong>{evento.titulo}</strong>
                    <p>
                      {formatRangeCompact(evento.fechaInicio, evento.fechaFin)} | {evento.lugar}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="calendar-list-panel">
          <div className="calendar-list-head">
            <div>
              <h3>Todos los viajes y salidas</h3>
              <p>Ordenados por fecha</p>
            </div>
            <p className="calendar-list-count">{listFiltered.length} eventos</p>
          </div>
          <div className="calendar-list-controls">
            <div className="calendar-filter-group" role="group" aria-label="Filtrar por tipo">
              {[
                { value: "todos", label: "Todos" },
                { value: "salida", label: "Salidas" },
                { value: "viaje", label: "Viajes" }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`calendar-filter-button ${filterType === option.value ? "active" : ""}`}
                  aria-pressed={filterType === option.value}
                  onClick={() => setFilterType(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <label className="calendar-search">
              <span>Buscar</span>
              <input
                type="search"
                placeholder="Nombre o lugar"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
            <label className="calendar-toggle">
              <input
                type="checkbox"
                checked={onlyUpcoming}
                onChange={(event) => setOnlyUpcoming(event.target.checked)}
              />
              <span>Solo proximos</span>
            </label>
          </div>
          {listFiltered.length === 0 ? (
            <p className="calendar-list-empty">No hay eventos con esos filtros.</p>
          ) : (
            <div className="calendar-list-groups">
              {groupKeys.map((key) => (
                <div key={key} className="calendar-list-group">
                  <h4>{listGroups[key].label}</h4>
                  <ul className="calendar-list">
                    {listGroups[key].items.map((evento) => (
                      <li key={`list-${evento.id}`} className="calendar-item">
                        <button type="button" className="calendar-item-button" onClick={() => setActiveId(evento.id)}>
                  <span className="calendar-date">{formatRangeCompact(evento.fechaInicio, evento.fechaFin)}</span>
                          <div className="calendar-info">
                            <span className={`type ${evento.tipo}`}>{evento.tipo}</span>
                            <strong>{evento.titulo}</strong>
                            <p>{evento.lugar}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <DetailPanel evento={activeEvent} onClose={() => setActiveId(null)} />
    </>
  );
}

function parseIsoDate(iso) {
  return new Date(`${iso}T12:00:00`);
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function buildCalendarDays(currentMonth) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const todayIso = toIsoDate(new Date());
  const days = [];

  for (let i = startOffset - 1; i >= 0; i -= 1) {
    const date = new Date(year, month, -i);
    days.push({
      date,
      iso: toIsoDate(date),
      inCurrentMonth: false,
      isToday: toIsoDate(date) === todayIso
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    days.push({
      date,
      iso: toIsoDate(date),
      inCurrentMonth: true,
      isToday: toIsoDate(date) === todayIso
    });
  }

  const remainder = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remainder; i += 1) {
    const date = new Date(year, month + 1, i);
    days.push({
      date,
      iso: toIsoDate(date),
      inCurrentMonth: false,
      isToday: toIsoDate(date) === todayIso
    });
  }

  return days;
}

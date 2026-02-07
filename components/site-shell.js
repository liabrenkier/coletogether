import SiteHeader from "@/components/site-header";

export default function SiteShell({ children }) {
  return (
    <>
      <div className="background-shapes" aria-hidden="true">
        <span className="shape shape-a" />
        <span className="shape shape-b" />
        <span className="shape shape-c" />
      </div>

      <SiteHeader />

      <main>
        <div className="page-content">{children}</div>
      </main>

      <a
        className="whatsapp-fab"
        href="https://wa.me/1135635184"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 3.5A11 11 0 0 0 3.3 16.8L2 22l5.3-1.3A11 11 0 1 0 20.5 3.5Zm-8.6 17a9.1 9.1 0 0 1-4.6-1.2l-.3-.2-3.1.8.8-3-.2-.4a9.1 9.1 0 1 1 7.4 4Zm5-6.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.3 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6s-.7-1.8-1-2.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.1 1.1-1.1 2.6 1.1 3 1.2 3.2c.2.2 2.2 3.4 5.3 4.8.8.3 1.3.5 1.8.6.8.3 1.4.2 2 .1.6-.1 1.8-.8 2.1-1.6.3-.8.3-1.4.2-1.6-.1-.2-.3-.3-.6-.4Z" />
        </svg>
      </a>
    </>
  );
}

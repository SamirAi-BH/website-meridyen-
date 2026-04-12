// script.js
document.addEventListener("DOMContentLoaded", () => {
  const headerHost = document.getElementById("site-header");
  const footerHost = document.getElementById("site-footer");

  const load = async (url, host) => {
    if (!host) return;
    const res = await fetch(url);
    const html = await res.text();
    host.innerHTML = html;
  };

  const setActiveNav = () => {
    const pageKey = window.location.pathname.split("/").pop().replace(".html", "").toLowerCase();

    // We highlight by checking if href contains a known target file
    const links = Array.from(document.querySelectorAll("header nav a"));
    if (!links.length) return;

    const isActive = (href, key) => {
      if (!href) return false;
      // match by filename presence, ignore anchors
      const h = href.toLowerCase();
      return h.includes(`/${key}.html`);
    };

    links.forEach(a => {
      a.classList.remove("text-gray-900");
      a.classList.add("text-gray-700");
    });

    // choose highlight key
    const keyToHighlight = (pageKey === "index") ? null : pageKey;

    if (keyToHighlight) {
      const active = links.find(a => isActive(a.getAttribute("href"), keyToHighlight));
      if (active) {
        active.classList.add("text-gray-900");
        active.classList.remove("text-gray-700");
      }
    }
  };

  const initHeader = () => {
    // Mobile menu toggle
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    if (btn && menu) {
      btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });

      // Close menu when clicking any link
      menu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => menu.classList.add("hidden"));
      });
    }

    // Active link highlight via body[data-page]
    const page = document.body.getAttribute("data-page");
    if (page) {
      document.querySelectorAll(`[data-nav="${page}"]`).forEach(el => {
        el.classList.add("text-purple-700");
        el.classList.add("font-extrabold");
      });
    }
  };

  const afterHeaderLoaded = () => {
    setActiveNav();
    initHeader();
  };

  (async () => {
    await load("/header.html", headerHost);
    afterHeaderLoaded();
    await load("/footer.html", footerHost);
  })().catch(console.error);
});
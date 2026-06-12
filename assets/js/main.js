/* ===== DiaOps — shared interactions ===== */
(function () {
  "use strict";

  // Sticky navbar shadow on scroll
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile sidebar menu
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("mobile-overlay");
  const closeBtn = document.getElementById("close-menu");
  const openMenu = () => {
    mobileMenu.classList.remove("translate-x-full");
    if (overlay) overlay.classList.remove("opacity-0", "pointer-events-none");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    mobileMenu.classList.add("translate-x-full");
    if (overlay) overlay.classList.add("opacity-0", "pointer-events-none");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  if (burger && mobileMenu) {
    burger.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Count-up stats
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const val = target * easeOut(p);
      el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCount(e.target);
          statIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => statIO.observe(el));

  // Active nav link based on filename
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === here || (here === "" && href === "index.html")) a.classList.add("active");
  });

  // Current year in footer
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Contact / application form handling — submits to FormSubmit.co via AJAX,
  // which emails each submission to the address in the form's action URL.
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const note = form.querySelector("[data-note]");
      const errNote = form.querySelector("[data-error]");
      const submitBtn = form.querySelector("button[type=submit]");
      const endpoint = form.getAttribute("action");
      if (errNote) errNote.classList.add("hidden");

      // If no real endpoint is configured yet, just show the success message.
      const configured =
        endpoint && /^https?:\/\//i.test(endpoint) && !/YOUR_EMAIL|example\.com/i.test(endpoint);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.label = submitBtn.textContent;
        submitBtn.textContent = "Sending…";
      }

      const finishOK = () => {
        if (note) note.classList.remove("hidden");
        form.querySelectorAll("input,textarea,select,button").forEach((f) => (f.disabled = true));
      };
      const finishErr = () => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.label || "Submit";
        }
        if (errNote) errNote.classList.remove("hidden");
      };

      if (!configured) {
        finishOK();
        return;
      }
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) finishOK();
        else finishErr();
      } catch (_) {
        finishErr();
      }
    });
  });

  // FAQ / accordion (careers page)
  document.querySelectorAll("[data-acc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const icon = btn.querySelector("[data-acc-icon]");
      const open = panel.classList.toggle("hidden") === false;
      if (icon) icon.style.transform = open ? "rotate(45deg)" : "rotate(0deg)";
    });
  });
})();

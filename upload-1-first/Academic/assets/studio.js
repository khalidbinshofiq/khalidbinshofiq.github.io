/* =====================================================
   STUDIO PAGES — shared behaviour
   Theme (shared with the portfolio), progress bar, reveal,
   section tabs, figure carousels, lightbox, document checks.
   ===================================================== */
(() => {
  const root = document.documentElement;

  /* ---------- Theme: same saved setting as the portfolio ---------- */
  try{
    const saved = localStorage.getItem("portfolio-theme");
    if(saved) root.setAttribute("data-theme", saved);
  }catch(e){}
  const themeBtn = document.getElementById("themeToggle");
  if(themeBtn){
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try{ localStorage.setItem("portfolio-theme", next); }catch(e){}
    });
  }

  /* ---------- Scroll progress ---------- */
  const bar = document.querySelector(".progress div");
  const onScroll = () => {
    const max = root.scrollHeight - root.clientHeight;
    if(bar) bar.style.width = (max > 0 ? (root.scrollTop / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: .06, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(el => io.observe(el));
  }else{
    reveals.forEach(el => el.classList.add("visible"));
  }

  /* ---------- Section tabs: highlight the section on screen ---------- */
  const tabLinks = Array.from(document.querySelectorAll(".tabs a[href^='#']"));
  const tabTargets = tabLinks.map(a => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
  function updateTabs(){
    const line = (parseInt(getComputedStyle(root).getPropertyValue("--top")) || 60) + 90;
    let current = tabTargets[0];
    tabTargets.forEach(t => { if(t.getBoundingClientRect().top - line <= 0) current = t; });
    tabLinks.forEach(a => {
      const on = current && a.getAttribute("href") === "#" + current.id;
      if(on && !a.classList.contains("active")){
        a.classList.add("active");
        a.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      }
      if(!on) a.classList.remove("active");
    });
  }
  if(tabLinks.length){
    window.addEventListener("scroll", updateTabs, { passive: true });
    updateTabs();
  }

  /* ---------- "Read more" for long text ---------- */
  document.querySelectorAll(".more").forEach(btn => {
    const box = document.getElementById(btn.getAttribute("aria-controls"));
    if(!box) return;
    btn.addEventListener("click", () => {
      const open = box.classList.toggle("clamped") === false;
      btn.textContent = open ? "Show less" : "Read the full abstract";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- Carousels ---------- */
  document.querySelectorAll(".carousel").forEach(car => {
    const track = car.querySelector(".car-track");
    const slides = Array.from(track.children);
    const dots = car.querySelector(".car-dots");
    const count = car.querySelector(".car-count");
    const prev = car.querySelector(".car-prev");
    const next = car.querySelector(".car-next");
    let index = 0;
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.type = "button";
      d.setAttribute("aria-label", "Show figure " + (i + 1));
      d.addEventListener("click", () => go(i));
      dots.appendChild(d);
    });
    function paint(){
      Array.from(dots.children).forEach((d, i) => d.classList.toggle("active", i === index));
      count.textContent = (index + 1) + " / " + slides.length;
    }
    function go(i){
      index = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[index].offsetLeft - track.offsetLeft, behavior: "smooth" });
      paint();
    }
    prev.addEventListener("click", () => go(index - 1));
    next.addEventListener("click", () => go(index + 1));
    let t;
    track.addEventListener("scroll", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const i = Math.round(track.scrollLeft / (track.clientWidth + 16));
        if(i !== index){ index = Math.max(0, Math.min(slides.length - 1, i)); paint(); }
      }, 80);
    }, { passive: true });
    paint();
  });

  /* ---------- Lightbox ---------- */
  const figs = Array.from(document.querySelectorAll("[data-full]"));
  const lb = document.getElementById("lightbox");
  if(lb && figs.length){
    const stage = lb.querySelector(".lb-stage");
    const img = stage.querySelector("img");
    const title = lb.querySelector(".lb-caption strong");
    const pos = lb.querySelector(".lb-caption span");
    const zoomBtn = lb.querySelector(".lb-zoom");
    const orig = lb.querySelector(".lb-orig");
    // Figures reached from the hero stack are also in the page body: keep one entry per original file.
    const list = [];
    const seen = new Map();
    figs.forEach(f => {
      if(f.closest(".stack")) return;
      if(!seen.has(f.dataset.full)){ seen.set(f.dataset.full, list.length); list.push(f); }
    });
    figs.forEach(f => { if(f.closest(".stack") && !seen.has(f.dataset.full)){ seen.set(f.dataset.full, list.length); list.push(f); } });
    let current = 0, last = null;

    function show(i){
      current = (i + list.length) % list.length;
      const f = list[current];
      stage.classList.remove("zoomed");
      zoomBtn.textContent = "Zoom";
      img.src = f.dataset.web;
      img.alt = f.dataset.caption || "";
      title.textContent = f.dataset.caption || "";
      pos.textContent = "Figure " + (current + 1) + " of " + list.length;
      orig.href = f.dataset.full;
    }
    function open(f){
      last = document.activeElement;
      show(seen.get(f.dataset.full) || 0);
      lb.classList.add("show");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lb-close").focus({ preventScroll: true });
    }
    function close(){
      lb.classList.remove("show");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if(last && last.focus) last.focus({ preventScroll: true });
    }
    function toggleZoom(){
      const f = list[current];
      if(stage.classList.toggle("zoomed")){
        zoomBtn.textContent = "Fit";
        img.src = f.dataset.full;          // full-resolution original for zooming
        img.style.width = Math.min(Number(f.dataset.ow) || 2400, 2600) + "px";
      }else{
        zoomBtn.textContent = "Zoom";
        img.style.width = "";
      }
    }
    figs.forEach(f => f.addEventListener("click", () => open(f)));
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-nav.prev").addEventListener("click", () => show(current - 1));
    lb.querySelector(".lb-nav.next").addEventListener("click", () => show(current + 1));
    zoomBtn.addEventListener("click", toggleZoom);
    img.addEventListener("dblclick", toggleZoom);
    stage.addEventListener("click", e => { if(e.target === stage && !stage.classList.contains("zoomed")) close(); });
    window.addEventListener("keydown", e => {
      if(!lb.classList.contains("show")) return;
      if(e.key === "Escape") close();
      if(e.key === "ArrowRight") show(current + 1);
      if(e.key === "ArrowLeft") show(current - 1);
    });
    /* drag to pan when zoomed */
    let drag = null;
    stage.addEventListener("pointerdown", e => {
      if(!stage.classList.contains("zoomed") || e.pointerType !== "mouse") return;
      drag = { x: e.clientX, y: e.clientY, l: stage.scrollLeft, t: stage.scrollTop };
      stage.classList.add("dragging");
    });
    window.addEventListener("pointermove", e => {
      if(!drag) return;
      stage.scrollLeft = drag.l - (e.clientX - drag.x);
      stage.scrollTop = drag.t - (e.clientY - drag.y);
    });
    window.addEventListener("pointerup", () => { drag = null; stage.classList.remove("dragging"); });
    /* swipe on touch screens */
    let sx = null;
    stage.addEventListener("touchstart", e => { if(!stage.classList.contains("zoomed")) sx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", e => {
      if(sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if(Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---------- Hide document links whose file has not been uploaded ---------- */
  if(location.protocol.startsWith("http")){
    document.querySelectorAll(".doc[data-check]").forEach(doc => {
      fetch(doc.getAttribute("href"), { method: "HEAD" }).then(r => {
        if(!r.ok) hideDoc(doc);
      }).catch(() => {});
    });
  }
  function hideDoc(doc){
    doc.hidden = true;
    const box = doc.closest(".block");
    if(box && !box.querySelector(".doc:not([hidden])")){
      box.hidden = true;
      const tab = box.id && document.querySelector('.tabs a[href="#' + box.id + '"]');
      if(tab) tab.remove();
      const bar = document.querySelector(".tabs");
      if(bar && bar.querySelectorAll("a").length < 2) bar.hidden = true;
    }
  }
})();

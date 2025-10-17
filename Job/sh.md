<!-- =========================
     Survey Outputs (PNG Gallery)
     ========================= -->
<section id="survey-outputs">
  <h2>🗂️ Survey Outputs & Visualizations</h2>
  <p class="sub">Click any card to view full size. Use the filters to switch categories.</p>

  <!-- Filters -->
  <div class="filters" role="toolbar" aria-label="Gallery filters">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="service">Service Areas</button>
    <button class="filter-btn" data-filter="heatmap">Heatmaps</button>
    <button class="filter-btn" data-filter="od">OD Matrices</button>
    <button class="filter-btn" data-filter="accident">Accident Maps</button>
  </div>

  <!-- Grid -->
  <div class="gallery">
    <!-- Service Areas -->
    <figure class="g-item" data-cat="service">
      <img loading="lazy" src="images/surveys/service_paratransit.png" alt="Paratransit service area coverage map">
      <figcaption>Paratransit Service Area</figcaption>
    </figure>
    <figure class="g-item" data-cat="service">
      <img loading="lazy" src="images/surveys/service_public_transport.png" alt="Public transport service area coverage map">
      <figcaption>Public Transport Service Area</figcaption>
    </figure>
    <figure class="g-item" data-cat="service">
      <img loading="lazy" src="images/surveys/service_railway.png" alt="Railway station catchment/service area">
      <figcaption>Railway Service Area</figcaption>
    </figure>

    <!-- Heatmaps (e.g., different time bands / days) -->
    <figure class="g-item" data-cat="heatmap">
      <img loading="lazy" src="images/surveys/heatmap_am_peak_day1.png" alt="Traffic Count Heatmap for Day 1">
      <figcaption>Heatmap — AM Peak (Day 1)</figcaption>
    </figure>
    <figure class="g-item" data-cat="heatmap">
      <img loading="lazy" src="images/surveys/heatmap_midday_day2.png" alt="Traffic Count Heatmap for Day 2">
      <figcaption>Heatmap — Midday (Day 2)</figcaption>
    </figure>
    <figure class="g-item" data-cat="heatmap">
      <img loading="lazy" src="images/surveys/heatmap_pm_peak_day3.png" alt="Traffic Count Heatmap for Day 3">
      <figcaption>Heatmap — PM Peak (Day 3)</figcaption>
    </figure>

    <!-- OD Matrices -->
    <figure class="g-item" data-cat="od">
      <img loading="lazy" src="images/surveys/od_matrix_overall.png" alt="Origin-Destination matrix overall flows">
      <figcaption>OD Matrix — Overall</figcaption>
    </figure>

    <!-- Accident Maps -->
    <figure class="g-item" data-cat="accident">
      <img loading="lazy" src="images/surveys/accidents_cluster_map.png" alt="Accident cluster map using police station data">
      <figcaption>Accident Clusters (Police Data)</figcaption>
    </figure>
    <figure class="g-item" data-cat="accident">
      <img loading="lazy" src="images/surveys/blackspots_with_countermeasures.png" alt="Black spots with proposed countermeasures">
      <figcaption>Black Spots & Countermeasures</figcaption>
    </figure>
  </div>

  <!-- Lightbox dialog -->
  <dialog id="lightbox" aria-labelledby="lb-title">
    <div class="lb-wrap">
      <img id="lb-img" alt="">
      <p id="lb-title"></p>
      <div class="lb-actions">
        <a id="lb-download" class="btn" href="#" download>Download PNG</a>
        <button class="btn-outline" value="close">Close</button>
      </div>
      <button class="nav prev" aria-label="Previous image">‹</button>
      <button class="nav next" aria-label="Next image">›</button>
    </div>
  </dialog>
</section>

<style>
  #survey-outputs { margin-top: 22px; }
  #survey-outputs h2{ color: var(--highlight); margin: 0 0 6px; }
  #survey-outputs .sub{ color: var(--muted); margin: 0 0 12px; font-size: 14px; }

  /* Filters */
  .filters{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px; }
  .filter-btn{
    padding:6px 10px; border:1px solid var(--border); background:#fff; color:var(--fg);
    border-radius:8px; cursor:pointer; font-weight:600; font-size:13px;
  }
  .filter-btn.active{ background: var(--pill, #eef2ff); border-color: #cfd6db; color: var(--highlight); }

  /* Gallery grid */
  .gallery{
    display:grid;
    grid-template-columns: repeat(4, minmax(0,1fr));
    gap:12px;
  }
  @media (max-width: 1024px){ .gallery{ grid-template-columns: repeat(3, minmax(0,1fr)); } }
  @media (max-width: 760px){ .gallery{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
  @media (max-width: 480px){ .gallery{ grid-template-columns: 1fr; } }

  .g-item{
    background:#fff;
    border:1px solid var(--border);
    border-radius:10px;
    padding:8px;
    box-shadow: 0 4px 8px rgba(0,0,0,.06);
    transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
    cursor: zoom-in;
  }
  .g-item:hover{ transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,.12); border-color:#cfd6db; }
  .g-item img{
    width:100%;
    aspect-ratio: 4/3;             /* consistent tiles */
    object-fit: cover;
    border-radius:8px;
    display:block;
  }
  .g-item figcaption{
    margin-top:6px; font-size:13px; color: var(--highlight); text-align:center; font-weight:600;
  }

  /* Lightbox */
  #lightbox{
    width:min(1000px, 96vw);
    border:1px solid var(--border);
    border-radius:12px;
    padding:0;
    box-shadow: 0 24px 60px rgba(0,0,0,.35);
  }
  #lightbox::backdrop{ background: rgba(0,0,0,.35); }
  .lb-wrap{ position:relative; padding:14px 14px 12px; }
  #lb-img{ width:100%; height:auto; display:block; border-radius:10px; }
  #lb-title{ margin:10px 0 10px; color:var(--fg); }
  .lb-actions{ display:flex; gap:10px; justify-content:flex-end; }
  .btn, .btn-outline{
    padding:8px 12px; border-radius:8px; font-weight:600; font-size:14px; cursor:pointer;
    border:1px solid transparent; text-decoration:none; display:inline-block;
  }
  .btn{ background:var(--highlight); color:#fff; }
  .btn:hover{ filter:brightness(0.95); }
  .btn-outline{ background:#fff; color:var(--highlight); border-color:var(--highlight); }
  .btn-outline:hover{ background:#f5f8ff; }
  .nav{
    position:absolute; top:50%; transform:translateY(-50%);
    background: rgba(255,255,255,.9); border:1px solid var(--border);
    width:36px; height:36px; border-radius:50%; font-size:22px; line-height:32px;
    text-align:center; cursor:pointer; user-select:none;
  }
  .nav.prev{ left:10px; }
  .nav.next{ right:10px; }
</style>

<script>
(() => {
  const gallery = document.querySelector('#survey-outputs .gallery');
  const items = [...gallery.querySelectorAll('.g-item')];
  const modal = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  const title = document.getElementById('lb-title');
  const dl = document.getElementById('lb-download');
  const prev = modal.querySelector('.prev');
  const next = modal.querySelector('.next');
  let idx = -1;
  let visible = items;

  // Open lightbox
  gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.g-item');
    if (!card) return;
    idx = visible.indexOf(card);
    show(idx);
    modal.showModal();
  });

  // Navigation
  function show(i){
    if (i < 0) i = visible.length - 1;
    if (i >= visible.length) i = 0;
    idx = i;
    const card = visible[idx];
    const imgEl = card.querySelector('img');
    img.src = imgEl.src;
    img.alt = imgEl.alt || '';
    title.textContent = card.querySelector('figcaption')?.textContent || '';
    dl.href = imgEl.src;
  }
  prev.addEventListener('click', () => show(idx - 1));
  next.addEventListener('click', () => show(idx + 1));
  modal.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') show(idx - 1);
    if(e.key === 'ArrowRight') show(idx + 1);
  });

  // Close when clicking outside content
  modal.addEventListener('click', (e)=>{
    const rect = modal.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
                   e.clientY >= rect.top && e.clientY <= rect.bottom;
    if(!inside) modal.close();
  });

  // Filters
  const bar = document.querySelector('#survey-outputs .filters');
  bar.addEventListener('click', (e)=>{
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    bar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.dataset.filter;
    visible = items.filter(el => f === 'all' ? true : el.dataset.cat === f);
    items.forEach(el => {
      el.style.display = (f === 'all' || el.dataset.cat === f) ? '' : 'none';
    });
  });
})();
</script>



**💼 Designation** - Assistant Urban Planner <br>

**🏢 Organization** - <a href="https://www.scplbd.com/" target="_blank">Sheltech Consultants (Pvt.) Ltd.</a><br>

🗓️ October 2024 – Present

---

**📋Key Reponsibilities** <br>

▪ Currently working on "Upazila Town (Non-Municipal) Master Plan Preparation and Basic Infrastructure Development Project" funded by GoB (Government of Bangladesh).<br>
▪ Support **urban and regional planning projects** through **field surveys, data analysis, and technical reporting**.<br> 
▪ Assist in **preparing maps and planning documents** using GIS and design tools. <br>
▪ Collaborate with senior planners, engineers, and local authorities to ensure compliance and inclusivity in planning. <br>
▪ Contribute to organizing **stakeholder consultations, workshops, and community engagement sessions.** <br>
▪ Help **drafting master plans, infrastructure proposals, and policy recommendations.** <br>
▪ Strengthen skills in spatial analysis, research, and multidisciplinary collaboration. <br>

---

### 👥 Workshop
- **🚦 Promoting Road Safety through Data-Driven Planning & Community Engagement** <br>
<p align="center">
  <img src="1.jpeg" width="40%"/><img src="3.jpeg" width="42%"/>
  <img src="2.jpeg" width="40%"/>
</p>

- **Location:** Fakirhat Upazila, Bagerhat District, Bangladesh <br>
- **Project:** Upazila Town Master Plan & Basic Infrastructure Development <br>

**Purpose**
- Share findings from recent transport surveys  
- Validate the **core road network** with stakeholders  
- Identify **accident-prone locations (black spots)**  
- Co-design **road safety improvements**

**My Roles:** Organizer & Presenter

**Responsibilities**
- Led workshop design and facilitation; co-presented with **Prof. Dr. Md. Shahid Mamun (Transport Expert)**  
- Supervised field teams during November data collection (10 survey types):**TCS, PCS, OD, PTPS, PIS, Parking, Train Station, Transport Inventory, Speed–Delay, Black-spot mapping**  
- Integrated survey results with community inputs to inform the master plan

**Participants**
- **UNO (Upazila Nirbahi Officer)**, Deputy Team Leader, govt officials, transport operators, and project consultants



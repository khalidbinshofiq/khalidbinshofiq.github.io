fetch('assets/data.json')
  .then(r => r.json())
  .then(grid => {
    const trace = {
      type: 'surface',
      x: grid.x,
      y: grid.y,
      z: grid.z,

      // --- Styling copied from your HTML (you can tweak) ---
      cmin: -215.3939009146346,
      cmax: 69.54286585365864,
      colorscale: [
        [0.0, "#08306b"],
        [0.4157646864835261, "#2c7fb8"],
        [0.6954609301178982, "#cfeaf6"],
        [0.755935793606411, "#fff2d6"],
        [0.8413582658441672, "#fde2e2"],
        [0.9267807380819233, "#f5c1c1"],
        [1.0, "#ee8f8f"]
      ],
      contours: {
        z: { start: -27.98828499999993, end: 9.98729756097581, size: 12.347259893292708, show: true, usecolormap: true, project: { z: true } }
      },
      showscale: true,
      colorbar: {
        title: { text: "Elevation (m)", font: { family: "Times New Roman", size: 14 } },
        tickfont: { family: "Times New Roman", size: 12 }
      }
      // If your original used surfacecolor, also include: surfacecolor: grid.surfacecolor
    };

    const layout = {
      title: "3D Bangladesh Terrain & Bathymetry — Blue • Cream • Light Red",
      margin: { l:0, r:0, t:48, b:0 },
      scene: {
        xaxis: { title: "X (km)" },
        yaxis: { title: "Y (km)" },
        zaxis: { title: "Elevation (m) ×exag×1.3" }
      }
    };

    Plotly.newPlot('plot', [trace], layout, { responsive: true });
  })
  .catch(err => {
    document.body.innerHTML = '<p style="padding:12px;font:14px sans-serif">Failed to load <code>assets/data.json</code>. Check file path and JSON validity.</p>';
    console.error(err);
  });

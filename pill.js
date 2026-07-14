/* Oppr showcase — floating version pill.
   Injected into every page of every version. Self-contained, no deps.
   Add a version by appending to VERSIONS below. */
(function () {
  var VERSIONS = [
    { group: 'Scroll worlds', items: [
      { label: 'Waste MRF walk', sub: 'v2 · quadrant plant', href: '/versions/world-waste-mrf/' },
      { label: 'PVC plant walk',  sub: 'v1 · single line',    href: '/versions/world-pvc/' },
    ]},
    { group: 'Website — spine', items: [
      { label: 'Spine',        sub: 'B · vertical spine',   href: '/versions/website-v2/spine/' },
      { label: 'Spine 2',      sub: 'C · scene-snapped',    href: '/versions/website-v2/spine2/' },
      { label: 'Home (bands)', sub: 'A · classic bands',    href: '/versions/website-v2/' },
    ]},
    { group: 'Website — directions', items: [
      { label: 'Control room',  sub: 'direction 1', href: '/versions/website-v2/directions/control-room/' },
      { label: 'Shift report',  sub: 'direction 2', href: '/versions/website-v2/directions/shift-report/' },
      { label: 'Timeline',      sub: 'direction 3', href: '/versions/website-v2/directions/timeline/' },
    ]},
    { group: 'Website — pages', items: [
      { label: 'How it works', sub: '', href: '/versions/website-v2/how-it-works/' },
      { label: 'Proof',        sub: '', href: '/versions/website-v2/proof/' },
      { label: 'Results',      sub: '', href: '/versions/website-v2/results/' },
      { label: 'For engineers',sub: '', href: '/versions/website-v2/for-engineers/' },
      { label: 'About',        sub: '', href: '/versions/website-v2/about/' },
    ]},
  ];

  var css = [
    '#oppr-pill{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:2147483000;',
      'font:500 13px/1.2 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;}',
    '#oppr-pill *{box-sizing:border-box}',
    '#oppr-pill-btn{display:flex;align-items:center;gap:9px;padding:9px 15px;border-radius:999px;cursor:pointer;',
      'background:rgba(28,31,35,.88);color:#F4F2EE;border:1px solid rgba(244,242,238,.14);',
      'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 6px 26px rgba(0,0,0,.28);',
      'transition:transform .16s ease, background .16s ease;white-space:nowrap;user-select:none}',
    '#oppr-pill-btn:hover{transform:translateY(-1px);background:rgba(28,31,35,.96)}',
    '#oppr-pill-dot{width:7px;height:7px;border-radius:50%;background:#FF6A2B;flex:0 0 auto}',
    '#oppr-pill-cur{opacity:.95}',
    '#oppr-pill-caret{opacity:.5;font-size:10px;margin-left:1px}',
    '#oppr-pill-menu{position:absolute;left:50%;bottom:calc(100% + 10px);transform:translateX(-50%) translateY(6px);',
      'min-width:290px;max-height:min(70vh,560px);overflow:auto;padding:8px;border-radius:16px;',
      'background:rgba(24,26,30,.97);border:1px solid rgba(244,242,238,.13);',
      'backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 18px 50px rgba(0,0,0,.42);',
      'opacity:0;pointer-events:none;transition:opacity .16s ease, transform .16s ease}',
    '#oppr-pill.open #oppr-pill-menu{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}',
    '#oppr-pill.open #oppr-pill-btn{background:rgba(28,31,35,.98)}',
    '.oppr-pill-grp{padding:9px 11px 4px;font:600 10px/1 ui-sans-serif,system-ui;letter-spacing:.09em;',
      'text-transform:uppercase;color:rgba(244,242,238,.42)}',
    '.oppr-pill-a{display:flex;align-items:baseline;gap:8px;padding:8px 11px;border-radius:10px;',
      'color:#F4F2EE;text-decoration:none;transition:background .12s ease}',
    '.oppr-pill-a:hover{background:rgba(244,242,238,.09)}',
    '.oppr-pill-a[aria-current="true"]{background:rgba(255,106,43,.16);color:#FFB48C}',
    '.oppr-pill-sub{margin-left:auto;font-size:11px;color:rgba(244,242,238,.42)}',
    '.oppr-pill-home{display:block;margin-top:4px;padding:9px 11px;border-top:1px solid rgba(244,242,238,.1);',
      'color:rgba(244,242,238,.62);text-decoration:none;font-size:12px}',
    '.oppr-pill-home:hover{color:#F4F2EE}',
    '@media print{#oppr-pill{display:none}}',
  ].join('');

  function norm(p) { return (p.replace(/index\.html$/, '').replace(/\/+$/, '') || '/'); }

  function build() {
    if (document.getElementById('oppr-pill')) return;
    var here = norm(location.pathname);

    var current = 'Showcase';
    var best = 0;
    VERSIONS.forEach(function (g) {
      g.items.forEach(function (it) {
        var h = norm(it.href);
        if (here === h || (here.indexOf(h + '/') === 0 && h.length > best)) { current = it.label; best = h.length; }
      });
    });

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var menu = VERSIONS.map(function (g) {
      return '<div class="oppr-pill-grp">' + g.group + '</div>' + g.items.map(function (it) {
        var isCur = it.label === current;
        return '<a class="oppr-pill-a" href="' + it.href + '"' + (isCur ? ' aria-current="true"' : '') + '>' +
               '<span>' + it.label + '</span>' +
               (it.sub ? '<span class="oppr-pill-sub">' + it.sub + '</span>' : '') + '</a>';
      }).join('');
    }).join('') + '<a class="oppr-pill-home" href="/">← All versions</a>';

    var el = document.createElement('div');
    el.id = 'oppr-pill';
    el.innerHTML =
      '<div id="oppr-pill-menu" role="menu">' + menu + '</div>' +
      '<div id="oppr-pill-btn" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false">' +
        '<span id="oppr-pill-dot"></span><span id="oppr-pill-cur">' + current + '</span>' +
        '<span id="oppr-pill-caret">▲</span></div>';
    document.body.appendChild(el);

    var btn = el.querySelector('#oppr-pill-btn');
    function toggle(force) {
      var open = force !== undefined ? force : !el.classList.contains('open');
      el.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      if (e.key === 'Escape') toggle(false);
    });
    document.addEventListener('click', function () { toggle(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();

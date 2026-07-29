/* ===== Tears of Metal Guide - Common JS ===== */
/* Dark mode / Language / Global Search / Burger / Back-to-top
   Progress Tracking / Filter Chips / PWA */

(function () {
  "use strict";

  /* ---------- SVG icons (nav buttons, state-dependent) ---------- */
  var ICON_SEARCH = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  var ICON_SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var ICON_MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var ICON_CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  /* ---------- SVG sprite (centralised icon definitions) ---------- */
  var SVG_SPRITE = '<svg style="display:none" aria-hidden="true">'
    + '<symbol id="i-sword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6"/><path d="m16 16 4 4"/><path d="m19 21 2-2"/></symbol>'
    + '<symbol id="i-bow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3 19 21"/><path d="M5 3a16 16 0 0 1 0 18"/><path d="M19 21a16 16 0 0 0 0-18"/></symbol>'
    + '<symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>'
    + '<symbol id="i-flag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></symbol>'
    + '<symbol id="i-tower" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l3-4h8l3 4v14"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h6"/></symbol>'
    + '<symbol id="i-coin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M15 9.5c0-1.38-1.34-2.5-3-2.5s-3 1.12-3 2.5 1.34 2.5 3 2.5 3 1.12 3 2.5-1.34 2.5-3 2.5-3-1.12-3-2.5"/></symbol>'
    + '<symbol id="i-skull" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="7"/><path d="M9 16v5h6v-5"/><path d="M9 9h.01"/><path d="M15 9h.01"/></symbol>'
    + '<symbol id="i-map" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15"/><path d="M15 6v15"/></symbol>'
    + '<symbol id="i-wave" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/></symbol>'
    + '<symbol id="i-axe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 14-7.5 7.5a2.12 2.12 0 0 1-3-3L7.5 14"/><path d="M9.5 11.5 16 5a3 3 0 0 1 6 0l-1.5 1.5a3 3 0 0 0 0 6L14 11.5"/></symbol>'
    + '<symbol id="i-hammer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12h5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h5"/><path d="M12 12V4"/></symbol>'
    + '<symbol id="i-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></symbol>'
    + '<symbol id="i-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></symbol>'
    + '<symbol id="i-crown" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M4 20V8l5 4 3-6 3 6 5-4v12"/></symbol>'
    + '</svg>';

  /* ---------- i18n dictionary (UI framework) ---------- */
  var I18N = {
    "brand": { zh: "钢铁之泪攻略站", en: "Tears of Metal Guide" },
    "nav.getting-started": { zh: "新手入门", en: "Beginner" },
    "nav.combat": { zh: "战斗系统", en: "Combat" },
    "nav.towers": { zh: "防御塔", en: "Towers" },
    "nav.economy": { zh: "经济养成", en: "Economy" },
    "nav.maps": { zh: "关卡攻略", en: "Maps" },
    "nav.codex": { zh: "图鉴速查", en: "Codex" },
    "nav.cta.start": { zh: "开始攻略", en: "Start Guide" },
    "nav.cta.home": { zh: "返回首页", en: "Home" },
    "search.placeholder": { zh: "搜索攻略、单位、防御塔…", en: "Search guides, units, towers…" },
    "search.empty": { zh: "没有找到相关内容", en: "No results found" },
    "search.hint": { zh: "输入关键词搜索全站攻略", en: "Type to search the whole site" },
    "search.history": { zh: "最近搜索", en: "Recent" },
    "search.clear": { zh: "清除", en: "Clear" },
    "foot.nav": { zh: "攻略导航", en: "Guides" },
    "foot.systems": { zh: "系统与图鉴", en: "Systems & Codex" },
    "foot.about": { zh: "关于", en: "About" },
    "foot.aboutus": { zh: "关于本站", en: "About" },
    "foot.feedback": { zh: "投稿反馈", en: "Feedback" },
    "foot.changelog": { zh: "更新日志", en: "Changelog" },
    "foot.branddesc": { zh: "《Tears of Metal》中文玩家攻略站，原创整理，持续更新。", en: "A player-made Tears of Metal guide site, original content, updated regularly." },
    "foot.copy": { zh: "© 2026 钢铁之泪攻略站 · Tears of Metal 中文攻略 · 仅供学习交流", en: "© 2026 Tears of Metal Guide · Fan-made · For learning only" },
    "filter.all": { zh: "全部", en: "All" },
    "progress.collected": { zh: "已收集", en: "Collected" },
    "progress.notcollected": { zh: "未收集", en: "Not Collected" },
    "progress.defeated": { zh: "已击败", en: "Defeated" },
    "progress.notdefeated": { zh: "未挑战", en: "Not Fought" },
    "progress.rebuilt": { zh: "已重建", en: "Rebuilt" },
    "progress.notrebuilt": { zh: "未重建", en: "Not Rebuilt" },
    "progress.completed": { zh: "已完成", en: "Completed" },
    "progress.notcompleted": { zh: "未完成", en: "Incomplete" },
    "progress.export": { zh: "导出进度", en: "Export Progress" },
    "progress.import": { zh: "导入进度", en: "Import Progress" },
    "progress.exported": { zh: "进度已复制到剪贴板！", en: "Progress copied to clipboard!" },
    "progress.reset": { zh: "重置全部进度", en: "Reset All Progress" },
    "progress.resetconfirm": { zh: "确定要清空全部进度数据吗？此操作不可撤销。", en: "Reset ALL progress data? This cannot be undone." },
    "progress.overview": { zh: "我的进度总览", en: "My Progress Overview" }
  };

  /* ---------- Search index ---------- */
  var SEARCH_INDEX = [
    { page: "首页", pageEn: "Home", url: "index.html",
      title: "钢铁之泪攻略站", titleEn: "Tears of Metal Guide",
      tags: "Tears of Metal 钢铁之泪 攻略 首页 塔防 苏格兰 高地", tagsEn: "tears metal guide home tower-defense scottish highland",
      py: "gangtiezhilei gonglvezhan" },
    { page: "新手入门", pageEn: "Beginner", url: "getting-started.html",
      title: "新手入门指南：从首战到通关", titleEn: "Beginner Guide: First Run to Victory",
      tags: "新手 入门 首战 教学 基础机制 波次 防御 高地战士", tagsEn: "beginner guide first-run tutorial basics wave defense highlander",
      py: "xinshou rumen shouzhan tongguan" },
    { page: "战斗系统", pageEn: "Combat", url: "combat.html",
      title: "战斗系统深度拆解", titleEn: "Combat System Deep Dive",
      tags: "战斗 系统 单位 近战 远程 支援 攻城 阵型 战术", tagsEn: "combat system unit melee ranged support siege formation tactics",
      py: "zhandou xitong danyi zhenxing" },
    { page: "防御塔", pageEn: "Towers", url: "towers.html",
      title: "防御塔类型与升级路线", titleEn: "Tower Types & Upgrade Paths",
      tags: "防御塔 箭塔 炮塔 法塔 升级 放置 策略 范围", tagsEn: "tower arrow cannon magic upgrade placement strategy range",
      py: "fangyuta jianta paota fatpa shengji" },
    { page: "经济养成", pageEn: "Economy", url: "economy.html",
      title: "经济管理与Meta养成", titleEn: "Economy & Meta Progression",
      tags: "经济 金币 资源 管理 升级 养成 永久 天赋 路线", tagsEn: "economy gold resource management upgrade meta permanent talent tree",
      py: "jingji yangcheng jinbi ziyuan guanli" },
    { page: "关卡攻略", pageEn: "Maps", url: "maps.html",
      title: "全关卡地图攻略", titleEn: "Full Map & Level Guide",
      tags: "关卡 地图 草地 森林 山地 海岸 村庄 地形 波次 Boss", tagsEn: "map level grassland forest mountain coast village terrain wave boss",
      py: "guanka ditu caodi senlin shandi haian" },
    { page: "图鉴速查", pageEn: "Codex", url: "codex.html",
      title: "全图鉴速查表", titleEn: "Full Codex Quick Reference",
      tags: "图鉴 单位 敌人 防御塔 速查 数据 属性 筛选", tagsEn: "codex unit enemy tower reference data stats filter",
      py: "tujian danyi diren fangyuta sucha" },
    /* anchor-level entries */
    { page: "战斗系统", pageEn: "Combat", url: "combat.html#units",
      title: "单位类型一览", titleEn: "Unit Types Overview",
      tags: "单位 类型 近战 远程 支援 攻城 剑士 弓手", tagsEn: "unit type melee ranged support siege swordsman archer",
      py: "danwei leixing jinchan yuancheng" },
    { page: "防御塔", pageEn: "Towers", url: "towers.html#types",
      title: "防御塔类型对比", titleEn: "Tower Type Comparison",
      tags: "防御塔 类型 对比 箭塔 炮塔 法塔 伤害 范围", tagsEn: "tower type comparison arrow cannon magic damage range",
      py: "fangyuta leixing duibi jianta" },
    { page: "关卡攻略", pageEn: "Maps", url: "maps.html#grassland",
      title: "草地关卡", titleEn: "Grassland Level",
      tags: "草地 关卡 地图 新手 入门 简单", tagsEn: "grassland level map beginner easy",
      py: "caodi guanka ditu xinshou" },
    { page: "关卡攻略", pageEn: "Maps", url: "maps.html#forest",
      title: "森林关卡", titleEn: "Forest Level",
      tags: "森林 关卡 地图 中级 地形 隐蔽", tagsEn: "forest level map intermediate terrain stealth",
      py: "senlin guanka ditu zhongji" },
    { page: "关卡攻略", pageEn: "Maps", url: "maps.html#mountain",
      title: "山地关卡", titleEn: "Mountain Level",
      tags: "山地 关卡 地图 高级 狭窄 峡谷", tagsEn: "mountain level map advanced narrow canyon",
      py: "shandi guanka ditu gaoji xiagu" }
  ];

  /* ---------- State ---------- */
  var lang = localStorage.getItem("tm-lang") || "zh";
  var dark = localStorage.getItem("tm-dark") === "1";

  function t(key){ return I18N[key] ? (I18N[key][lang] || I18N[key].zh) : key; }

  /* ---------- Apply language ---------- */
  function applyLang(l){
    lang = l;
    localStorage.setItem("tm-lang", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";

    /* 1) UI framework elements via data-i18n dictionary */
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var key = el.getAttribute("data-i18n");
      if(I18N[key] && I18N[key][l]){
        if(el.hasAttribute("data-i18n-ph")) el.setAttribute("placeholder", I18N[key][l]);
        else el.textContent = I18N[key][l];
      }
    });

    /* 2) Page content elements via data-en attribute */
    document.querySelectorAll("[data-en]").forEach(function(el){
      if(l === "en"){
        if(!el.hasAttribute("data-zh")) el.setAttribute("data-zh", el.innerHTML);
        el.innerHTML = el.getAttribute("data-en");
      } else {
        if(el.hasAttribute("data-zh")) el.innerHTML = el.getAttribute("data-zh");
      }
    });

    var langBtn = document.querySelector(".lang-btn");
    if(langBtn) langBtn.textContent = l === "zh" ? "English" : "中文";

    /* 3) Update aria-labels */
    var ariaMap = {
      ".search-btn": {zh:"搜索",en:"Search"},
      ".dark-btn": {zh:"暗色模式",en:"Toggle dark mode"},
      ".lang-btn": {zh:"语言",en:"Switch language"},
      "#burger": {zh:"菜单",en:"Menu"},
      "#toTop": {zh:"返回顶部",en:"Back to top"},
      ".search-close": {zh:"关闭",en:"Close"}
    };
    Object.keys(ariaMap).forEach(function(sel){
      var el = document.querySelector(sel);
      if(el) el.setAttribute("aria-label", ariaMap[sel][l]);
    });

    /* 4) Re-render search results if overlay is open */
    var ov = document.getElementById("searchOverlay");
    if(ov && ov.classList.contains("show")){
      var inp = ov.querySelector("input");
      renderSearch(inp ? inp.value : "");
    }

    /* 5) Re-apply progress tracking state */
    applyProgress();

    /* 6) Re-apply filter chips state */
    applyFilters();
  }

  /* ---------- Apply dark ---------- */
  function applyDark(d){
    dark = d;
    localStorage.setItem("tm-dark", d ? "1" : "0");
    document.body.classList.toggle("dark", d);
    var db = document.querySelector(".dark-btn");
    if(db) db.innerHTML = d ? ICON_SUN : ICON_MOON;
  }

  /* ====== PROGRESS TRACKING SYSTEM ====== */
  var PROGRESS_KEY = "tm-progress";

  function getProgress(){
    try{ return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch(e){ return {}; }
  }
  function saveProgress(p){
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  }
  function toggleProgress(id){
    var p = getProgress();
    p[id] = !p[id];
    if(!p[id]) delete p[id];
    saveProgress(p);
    applyProgress();
    updateProgressBars();
  }
  function applyProgress(){
    var p = getProgress();
    document.querySelectorAll("[data-track]").forEach(function(el){
      if(!el.querySelector(".track-toggle")){
        var btn = document.createElement("button");
        btn.className = "track-toggle";
        btn.type = "button";
        btn.setAttribute("aria-label", "toggle tracking");
        btn.innerHTML = ICON_CHECK;
        el.appendChild(btn);
      }
      var id = el.getAttribute("data-track");
      var done = !!p[id];
      el.classList.toggle("collected", done);
      el.classList.toggle("defeated", done);
      el.classList.toggle("rebuilt", done);
      var label = el.querySelector(".track-label");
      if(label){
        var type = el.getAttribute("data-track-type") || "collect";
        var key = type === "boss" ? (done ? "progress.defeated" : "progress.notdefeated")
                : type === "settle" ? (done ? "progress.rebuilt" : "progress.notrebuilt")
                : type === "task" ? (done ? "progress.completed" : "progress.notcompleted")
                : (done ? "progress.collected" : "progress.notcollected");
        label.textContent = t(key);
        label.setAttribute("data-i18n", key);
      }
    });
  }
  function updateProgressBars(){
    var groups = {};
    document.querySelectorAll("[data-track]").forEach(function(el){
      var g = el.getAttribute("data-track-group") || "default";
      if(!groups[g]) groups[g] = { total:0, done:0 };
      groups[g].total++;
      if(el.classList.contains("collected") || el.classList.contains("defeated") || el.classList.contains("rebuilt")) groups[g].done++;
    });
    Object.keys(groups).forEach(function(g){
      var info = groups[g];
      document.querySelectorAll('[data-progress-bar="'+g+'"]').forEach(function(bar){
        var fill = bar.querySelector(".pbar-fill");
        var text = bar.querySelector(".pbar-text");
        var pct = info.total > 0 ? Math.round(info.done / info.total * 100) : 0;
        if(fill) fill.style.width = pct + "%";
        if(text) text.textContent = info.done + " / " + info.total + "  (" + pct + "%)";
      });
    });
    var totalAll = 0, doneAll = 0;
    Object.keys(groups).forEach(function(g){ totalAll += groups[g].total; doneAll += groups[g].done; });
    document.querySelectorAll('[data-progress-bar="overall"]').forEach(function(bar){
      var fill = bar.querySelector(".pbar-fill");
      var text = bar.querySelector(".pbar-text");
      var pct = totalAll > 0 ? Math.round(doneAll / totalAll * 100) : 0;
      if(fill) fill.style.width = pct + "%";
      if(text) text.textContent = doneAll + " / " + totalAll + "  (" + pct + "%)";
    });
  }
  function exportProgress(){
    var data = JSON.stringify(getProgress(), null, 2);
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(data).then(function(){
        alert(t("progress.exported"));
      });
    } else {
      alert(data);
    }
  }
  function importProgress(jsonStr){
    try{
      var obj = JSON.parse(jsonStr);
      saveProgress(obj);
      applyProgress();
      updateProgressBars();
      return true;
    }catch(e){ return false; }
  }
  function resetProgress(){
    if(confirm(t("progress.resetconfirm"))){
      localStorage.removeItem(PROGRESS_KEY);
      applyProgress();
      updateProgressBars();
    }
  }

  /* ====== SEARCH ====== */
  var searchSelIdx = -1;
  var searchHits = [];

  function openSearch(){
    var ov = document.getElementById("searchOverlay");
    if(!ov) return;
    ov.classList.add("show");
    var inp = ov.querySelector("input");
    if(inp){ inp.value = ""; inp.focus(); renderSearch(""); }
  }
  function closeSearch(){
    var ov = document.getElementById("searchOverlay");
    if(ov) ov.classList.remove("show");
  }
  function getSearchHistory(){
    try{ return JSON.parse(localStorage.getItem("tm-search-history")) || []; }
    catch(e){ return []; }
  }
  function saveSearchHistory(q){
    var h = getSearchHistory();
    h = h.filter(function(x){ return x !== q; });
    h.unshift(q);
    h = h.slice(0, 6);
    localStorage.setItem("tm-search-history", JSON.stringify(h));
  }
  function renderSearch(q){
    var box = document.querySelector("#searchOverlay .search-results");
    if(!box) return;
    q = (q || "").trim().toLowerCase();
    searchHits = [];
    searchSelIdx = -1;
    var isEn = lang === "en";

    if(!q){
      var hist = getSearchHistory();
      if(hist.length){
        var html = '<div class="sr-label">'+t("search.history")+' <button class="sr-clear" data-action="clear-history">'+t("search.clear")+'</button></div>';
        html += hist.map(function(h){
          return '<a class="sr-item sr-history" href="#" data-query="'+h+'"><div class="sr-title">'+h+'</div></a>';
        }).join("");
        box.innerHTML = html;
        applyLang(lang);
        var clearBtn = box.querySelector('[data-action="clear-history"]');
        if(clearBtn) clearBtn.addEventListener("click", function(){
          localStorage.removeItem("tm-search-history");
          renderSearch("");
        });
        box.querySelectorAll(".sr-history").forEach(function(el){
          el.addEventListener("click", function(e){
            e.preventDefault();
            var inp = document.querySelector("#searchOverlay input");
            if(inp){ inp.value = el.getAttribute("data-query"); renderSearch(inp.value); }
          });
        });
      } else {
        box.innerHTML = '<div class="sr-empty">'+t("search.hint")+'</div>';
      }
      return;
    }

    SEARCH_INDEX.forEach(function(e){
      var hay = (e.page + " " + e.title + " " + e.tags + " " +
                 (e.pageEn||"") + " " + (e.titleEn||"") + " " + (e.tagsEn||"") + " " + (e.py||"")
      ).toLowerCase();
      if(hay.indexOf(q) !== -1){ searchHits.push(e); }
    });

    if(!searchHits.length){
      box.innerHTML = '<div class="sr-empty">'+t("search.empty")+'</div>';
      return;
    }
    box.innerHTML = searchHits.map(function(e, i){
      var pg = isEn ? (e.pageEn||e.page) : e.page;
      var ti = isEn ? (e.titleEn||e.title) : e.title;
      var tg = isEn ? (e.tagsEn||e.tags) : e.tags;
      var snip = tg.split(" ").slice(0, 6).join(" · ");
      return '<a class="sr-item'+(i===searchSelIdx?' selected':'')+'" href="'+e.url+'" data-idx="'+i+'">'+
        '<div class="sr-page">'+pg+'</div>'+
        '<div class="sr-title">'+ti+'</div>'+
        '<div class="sr-snippet">'+snip+'</div></a>';
    }).join("");
  }
  function moveSearchSel(dir){
    if(!searchHits.length) return;
    searchSelIdx = (searchSelIdx + dir + searchHits.length) % searchHits.length;
    var box = document.querySelector("#searchOverlay .search-results");
    if(!box) return;
    box.querySelectorAll(".sr-item").forEach(function(el, i){
      el.classList.toggle("selected", i === searchSelIdx);
      if(i === searchSelIdx) el.scrollIntoView({block:"nearest"});
    });
  }
  function confirmSearch(){
    if(searchSelIdx >= 0 && searchHits[searchSelIdx]){
      var inp = document.querySelector("#searchOverlay input");
      if(inp) saveSearchHistory(inp.value.trim());
      var url = searchHits[searchSelIdx].url;
      closeSearch();
      window.location.href = url;
    }
  }
  function highlightAnchor(){
    var hash = window.location.hash;
    if(!hash) return;
    var el = document.querySelector(hash);
    if(!el) return;
    setTimeout(function(){
      el.scrollIntoView({block:"start", behavior:"smooth"});
      el.classList.add("search-hit");
      setTimeout(function(){ el.classList.remove("search-hit"); }, 2800);
    }, 200);
  }

  /* ====== FILTER CHIPS ====== */
  var chipState = {};
  function applyFilters(){
    document.querySelectorAll("[data-chip-group]").forEach(function(group){
      var gname = group.getAttribute("data-chip-group");
      var active = chipState[gname] || "all";
      group.querySelectorAll("[data-chip]").forEach(function(chip){
        var val = chip.getAttribute("data-chip");
        chip.classList.toggle("active", val === active);
      });
      var targetSel = group.getAttribute("data-chip-target");
      if(targetSel){
        var container = document.querySelector(targetSel);
        if(container){
          container.querySelectorAll("[data-chip-tags]").forEach(function(item){
            if(active === "all"){
              item.style.display = "";
            } else {
              var tags = item.getAttribute("data-chip-tags");
              item.style.display = (tags && tags.indexOf(active) !== -1) ? "" : "none";
            }
          });
        }
      }
    });
  }

  /* ====== INIT ====== */
  function init(){
    applyDark(dark);
    applyLang(lang);

    /* set search button icon */
    var sb = document.querySelector(".search-btn");
    if(sb) sb.innerHTML = ICON_SEARCH;
    var sico = document.querySelector(".s-ico");

    /* inject SVG sprite into body */
    if(!document.getElementById("tm-sprite")){
      var spriteDiv = document.createElement("div");
      spriteDiv.id = "tm-sprite";
      spriteDiv.style.display = "none";
      spriteDiv.innerHTML = SVG_SPRITE;
      document.body.insertBefore(spriteDiv, document.body.firstChild);
    }
    if(sico) sico.innerHTML = ICON_SEARCH;

    /* burger */
    var burger = document.getElementById("burger");
    var navLinks = document.getElementById("navLinks");
    if(burger && navLinks){
      burger.addEventListener("click", function(){ navLinks.classList.toggle("open"); });
      navLinks.querySelectorAll("a").forEach(function(a){
        a.addEventListener("click", function(){ navLinks.classList.remove("open"); });
      });
    }

    /* dark toggle */
    var db = document.querySelector(".dark-btn");
    if(db) db.addEventListener("click", function(){ applyDark(!dark); });

    /* lang toggle */
    var lb = document.querySelector(".lang-btn");
    if(lb) lb.addEventListener("click", function(){ applyLang(lang === "zh" ? "en" : "zh"); });

    /* back to top */
    var toTop = document.getElementById("toTop");
    if(toTop){
      window.addEventListener("scroll", function(){ toTop.classList.toggle("show", window.scrollY > 400); });
      toTop.addEventListener("click", function(){ window.scrollTo({top:0, behavior:"smooth"}); });
    }

    /* search */
    var ov = document.getElementById("searchOverlay");
    if(sb) sb.addEventListener("click", openSearch);
    if(ov){
      var close = ov.querySelector(".search-close");
      if(close) close.addEventListener("click", closeSearch);
      ov.addEventListener("click", function(e){ if(e.target === ov) closeSearch(); });
      var inp = ov.querySelector("input");
      if(inp){
        inp.setAttribute("data-i18n","search.placeholder");
        inp.setAttribute("data-i18n-ph","1");
        inp.addEventListener("input", function(){ renderSearch(inp.value); });
      }
      ov.addEventListener("click", function(e){
        var item = e.target.closest(".sr-item");
        if(item && item.hasAttribute("href") && item.getAttribute("href") !== "#"){
          if(inp) saveSearchHistory(inp.value.trim());
        }
      });
      document.addEventListener("keydown", function(e){
        if(e.key === "Escape") closeSearch();
        if((e.ctrlKey || e.metaKey) && e.key === "k"){ e.preventDefault(); openSearch(); }
        if(ov.classList.contains("show")){
          if(e.key === "ArrowDown"){ e.preventDefault(); moveSearchSel(1); }
          if(e.key === "ArrowUp"){ e.preventDefault(); moveSearchSel(-1); }
          if(e.key === "Enter"){ e.preventDefault(); confirmSearch(); }
        }
      });
    }

    /* progress tracking */
    document.querySelectorAll("[data-track]").forEach(function(el){
      el.addEventListener("click", function(e){
        if(e.target.closest("a") && !e.target.closest("[data-track-toggle]")) return;
        var id = el.getAttribute("data-track");
        toggleProgress(id);
      });
      el.style.cursor = "pointer";
    });
    applyProgress();
    updateProgressBars();

    /* progress export / import / reset */
    document.querySelectorAll("[data-action='export-progress']").forEach(function(b){
      b.addEventListener("click", exportProgress);
    });
    document.querySelectorAll("[data-action='import-progress']").forEach(function(b){
      b.addEventListener("click", function(){
        var jsonStr = prompt("Paste progress JSON:");
        if(jsonStr && importProgress(jsonStr)) alert("OK");
        else if(jsonStr) alert("Invalid JSON");
      });
    });
    document.querySelectorAll("[data-action='reset-progress']").forEach(function(b){
      b.addEventListener("click", resetProgress);
    });

    /* filter chips */
    document.querySelectorAll("[data-chip-group]").forEach(function(group){
      group.querySelectorAll("[data-chip]").forEach(function(chip){
        chip.addEventListener("click", function(){
          var gname = group.getAttribute("data-chip-group");
          var val = chip.getAttribute("data-chip");
          chipState[gname] = val;
          applyFilters();
        });
      });
    });
    applyFilters();

    /* highlight anchor */
    highlightAnchor();
    window.addEventListener("hashchange", highlightAnchor);

    /* page prefetch */
    if(!window.TM_NO_PREFETCH){
      var pages = ["index.html","getting-started.html","combat.html","towers.html","economy.html","maps.html","codex.html","changelog.html"];
      pages.forEach(function(p){
        var link = document.createElement("link");
        link.rel = "prefetch";
        link.href = p;
        document.head.appendChild(link);
      });
    }

    /* register service worker */
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("sw.js").catch(function(){});
    }

    /* re-apply progress after delay */
    setTimeout(function(){ applyProgress(); updateProgressBars(); }, 100);

    applyLang(lang);
  }

  /* expose for page scripts */
  window.TM_I18N = I18N;
  window.TM_t = t;
  window.TM_lang = function(){ return lang; };
  window.TM_exportProgress = exportProgress;
  window.TM_importProgress = importProgress;
  window.TM_resetProgress = resetProgress;
  window.TM_getProgress = getProgress;
  window.TM_toggleProgress = toggleProgress;

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

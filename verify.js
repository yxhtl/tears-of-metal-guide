/* ===== Tears of Metal Guide - Cross-File Consistency Verifier =====
 *
 * 用法: node verify.js
 *
 * 检查以下六组跨文件同步关系:
 *  1. Dashboard IDs (common.js) ↔ data-track IDs (HTML pages)
 *  2. SEARCH_INDEX URLs (common.js) ↔ actual HTML files & anchor IDs
 *  3. SW ASSETS (sw.js) ↔ actual files on disk
 *  4. Prefetch list (common.js init()) ↔ actual HTML files
 *  5. sitemap.xml URLs ↔ actual HTML files
 *  6. manifest.json references ↔ actual files
 *
 * 输出: PASS/FAIL 报告, 非零退出码表示有错误
 */

var fs = require('fs');
var path = require('path');

var ROOT = __dirname;
var errors = [];
var warnings = [];
var passed = 0;

function ok(msg) { passed++; }
function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

/* ---- Helpers ---- */
function readFile(name) {
  var p = path.join(ROOT, name);
  if (!fs.existsSync(p)) { fail('文件不存在: ' + name); return ''; }
  return fs.readFileSync(p, 'utf8');
}

function fileExists(name) {
  return fs.existsSync(path.join(ROOT, name));
}

function extractAttr(html, tag, attr) {
  var results = [];
  var re = new RegExp('<' + tag + '[^>]*' + attr + '="([^"]+)"', 'gi');
  var m;
  while ((m = re.exec(html)) !== null) {
    results.push(m[1]);
  }
  return results;
}

function extractAttrFromTag(html, attr) {
  var results = [];
  var re = new RegExp(attr + '="([^"]+)"', 'gi');
  var m;
  while ((m = re.exec(html)) !== null) {
    results.push(m[1]);
  }
  return results;
}

/* ---- HTML pages list ---- */
var htmlPages = fs.readdirSync(ROOT)
  .filter(function(f) { return f.endsWith('.html'); })
  .sort();

console.log('找到 HTML 页面: ' + htmlPages.join(', ') + '\n');

/* ================================================================
 * 1. Dashboard IDs (common.js) ↔ data-track IDs (HTML pages)
 * ================================================================ */
console.log('检查 1: Dashboard IDs ↔ data-track IDs...');

var commonJs = readFile('js/common.js');

// Extract DASHBOARD array IDs
var dashIds = [];
var dashMatch = commonJs.match(/var DASHBOARD\s*=\s*\[([\s\S]*?)\];/);
if (dashMatch) {
  var idRe = /"([a-z0-9-]+)"/gi;
  var m;
  // Only capture IDs inside { ids:[...] } blocks
  var idsBlocks = dashMatch[1].match(/ids:\s*\[([^\]]+)\]/g) || [];
  idsBlocks.forEach(function(block) {
    var idMatches = block.match(/"([^"]+)"/g) || [];
    idMatches.forEach(function(id) {
      dashIds.push(id.replace(/"/g, ''));
    });
  });
}

// Collect all data-track IDs from all HTML pages
var allTrackIds = {};
htmlPages.forEach(function(page) {
  var html = readFile(page);
  var trackIds = extractAttrFromTag(html, 'data-track');
  trackIds.forEach(function(id) {
    if (!allTrackIds[id]) allTrackIds[id] = [];
    allTrackIds[id].push(page);
  });
});

// Check each Dashboard ID exists on some page
dashIds.forEach(function(id) {
  if (allTrackIds[id]) {
    ok();
  } else {
    fail('Dashboard 引用了不存在的 data-track ID: "' + id + '" — 在任何 HTML 页面中均未找到');
  }
});

// Check for orphaned data-track IDs not in Dashboard (warning only)
Object.keys(allTrackIds).forEach(function(id) {
  if (dashIds.indexOf(id) === -1) {
    warn('data-track ID "' + id + '" (' + allTrackIds[id].join(', ') + ') 不在 Dashboard 中 — 仪表盘不会显示此项进度');
  }
});

// Check for duplicate data-track IDs across pages
Object.keys(allTrackIds).forEach(function(id) {
  if (allTrackIds[id].length > 1) {
    warn('data-track ID "' + id + '" 在多个页面重复: ' + allTrackIds[id].join(', ') + ' — 勾选状态会同步, 确认是否有意为之');
  }
});

console.log('  Dashboard IDs: ' + dashIds.length + ' 个');
console.log('  页面 data-track IDs: ' + Object.keys(allTrackIds).length + ' 个\n');

/* ================================================================
 * 2. SEARCH_INDEX URLs ↔ actual HTML files & anchor IDs
 * ================================================================ */
console.log('检查 2: SEARCH_INDEX URLs ↔ HTML 文件和锚点...');

var searchIndexMatch = commonJs.match(/var SEARCH_INDEX\s*=\s*\[([\s\S]*?)\];/);
if (searchIndexMatch) {
  var urlRe = /url:\s*"([^"]+)"/g;
  var m;
  var searchUrls = [];
  while ((m = urlRe.exec(searchIndexMatch[1])) !== null) {
    searchUrls.push(m[1]);
  }

  searchUrls.forEach(function(url) {
    var parts = url.split('#');
    var file = parts[0];
    var anchor = parts[1];

    // Check file exists
    if (!fileExists(file)) {
      fail('SEARCH_INDEX URL 指向不存在的文件: "' + url + '"');
      return;
    }

    // Check anchor exists if specified
    if (anchor) {
      var html = readFile(file);
      var anchorRe = new RegExp('id="' + anchor + '"', 'i');
      if (!anchorRe.test(html)) {
        fail('SEARCH_INDEX URL 锚点在 ' + file + ' 中不存在: #' + anchor);
      } else {
        ok();
      }
    } else {
      ok();
    }
  });
  console.log('  搜索索引 URL: ' + searchUrls.length + ' 条\n');
}

/* ================================================================
 * 3. SW ASSETS (sw.js) ↔ actual files on disk
 * ================================================================ */
console.log('检查 3: SW ASSETS ↔ 实际文件...');

var swJs = readFile('sw.js');
var assetsMatch = swJs.match(/var ASSETS\s*=\s*\[([\s\S]*?)\];/);
if (assetsMatch) {
  var assetRe = /"([^"]+)"/g;
  var m;
  var assets = [];
  while ((m = assetRe.exec(assetsMatch[1])) !== null) {
    assets.push(m[1]);
  }

  assets.forEach(function(asset) {
    if (fileExists(asset)) {
      ok();
    } else {
      fail('SW ASSETS 引用了不存在的文件: "' + asset + '"');
    }
  });

  // Check for HTML files not in SW ASSETS
  htmlPages.forEach(function(page) {
    if (assets.indexOf(page) === -1) {
      fail('HTML 页面 "' + page + '" 不在 SW ASSETS 中 — 离线访问时不可用');
    }
  });

  // Check SW cache version
  var cacheMatch = swJs.match(/CACHE_NAME\s*=\s*"([^"]+)"/);
  if (cacheMatch) {
    console.log('  SW 缓存版本: ' + cacheMatch[1]);
  }
  console.log('  ASSETS: ' + assets.length + ' 个\n');
}

/* ================================================================
 * 4. Prefetch list (common.js init()) ↔ actual HTML files
 * ================================================================ */
console.log('检查 4: Prefetch 列表 ↔ HTML 文件...');

var prefetchMatch = commonJs.match(/var pages\s*=\s*\[([\s\S]*?)\]/);
if (prefetchMatch) {
  var prefetchRe = /"([^"]+)"/g;
  var m;
  var prefetchPages = [];
  while ((m = prefetchRe.exec(prefetchMatch[1])) !== null) {
    prefetchPages.push(m[1]);
  }

  prefetchPages.forEach(function(page) {
    if (fileExists(page)) {
      ok();
    } else {
      fail('Prefetch 列表引用了不存在的文件: "' + page + '"');
    }
  });

  // Check for HTML files not in prefetch list
  htmlPages.forEach(function(page) {
    if (prefetchPages.indexOf(page) === -1) {
      warn('HTML 页面 "' + page + '" 不在 prefetch 列表中 — 切换到此页时不预加载');
    }
  });

  console.log('  Prefetch 页面: ' + prefetchPages.length + ' 个\n');
}

/* ================================================================
 * 5. sitemap.xml ↔ actual HTML files
 * ================================================================ */
console.log('检查 5: sitemap.xml ↔ HTML 文件...');

var sitemap = readFile('sitemap.xml');
var locRe = /<loc>([^<]+)<\/loc>/g;
var m;
var sitemapUrls = [];
while ((m = locRe.exec(sitemap)) !== null) {
  sitemapUrls.push(m[1]);
}

sitemapUrls.forEach(function(fullUrl) {
  // Extract filename from URL
  var filename = fullUrl.split('/').pop();
  if (filename && fileExists(filename)) {
    ok();
  } else if (filename) {
    fail('sitemap.xml 引用了不存在的文件: "' + filename + '" (' + fullUrl + ')');
  }
});

// Check for HTML files not in sitemap
htmlPages.forEach(function(page) {
  var inSitemap = sitemapUrls.some(function(url) {
    return url.endsWith('/' + page) || url.endsWith(page);
  });
  if (!inSitemap) {
    fail('HTML 页面 "' + page + '" 不在 sitemap.xml 中 — 搜索引擎找不到此页');
  }
});

console.log('  sitemap URL: ' + sitemapUrls.length + ' 条\n');

/* ================================================================
 * 6. manifest.json ↔ actual files
 * ================================================================ */
console.log('检查 6: manifest.json 基本检查...');

var manifest = readFile('manifest.json');
try {
  var manifestObj = JSON.parse(manifest);
  ['name', 'short_name', 'start_url'].forEach(function(field) {
    if (!manifestObj[field]) {
      fail('manifest.json 缺少必需字段: ' + field);
    } else {
      ok();
    }
  });
  if (manifestObj.start_url && !fileExists(manifestObj.start_url)) {
    fail('manifest.json start_url 指向不存在的文件: ' + manifestObj.start_url);
  }
  console.log('  manifest: OK\n');
} catch(e) {
  fail('manifest.json 解析失败: ' + e.message);
}

/* ================================================================
 * 7. data-track-group ↔ data-progress-bar 一致性
 * ================================================================ */
console.log('检查 7: data-track-group ↔ data-progress-bar 一致性...');

htmlPages.forEach(function(page) {
  var html = readFile(page);
  var groups = extractAttrFromTag(html, 'data-track-group');
  var bars = extractAttrFromTag(html, 'data-progress-bar');

  // Every progress-bar should have matching track-group items
  bars.forEach(function(barGroup) {
    if (barGroup === 'overall') return; // 'overall' is special
    if (groups.indexOf(barGroup) === -1) {
      fail(page + ': data-progress-bar="' + barGroup + '" 没有对应的 data-track-group 项 — 进度条永远显示 0/N');
    }
  });

  // Every track-group should have a progress-bar (warning only)
  var uniqueGroups = groups.filter(function(v, i, a) { return a.indexOf(v) === i; });
  uniqueGroups.forEach(function(g) {
    if (bars.indexOf(g) === -1) {
      warn(page + ': data-track-group="' + g + '" 没有对应的 data-progress-bar — 用户看不到此分组的进度');
    }
  });
});

console.log('');

/* ================================================================
 * 8. SVG sprite <use> references ↔ <symbol> definitions
 * ================================================================ */
console.log('检查 8: SVG <use> 引用 ↔ <symbol> 定义...');

var spriteMatch = commonJs.match(/var SVG_SPRITE\s*=\s*'([\s\S]*?)';/);
if (spriteMatch) {
  var sprite = spriteMatch[1];
  var symbolRe = /<symbol id="i-([^"]+)"/g;
  var m;
  var definedIcons = [];
  while ((m = symbolRe.exec(sprite)) !== null) {
    definedIcons.push('i-' + m[1]);
  }

  // Collect all <use href="#i-xxx"> references from HTML pages
  var usedIcons = {};
  htmlPages.forEach(function(page) {
    var html = readFile(page);
    var useRe = /<use href="#(i-[^"]+)"/g;
    var m;
    while ((m = useRe.exec(html)) !== null) {
      if (!usedIcons[m[1]]) usedIcons[m[1]] = [];
      usedIcons[m[1]].push(page);
    }
  });

  // Check each used icon is defined in sprite
  Object.keys(usedIcons).forEach(function(icon) {
    if (definedIcons.indexOf(icon) === -1) {
      fail('SVG 图标 "' + icon + '" 被引用 (' + usedIcons[icon].join(', ') + ') 但未在 SVG_SPRITE 中定义');
    } else {
      ok();
    }
  });

  // Check for defined but unused icons (warning)
  definedIcons.forEach(function(icon) {
    if (!usedIcons[icon]) {
      warn('SVG 图标 "' + icon + '" 已定义但未被任何页面引用');
    }
  });

  console.log('  已定义图标: ' + definedIcons.length + ' 个');
  console.log('  被引用图标: ' + Object.keys(usedIcons).length + ' 个\n');
}

/* ================================================================
 * Report
 * ================================================================ */
console.log('═══════════════════════════════════════════════════');
console.log('  验证结果');
console.log('═══════════════════════════════════════════════════');
console.log('  ✓ 通过: ' + passed);
console.log('  ⚠ 警告: ' + warnings.length);
console.log('  ✗ 错误: ' + errors.length);
console.log('═══════════════════════════════════════════════════\n');

if (warnings.length > 0) {
  console.log('--- 警告 ---');
  warnings.forEach(function(w) { console.log('  ⚠ ' + w); });
  console.log('');
}

if (errors.length > 0) {
  console.log('--- 错误 ---');
  errors.forEach(function(e) { console.log('  ✗ ' + e); });
  console.log('');
  process.exit(1);
} else {
  console.log('✓ 所有关键检查通过!\n');
  process.exit(0);
}

# Tears of Metal Guide — 维护清单

> 每次修改内容后，对照此清单检查。运行 `node verify.js` 可自动验证大部分项目。

## 日常维护流程

### 新增页面时

- [ ] 在 `sw.js` 的 `ASSETS` 数组中添加文件名
- [ ] 在 `js/common.js` 的 `init()` prefetch `pages` 数组中添加文件名
- [ ] 在 `sitemap.xml` 中添加 `<url>` 条目
- [ ] 在 `js/common.js` 的 `SEARCH_INDEX` 中添加至少一条页面总览条目
- [ ] 在所有页面的导航栏 `<nav class="nav-links">` 中添加链接（如需）
- [ ] 在所有页面的页脚中添加链接（如需）
- [ ] 运行 `node verify.js` 确认一致性

### 新增可追踪项 (data-track) 时

- [ ] 确定唯一的 `data-track` ID（避免与已有 ID 冲突）
- [ ] 如该项出现在多个页面（如 combat 和 codex），使用 **相同的 ID** 以共享追踪状态
- [ ] 在 `js/common.js` 的 `DASHBOARD` 数组中添加对应 ID
- [ ] 在 `index.html` 的 Dashboard 区域添加 `data-dash` 卡片
- [ ] 确认 `data-track-group` 与页面上的 `data-progress-bar` 匹配
- [ ] 运行 `node verify.js` 确认 Dashboard ↔ 页面 ID 一致

### 修改游戏数据时

- [ ] 更新对应 HTML 页面的内容
- [ ] 如涉及构建计算器，更新 `js/common.js` 中的 `ARTIFACT_DATA`
- [ ] 更新 `SEARCH_INDEX` 中的标签和拼音（如关键词变化）
- [ ] 更新页面的 `ver-tag` 日期标签
- [ ] 更新 `changelog.html` 添加更新记录
- [ ] 递增 `sw.js` 中的 `CACHE_NAME` 版本号
- [ ] 运行 `node verify.js`

### 发布新版本时

- [ ] 递增 `sw.js` 的 `CACHE_NAME`（如 `tm-guide-v2.2` → `tm-guide-v2.3`）
- [ ] 运行 `node verify.js` 确认零错误
- [ ] 在 `changelog.html` 中添加版本记录

## 跨文件同步关系

| # | 同步关系 | 文件 | 检查方式 |
|---|---|---|---|
| 1 | Dashboard IDs ↔ data-track IDs | `common.js` ↔ HTML pages | `verify.js` 检查 1 |
| 2 | SEARCH_INDEX URLs ↔ 页面和锚点 | `common.js` ↔ HTML pages | `verify.js` 检查 2 |
| 3 | SW ASSETS ↔ 实际文件 | `sw.js` ↔ 文件系统 | `verify.js` 检查 3 |
| 4 | Prefetch 列表 ↔ 实际页面 | `common.js` init() ↔ 文件系统 | `verify.js` 检查 4 |
| 5 | sitemap.xml ↔ 实际页面 | `sitemap.xml` ↔ 文件系统 | `verify.js` 检查 5 |
| 6 | SVG `<use>` 引用 ↔ `<symbol>` 定义 | HTML pages ↔ `common.js` SVG_SPRITE | `verify.js` 检查 8 |

## 约定合规要点

- `applyLang()` 通过 `window.TM_recalcBuild` 间接调用计算器重算，不直接调用 `calcBuild()`
- `window.TM_BUILD` 暴露 `ARTIFACT_DATA` 供页面脚本使用
- `window.TM_recalcBuild = calcBuild` 暴露重算入口
- 每个内容页底部必须有 `.cross-links` 和 `.page-nav`（包括工具页面：about/faq/changelog）
- 同一追踪项在多个页面出现时，使用相同的 `data-track` ID 以共享状态

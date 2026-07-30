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
    + '<symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>'
    + '<symbol id="i-flag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></symbol>'
    + '<symbol id="i-gem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></symbol>'
    + '<symbol id="i-skull" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="7"/><path d="M9 16v5h6v-5"/><path d="M9 9h.01"/><path d="M15 9h.01"/></symbol>'
    + '<symbol id="i-axe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 14-7.5 7.5a2.12 2.12 0 0 1-3-3L7.5 14"/><path d="M9.5 11.5 16 5a3 3 0 0 1 6 0l-1.5 1.5a3 3 0 0 0 0 6L14 11.5"/></symbol>'
    + '<symbol id="i-hammer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12h5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h5"/><path d="M12 12V4"/></symbol>'
    + '<symbol id="i-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></symbol>'
    + '<symbol id="i-crown" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M4 20V8l5 4 3-6 3 6 5-4v12"/></symbol>'
    + '<symbol id="i-target" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></symbol>'
    + '<symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></symbol>'
    + '<symbol id="i-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></symbol>'
    + '<symbol id="i-mobile" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></symbol>'
    + '<symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>'
    + '<symbol id="i-refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></symbol>'
    + '<symbol id="i-whirl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/></symbol>'
    + '</svg>';

  /* ---------- i18n dictionary (UI framework) ---------- */
  var I18N = {
    "brand": { zh: "钢铁之泪攻略站", en: "Tears of Metal Guide" },
    "nav.getting-started": { zh: "新手入门", en: "Beginner" },
    "nav.combat": { zh: "战斗系统", en: "Combat" },
    "nav.artifacts": { zh: "神器构建", en: "Artifacts" },
    "nav.progression": { zh: "养成进度", en: "Progression" },
    "nav.environments": { zh: "环境探索", en: "Environments" },
    "nav.bosses": { zh: "Boss 专题", en: "Bosses" },
    "nav.codex": { zh: "图鉴速查", en: "Codex" },
    "nav.cta.start": { zh: "开始攻略", en: "Start Guide" },
    "nav.cta.home": { zh: "返回首页", en: "Home" },
    "search.placeholder": { zh: "搜索攻略、神器、环境…", en: "Search guides, artifacts, environments…" },
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
    "foot.branddesc": { zh: "《Tears of Metal》抢先体验攻略站，内容随游戏更新逐步完善。", en: "A Tears of Metal Early Access guide site, updated as the game evolves." },
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
    "progress.overview": { zh: "我的进度总览", en: "My Progress Overview" },
    "nav.faq": { zh: "常见问题", en: "FAQ" },
    "foot.faq": { zh: "常见问题", en: "FAQ" }
  };

  /* ---------- Search index ---------- */
  var SEARCH_INDEX = [
    { page: "首页", pageEn: "Home", url: "index.html",
      title: "钢铁之泪攻略站", titleEn: "Tears of Metal Guide",
      tags: "Tears of Metal 钢铁之泪 攻略 首页 动作 roguelike 无双 合作 苏格兰", tagsEn: "tears metal guide home action roguelike musou co-op scottish",
      py: "gangtiezhilei gonglvezhan" },
    { page: "新手入门", pageEn: "Beginner", url: "getting-started.html",
      title: "新手入门指南：战役流程与基础", titleEn: "Beginner Guide: Campaign Flow & Basics",
      tags: "新手 入门 战役 首战 教学 基础机制 合作 手柄 抢先体验", tagsEn: "beginner guide campaign first-run tutorial basics co-op controller early-access",
      py: "xinshou rumen zhanyi liucheng" },
    { page: "战斗系统", pageEn: "Combat", url: "combat.html",
      title: "战斗系统深度拆解", titleEn: "Combat System Deep Dive",
      tags: "战斗 系统 动作 无双 hack slash 连招 技能 合作 战术", tagsEn: "combat system action musou hack slash combo skill co-op tactics",
      py: "zhandou xitong dongzuo wushuang" },
    { page: "神器构建", pageEn: "Artifacts", url: "towers.html",
      title: "神器与构建系统", titleEn: "Artifacts & Build System",
      tags: "神器 artifacts 构建 build 徽章 emblems 护符 charms 协同", tagsEn: "artifact build emblem charm synergy",
      py: "shenqi goujian huizhang hufu" },
    { page: "养成进度", pageEn: "Progression", url: "economy.html",
      title: "Roguelite 养成与进度系统", titleEn: "Roguelite Progression System",
      tags: "养成 进度 roguelite 永久升级 局间 升级 路线 母龙石", tagsEn: "progression roguelite permanent upgrade meta between-runs mother-dragon-stone",
      py: "yangcheng jindu roguelite yongjiu" },
    { page: "环境探索", pageEn: "Environments", url: "maps.html",
      title: "45+ 环境概览", titleEn: "45+ Environments Overview",
      tags: "环境 地图 关卡 生物群系 探索 45 地形 苏格兰 岛屿", tagsEn: "environment map level biome explore terrain scottish island",
      py: "huanjing ditu tansuo shengwuqunxi" },
    { page: "图鉴速查", pageEn: "Codex", url: "codex.html",
      title: "全图鉴速查", titleEn: "Full Codex Quick Reference",
      tags: "图鉴 神器 徽章 护符 敌人 速查 数据 属性 筛选 100 构建参考", tagsEn: "codex artifact emblem charm enemy reference data stats filter 100 build",
      py: "tujian shenqi huizhang hufu sucha" },
    { page: "图鉴速查", pageEn: "Codex", url: "codex.html#artifacts",
      title: "神器图鉴", titleEn: "Artifact Codex",
      tags: "神器 图鉴 攻击 防御 辅助 属性 筛选", tagsEn: "artifact codex offense defense utility stats filter",
      py: "shenqi tujian gongji fangyu" },
    { page: "图鉴速查", pageEn: "Codex", url: "codex.html#emblems",
      title: "徽章图鉴", titleEn: "Emblem Codex",
      tags: "徽章 图鉴 8家族 Tier 1 2 3 协同 属性", tagsEn: "emblem codex 8 families tier synergy stats",
      py: "huizhang tujian jiazu tier xietong" },
    { page: "图鉴速查", pageEn: "Codex", url: "codex.html#charms",
      title: "护符图鉴", titleEn: "Charm Codex",
      tags: "护符 图鉴 30+ 稀有度 购买 挑战 属性", tagsEn: "charm codex 30+ rarity purchase challenge stats",
      py: "hufu tujian xiyoudugoumai tiaozhan" },
    { page: "图鉴速查", pageEn: "Codex", url: "codex.html#enemies",
      title: "敌人图鉴", titleEn: "Enemy Codex",
      tags: "敌人 图鉴 精英 入侵者 腐化铁 威胁 系统", tagsEn: "enemy codex elite invader corrupted iron threat system",
      py: "diren tujian jingyi ruxianzhe fuhuatie" },
    { page: "图鉴速查", pageEn: "Codex", url: "codex.html#reference",
      title: "快速参考与构建", titleEn: "Quick Reference & Builds",
      tags: "快速参考 构建 暴击 攻速 坦克 机动 反伤 刷金", tagsEn: "quick reference build crit atkspd tank mobility reflect farming",
      py: "kuaisu cankao goujian baoji" },
    /* anchor-level entries */
    { page: "战斗系统", pageEn: "Combat", url: "combat.html#mechanics",
      title: "战斗机制概览", titleEn: "Combat Mechanics Overview",
      tags: "战斗 机制 动作 无双 连击 轻击 重击 闪避", tagsEn: "combat mechanics action musou combo light heavy dodge",
      py: "zhandou jizhi gaillan" },
    { page: "战斗系统", pageEn: "Combat", url: "combat.html#combos",
      title: "连招与技能", titleEn: "Combos & Abilities",
      tags: "连招 技能 组合 轻击 重击 特殊 终结", tagsEn: "combo ability special finisher light heavy",
      py: "lianzhao jineng zuhe" },
    { page: "战斗系统", pageEn: "Combat", url: "combat.html#co-op",
      title: "合作战术", titleEn: "Co-op Tactics",
      tags: "合作 联机 4人 战术 配合 团队", tagsEn: "co-op online 4-player tactics team coordination",
      py: "hezuo lianji zhanshu" },
    { page: "战斗系统", pageEn: "Combat", url: "combat.html#tier-list",
      title: "构建强度榜", titleEn: "Build Tier List",
      tags: "强度榜 排名 S级 A级 B级 构建 神器", tagsEn: "tier list ranking S A B build artifact",
      py: "qiandubang paiming" },
    { page: "神器构建", pageEn: "Artifacts", url: "towers.html#artifacts",
      title: "神器图鉴与分类", titleEn: "Artifact Categories",
      tags: "神器 分类 攻击 防御 辅助 效果 100", tagsEn: "artifact category offense defense utility effect 100",
      py: "shenqi fenlei gongji fangyu" },
    { page: "神器构建", pageEn: "Artifacts", url: "towers.html#emblems",
      title: "徽章系统", titleEn: "Emblems System",
      tags: "徽章 emblems 定制 角色养成 属性", tagsEn: "emblem customization character progression stats",
      py: "huizhang xitong dingzhi" },
    { page: "神器构建", pageEn: "Artifacts", url: "towers.html#charms",
      title: "护符系统", titleEn: "Charms System",
      tags: "护符 charms 饰品 效果 被动", tagsEn: "charm accessory effect passive",
      py: "hufu xitong shipin" },
    { page: "神器构建", pageEn: "Artifacts", url: "towers.html#synergy",
      title: "构建协同与原型", titleEn: "Build Synergy & Archetypes",
      tags: "构建 协同 原型 暴击 坦克 机动 攻速", tagsEn: "build synergy archetype crit tank mobility atkspd",
      py: "goujian xietong yuanxing" },
    { page: "神器构建", pageEn: "Artifacts", url: "towers.html#calc",
      title: "构建计算器", titleEn: "Build Calculator",
      tags: "构建 计算器 属性 加成 协同 神器", tagsEn: "build calculator stats bonus synergy artifact",
      py: "goujian jisuanqi shuxing" },
    { page: "养成进度", pageEn: "Progression", url: "economy.html#meta-tree",
      title: "定居点升级树", titleEn: "Settlement Upgrade Tree",
      tags: "升级树 永久升级 局间 进度 母龙石 点数", tagsEn: "settlement upgrade tree permanent progression mother-dragon-stone points",
      py: "yangchengshu yongjiu shengji" },
    { page: "养成进度", pageEn: "Progression", url: "economy.html#build-order",
      title: "推荐养成路线", titleEn: "Recommended Meta Build Order",
      tags: "推荐 养成 路线 顺序 优先", tagsEn: "recommended meta build order priority",
      py: "tuijian yangcheng luxian shunxu" },
    { page: "养成进度", pageEn: "Progression", url: "economy.html#loop",
      title: "Roguelite 循环", titleEn: "Roguelite Loop",
      tags: "roguelite 循环 局内 局间 死亡 升级 母龙石", tagsEn: "roguelite loop run death upgrade mother-dragon-stone",
      py: "roguelite xunhuan jujian" },
    { page: "养成进度", pageEn: "Progression", url: "economy.html#farming",
      title: "Meta 点数刷取效率", titleEn: "Meta Point Farming Efficiency",
      tags: "Meta 点数 刷取 效率 环境 难度 奖励", tagsEn: "meta point farming efficiency environment difficulty bonus",
      py: "meta dianshu shuaqu xiaolv" },
    { page: "环境探索", pageEn: "Environments", url: "maps.html#biomes",
      title: "生物群系概览", titleEn: "Biome Overview",
      tags: "生物群系 环境 地形 草地 森林 山地 海岸 村庄", tagsEn: "biome environment terrain grassland forest mountain coast village",
      py: "shengwuqunxi huanjing dixing" },
    { page: "环境探索", pageEn: "Environments", url: "maps.html#features",
      title: "环境特性与机制", titleEn: "Environmental Features & Mechanics",
      tags: "环境 特性 机制 天气 地形 危险 互动", tagsEn: "environment feature mechanic weather terrain hazard interactive",
      py: "huanjing texing jizhi" },
    { page: "环境探索", pageEn: "Environments", url: "maps.html#strategies",
      title: "环境策略", titleEn: "Environment-Specific Strategies",
      tags: "环境 策略 开阔 狭窄 复杂 Boss 地形利用", tagsEn: "environment strategy open narrow complex boss terrain",
      py: "huanjing celue kaikuo xiachu" },
    /* boss page entries */
    { page: "Boss专题", pageEn: "Bosses", url: "bosses.html",
      title: "Boss 遭遇战攻略", titleEn: "Boss Encounter Guide",
      tags: "Boss 遭遇战 Gilles the Hog Iseult the Banshee Harold Act 1 2 3 机制 应对策略", tagsEn: "boss encounter gilles hog isoult banshee harold act phase mechanic strategy",
      py: "boss zaoyuzhan gonglve gilles hog banshee harold" },
    { page: "Boss专题", pageEn: "Bosses", url: "bosses.html#gilles",
      title: "Gilles the Hog", titleEn: "Gilles the Hog",
      tags: "Gilles the Hog 第一幕 Boss 威胁度 近战 重击", tagsEn: "gilles hog act 1 boss threat melee heavy",
      py: "gilles hog diyimu boss" },
    { page: "Boss专题", pageEn: "Bosses", url: "bosses.html#banshee",
      title: "Iseult the Banshee", titleEn: "Iseult the Banshee",
      tags: "Iseult the Banshee 第二幕 Boss 隐匿 跳跃 浮空 机动", tagsEn: "iseoult banshee act 2 boss hide jump float mobility",
      py: "banshee diwumu boss yinni tiaoyue fukong" },
    { page: "Boss专题", pageEn: "Bosses", url: "bosses.html#harold",
      title: "Harold", titleEn: "Harold",
      tags: "Harold 第三幕 Boss 无敌 最终战 复杂机制", tagsEn: "harold act 3 boss invincible final complex mechanic",
      py: "harold disanmu boss wudi zuizhongzhan" },
    { page: "Boss专题", pageEn: "Bosses", url: "bosses.html#general",
      title: "通用 Boss 技巧", titleEn: "General Boss Tips",
      tags: "通用 Boss 技巧 准备 闪避 营队 阶段转换 击杀 Act", tagsEn: "general boss tips preparation dodge battalion act phase kill",
      py: "tongyong boss jiqiao shanbi act" },
    { page: "Boss专题", pageEn: "Bosses", url: "bosses.html#co-op",
      title: "合作 Boss 战术", titleEn: "Co-op Boss Tactics",
      tags: "合作 Boss 战术 角色分工 复活 大招轮换 联机", tagsEn: "co-op boss tactics role split revive ultimate rotation",
      py: "hezuo boss zhanshu juefengong" },
    { page: "Boss专题", pageEn: "Bosses", url: "bosses.html#builds",
      title: "各 Boss 构建推荐", titleEn: "Build Recommendations by Boss",
      tags: "Boss 构建 推荐 神器 属性 优先级 计算器", tagsEn: "boss build recommendation artifact stat priority calculator",
      py: "boss goujian tuijian shenqi" },
    /* faq entry */
    { page: "常见问题", pageEn: "FAQ", url: "faq.html",
      title: "常见问题", titleEn: "FAQ",
      tags: "FAQ 常见问题 问答 新手 合作 进度 抢先体验", tagsEn: "faq questions answers beginner co-op progress early-access",
      py: "changjianwenti wenti wenda" },
    /* about entry */
    { page: "关于", pageEn: "About", url: "about.html",
      title: "关于本站", titleEn: "About This Site",
      tags: "关于 本站 技术 免责 联系 贡献 PWA 离线", tagsEn: "about site tech disclaimer contact contribute pwa offline",
      py: "guanyu benzhan jishu mianze" }
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

    /* 7) Recalculate build calculator if present (convention: TM_recalcBuild) */
    if(window.TM_recalcBuild) window.TM_recalcBuild();
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
  /* ===== DASHBOARD ===== */
  var DASHBOARD = [
    { ids:["art-off-blade","art-off-frenzy","art-off-executioner","art-def-bulwark","art-def-reflection","art-util-swift","art-util-greed"], link:"towers.html#artifacts", label:{en:"Artifacts",zh:"神器收集"} },
    { ids:["art-emb-warrior","art-emb-guardian","art-emb-scout","art-emb-sage"], link:"towers.html#emblems", label:{en:"Emblems",zh:"徽章解锁"} },
    { ids:["art-chm-iron","art-chm-thorn","art-chm-vitality","art-chm-swift","art-chm-warding","art-chm-cutthroat"], link:"towers.html#charms", label:{en:"Charms",zh:"护符收集"} },
    { ids:["env-act1","env-act2","env-act3"], link:"maps.html#biomes", label:{en:"Environments",zh:"环境探索"} },
    { ids:["boss-gilles","boss-banshee","boss-harold"], link:"bosses.html", label:{en:"Bosses",zh:"Boss 击败"} },
    { ids:["campaign-1","campaign-2","campaign-3","campaign-4","campaign-5","campaign-6"], link:"getting-started.html", label:{en:"Campaign",zh:"战役进度"} },
    { ids:["meta-stone-power","meta-rally-size","meta-artifact-slot","meta-revive","meta-starting-force","meta-combat-power","meta-coop-bonus","meta-explore-range"], link:"economy.html#meta-tree", label:{en:"Meta Upgrades",zh:"Meta 升级"} },
    { ids:["codex-enemy-grunt","codex-enemy-charger","codex-enemy-armored","codex-enemy-archer","codex-enemy-elite"], link:"codex.html#enemies", label:{en:"Enemy Codex",zh:"敌人图鉴"} }
  ];

  function updateDashboard(){
    var dash = document.getElementById("dashGrid");
    if(!dash) return;
    var prog = getProgress();
    var isEn = lang === "en";
    var totalAll = 0, doneAll = 0;

    DASHBOARD.forEach(function(cat){
      var done = 0;
      cat.ids.forEach(function(id){ if(prog[id]) done++; });
      var total = cat.ids.length;
      var pct = total > 0 ? Math.round(done / total * 100) : 0;
      totalAll += total; doneAll += done;

      var item = dash.querySelector('[data-dash="' + cat.ids[0] + '"]');
      if(item){
        var fill = item.querySelector(".pbar-fill");
        var text = item.querySelector(".pbar-text");
        if(fill) fill.style.width = pct + "%";
        if(text) text.textContent = done + " / " + total;
      }
    });

    var overallPct = totalAll > 0 ? Math.round(doneAll / totalAll * 100) : 0;
    var oBar = document.getElementById("dashOverall");
    if(oBar){
      var oFill = oBar.querySelector(".pbar-fill");
      var oText = oBar.querySelector(".pbar-text");
      if(oFill) oFill.style.width = overallPct + "%";
      if(oText) oText.textContent = doneAll + " / " + totalAll + "  (" + overallPct + "%)";
    }
  }

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
      var pages = ["index.html","getting-started.html","combat.html","towers.html","economy.html","maps.html","codex.html","bosses.html","changelog.html","faq.html","about.html"];
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
    setTimeout(function(){ applyProgress(); updateProgressBars(); updateDashboard(); }, 100);

    /* init build calculator if present */
    initBuildCalc();

    applyLang(lang);
  }

  /* ====== BUILD CALCULATOR (replaces DPS Calculator) ====== */
  var ARTIFACT_DATA = {
    categories: {
      offense: {
        name: { zh: "攻击型", en: "Offense" },
        desc: { zh: "提升伤害输出、攻速、暴击等", en: "Boosts damage, attack speed, crit" },
        artifacts: [
          { id: "off-blade", zh: "示例：利刃碎片", en: "Ex: Blade Shard", atkPct: 0.15, critPct: 0.05, desc: { zh: "+15% 攻击力，+5% 暴击率", en: "+15% ATK, +5% Crit" } },
          { id: "off-frenzy", zh: "示例：狂战之血", en: "Ex: Frenzy Blood", atkPct: 0.10, atkSpdPct: 0.20, desc: { zh: "+10% 攻击力，+20% 攻速", en: "+10% ATK, +20% ATK SPD" } },
          { id: "off-executioner", zh: "示例：处刑者印记", en: "Ex: Executioner's Mark", critDmg: 0.50, atkPct: 0.05, desc: { zh: "+50% 暴击伤害，+5% 攻击力", en: "+50% Crit DMG, +5% ATK" } }
        ]
      },
      defense: {
        name: { zh: "防御型", en: "Defense" },
        desc: { zh: "提升生命值、护甲、减伤", en: "Boosts HP, armor, damage reduction" },
        artifacts: [
          { id: "def-bulwark", zh: "示例：壁垒之心", en: "Ex: Bulwark Heart", hpPct: 0.20, drPct: 0.10, desc: { zh: "+20% 生命值，+10% 减伤", en: "+20% HP, +10% DMG Reduction" } },
          { id: "def-reflection", zh: "示例：反射之镜", en: "Ex: Mirror of Reflection", drPct: 0.15, reflectPct: 0.10, desc: { zh: "+15% 减伤，反射 10% 伤害", en: "+15% DMG Reduction, reflect 10%" } }
        ]
      },
      utility: {
        name: { zh: "辅助型", en: "Utility" },
        desc: { zh: "提升移动速度、冷却缩减、拾取范围", en: "Boosts move speed, CDR, pickup range" },
        artifacts: [
          { id: "util-swift", zh: "示例：疾风之翼", en: "Ex: Wings of Swiftness", moveSpdPct: 0.15, cdrPct: 0.10, desc: { zh: "+15% 移速，+10% 冷却缩减", en: "+15% Move SPD, +10% CDR" } },
          { id: "util-greed", zh: "示例：贪婪之眼", en: "Ex: Eye of Greed", pickupRange: 2.0, goldPct: 0.15, desc: { zh: "+2 拾取范围，+15% 金币", en: "+2 Pickup Range, +15% Gold" } }
        ]
      }
    },
    emblems: [
      { id: "emb-warrior", zh: "示例：战士徽章", en: "Ex: Warrior Emblem", atkPct: 0.10, hpPct: 0.05, desc: { zh: "+10% 攻击，+5% 生命", en: "+10% ATK, +5% HP" } },
      { id: "emb-guardian", zh: "示例：守护徽章", en: "Ex: Guardian Emblem", hpPct: 0.15, drPct: 0.05, desc: { zh: "+15% 生命，+5% 减伤", en: "+15% HP, +5% DMG Reduction" } },
      { id: "emb-scout", zh: "示例：侦察徽章", en: "Ex: Scout Emblem", moveSpdPct: 0.10, critPct: 0.08, desc: { zh: "+10% 移速，+8% 暴击", en: "+10% Move SPD, +8% Crit" } },
      { id: "emb-sage", zh: "示例：贤者徽章", en: "Ex: Sage Emblem", cdrPct: 0.15, atkSpdPct: 0.05, desc: { zh: "+15% 冷却缩减，+5% 攻速", en: "+15% CDR, +5% ATK SPD" } }
    ],
    charms: [
      { id: "chm-iron", zh: "示例：铁壁护符", en: "Ex: Iron Charm", hpFlat: 50, drPct: 0.05, desc: { zh: "+50 生命，+5% 减伤", en: "+50 HP, +5% DMG Reduction" } },
      { id: "chm-thorn", zh: "示例：荆棘护符", en: "Ex: Thorn Charm", reflectPct: 0.15, atkPct: 0.05, desc: { zh: "反射 15% 伤害，+5% 攻击", en: "Reflect 15%, +5% ATK" } },
      { id: "chm-vitality", zh: "示例：生命护符", en: "Ex: Vitality Charm", hpPct: 0.15, regenPct: 0.02, desc: { zh: "+15% 生命，+2% 生命回复/秒", en: "+15% HP, +2% HP Regen/s" } },
      { id: "chm-swift", zh: "示例：疾行护符", en: "Ex: Swift Charm", moveSpdPct: 0.10, dodgePct: 0.05, desc: { zh: "+10% 移速，+5% 闪避", en: "+10% Move SPD, +5% Dodge" } },
      { id: "chm-warding", zh: "示例：庇护护符", en: "Ex: Warding Charm", drPct: 0.10, hpPct: 0.10, desc: { zh: "+10% 减伤，+10% 生命", en: "+10% DMG Reduction, +10% HP" } },
      { id: "chm-cutthroat", zh: "示例：割喉之刃", en: "Ex: Cutthroat's Blade", critPct: 0.10, desc: { zh: "普通护符，终结技 +10% 暴击率", en: "Common Charm, +10% Crit on Finishers" } }
    ]
  };

  function calcBuild(){
    var artSel = document.getElementById("calcArtifact");
    var embSel = document.getElementById("calcEmblem");
    var chmSel = document.getElementById("calcCharm");
    var baseAtkEl = document.getElementById("calcBaseAtk");
    var baseHpEl = document.getElementById("calcBaseHp");
    if(!artSel || !embSel) return;

    /* base stats */
    var baseAtk = baseAtkEl ? parseInt(baseAtkEl.value, 10) : 100;
    var baseHp = baseHpEl ? parseInt(baseHpEl.value, 10) : 500;

    /* find selected artifact */
    var artId = artSel.value;
    var artifact = null;
    Object.keys(ARTIFACT_DATA.categories).forEach(function(cat){
      ARTIFACT_DATA.categories[cat].artifacts.forEach(function(a){
        if(a.id === artId) artifact = a;
      });
    });

    /* find emblem */
    var emblem = ARTIFACT_DATA.emblems.filter(function(e){ return e.id === embSel.value; })[0];

    /* find charm */
    var charm = null;
    if(chmSel && chmSel.value){
      charm = ARTIFACT_DATA.charms.filter(function(c){ return c.id === chmSel.value; })[0];
    }

    /* calculate cumulative bonuses */
    var atkBonus = 0, hpBonus = 0, drBonus = 0, critPct = 0, critDmg = 0;
    var atkSpdBonus = 0, moveSpdBonus = 0, cdrBonus = 0;
    var reflect = 0, hpFlat = 0, pickupRange = 0, goldBonus = 0, dodge = 0, regen = 0;
    var effects = [];

    function applyItem(item){
      if(!item) return;
      if(item.atkPct) atkBonus += item.atkPct;
      if(item.hpPct) hpBonus += item.hpPct;
      if(item.drPct) drBonus += item.drPct;
      if(item.critPct) critPct += item.critPct;
      if(item.critDmg) critDmg += item.critDmg;
      if(item.atkSpdPct) atkSpdBonus += item.atkSpdPct;
      if(item.moveSpdPct) moveSpdBonus += item.moveSpdPct;
      if(item.cdrPct) cdrBonus += item.cdrPct;
      if(item.reflectPct) reflect += item.reflectPct;
      if(item.hpFlat) hpFlat += item.hpFlat;
      if(item.pickupRange) pickupRange += item.pickupRange;
      if(item.goldPct) goldBonus += item.goldPct;
      if(item.dodgePct) dodge += item.dodgePct;
      if(item.regenPct) regen += item.regenPct;
    }

    applyItem(artifact);
    applyItem(emblem);
    applyItem(charm);

    var isEn = lang === "en";

    /* final stats */
    var finalAtk = Math.round(baseAtk * (1 + atkBonus));
    var finalHp = Math.round(baseHp * (1 + hpBonus) + hpFlat);
    var finalDr = Math.round(drBonus * 100);
    var finalCrit = Math.round(critPct * 100);
    var finalAtkSpd = Math.round(atkSpdBonus * 100);
    var finalMoveSpd = Math.round(moveSpdBonus * 100);
    var finalCDR = Math.round(cdrBonus * 100);

    /* update DOM */
    var el;
    el = document.getElementById("rATK"); if(el) el.textContent = finalAtk;
    el = document.getElementById("rHP"); if(el) el.textContent = finalHp;
    el = document.getElementById("rDR"); if(el) el.textContent = finalDr + "%";
    el = document.getElementById("rCrit"); if(el) el.textContent = finalCrit + "%";
    el = document.getElementById("rAtkSpd"); if(el) el.textContent = finalAtkSpd + "%";
    el = document.getElementById("rMoveSpd"); if(el) el.textContent = finalMoveSpd + "%";
    el = document.getElementById("rCDR"); if(el) el.textContent = finalCDR + "%";

    /* effects text */
    if(artifact) effects.push(isEn ? artifact.desc.en : artifact.desc.zh);
    if(emblem) effects.push(isEn ? emblem.desc.en : emblem.desc.zh);
    if(charm) effects.push(isEn ? charm.desc.en : charm.desc.zh);
    if(reflect > 0) effects.push(isEn ? "Reflect: " + (reflect*100) + "%" : "反射：" + (reflect*100) + "%");
    if(pickupRange > 0) effects.push(isEn ? "Pickup Range: +" + pickupRange : "拾取范围：+" + pickupRange);
    if(goldBonus > 0) effects.push(isEn ? "Gold: +" + (goldBonus*100) + "%" : "金币：+" + (goldBonus*100) + "%");
    if(dodge > 0) effects.push(isEn ? "Dodge: " + (dodge*100) + "%" : "闪避：" + (dodge*100) + "%");
    if(regen > 0) effects.push(isEn ? "HP Regen: " + (regen*100) + "%/s" : "生命回复：" + (regen*100) + "%/秒");

    el = document.getElementById("rEffects");
    if(el) el.innerHTML = effects.map(function(s){
      return '<span style="display:inline-block;padding:3px 10px;border-radius:6px;background:var(--parchment);margin:3px 4px 3px 0;font-size:12px">' + s + '</span>';
    }).join("");
  }

  function initBuildCalc(){
    var calc = document.getElementById("buildCalculator");
    if(!calc) return;
    ["calcArtifact","calcEmblem","calcCharm","calcBaseAtk","calcBaseHp"].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.addEventListener("change", calcBuild);
    });
    calcBuild();
  }

  /* expose for page scripts */
  window.TM_I18N = I18N;
  window.TM_t = t;
  window.TM_lang = function(){ return lang; };
  window.TM_BUILD = ARTIFACT_DATA;
  window.TM_recalcBuild = calcBuild;
  window.TM_exportProgress = exportProgress;
  window.TM_importProgress = importProgress;
  window.TM_resetProgress = resetProgress;
  window.TM_getProgress = getProgress;
  window.TM_toggleProgress = toggleProgress;

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

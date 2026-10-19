window.__ModuleLoader__.load({
  id: "dsh-left-layout",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    "use strict";
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    });
    var __importStar = (this && this.__importStar) || (function () {
        var ownKeys = function(o) {
            ownKeys = Object.getOwnPropertyNames || function (o) {
                var ar = [];
                for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
                return ar;
            };
            return ownKeys(o);
        };
        return function (mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
            __setModuleDefault(result, mod);
            return result;
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.inject = void 0;
    exports.apply = apply;
    const jsx_runtime_1 = require("react/jsx-runtime");
    const React = __importStar(require("react"));
    const react_dom_1 = require("react-dom");
    /** Client services this plugin needs. */
    exports.inject = ['slots', 'locale', 'layout', 'uiWorkspace', 'workspaces'];
    const NS = 'leftLayout';
    const zh = {
        'section.functions': '功能',
        'section.tasks': '任务',
        'section.workspaces': '工作区',
        newSession: '新会话',
        more: '更多',
        'more.title': '提到外面',
        'more.count': '更多（{count}）',
        'more.always': '常驻',
        'more.hint': '勾选后显示在功能栏',
        'more.empty': '暂无其他功能',
        'tasks.placeholder': '最近的无归属会话将显示在这里',
        'tasks.empty': '暂无无归属会话',
        'tasks.more': '查看更多（{count}）',
        'tasks.less': '收起',
        'workspaces.placeholder': '已注册的工作区将显示在这里',
        'workspaces.empty': '暂无工作区',
        'workspaces.add': '添加工作区',
        'workspaces.noSessions': '暂无会话',
    };
    const en = {
        'section.functions': 'Functions',
        'section.tasks': 'Tasks',
        'section.workspaces': 'Workspaces',
        newSession: 'New Session',
        more: 'More',
        'more.title': 'Show outside',
        'more.count': 'More ({count})',
        'more.always': 'Always',
        'more.hint': 'Checked functions appear in the function bar',
        'more.empty': 'No other functions',
        'tasks.placeholder': 'Recent ungrouped conversations will appear here',
        'tasks.empty': 'No ungrouped conversations',
        'tasks.more': 'Show more ({count})',
        'tasks.less': 'Show less',
        'workspaces.placeholder': 'Registered workspaces will appear here',
        'workspaces.empty': 'No workspaces',
        'workspaces.add': 'Add workspace',
        'workspaces.noSessions': 'No conversations',
    };
    const STYLES = `
    html[data-dsh-left-layout-active] [class*="newSession"],
    html[data-dsh-left-layout-active] [class*="panelList"] {
      display: none !important;
    }
    
    /* Windows keeps a native New Session control in the title bar while the
       sidebar is collapsed and the browsing region is unmounted. */
    html[data-windows-titlebar][data-dsh-left-layout-collapsed] [class*="newSession"] {
      display: flex !important;
    }
    
    .dshLL_root {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      color: var(--dsw-alias-label-primary);
      font-family: inherit;
    }
    
    .dshLL_top {
      flex: 0 1 auto;
      max-height: 46%;
      min-height: 0;
      overflow-y: auto;
      padding: 4px 8px 6px;
    }
    
    .dshLL_sectionLabel {
      padding: 6px 8px 4px;
      color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary, inherit));
      font-size: 11px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    
    .dshLL_functionList {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    
    .dshLL_row {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 9px;
      width: 100%;
      height: 34px;
      margin: 0;
      padding: 0 10px;
      border: 0;
      border-radius: var(--dsw-radius-md, 8px);
      background: transparent;
      color: inherit;
      font: inherit;
      font-size: 13px;
      line-height: 20px;
      text-align: left;
      cursor: pointer;
    }
    
    .dshLL_row:hover {
      background: var(--dsw-alias-interactive-bg-hover);
    }
    
    .dshLL_row[data-active="true"] {
      background: var(--dsw-specific-sidebar-nav-item-active, var(--dsw-alias-interactive-bg-hover));
    }
    
    .dshLL_rowIcon {
      flex: none;
      display: inline-flex;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      color: var(--dsw-alias-label-secondary, inherit);
    }
    
    .dshLL_rowLabel {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    
    .dshLL_middle {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: 2px 8px 4px;
    }
    
    .dshLL_sectionHeader {
      flex: none;
      display: flex;
      align-items: center;
      gap: 6px;
      height: 28px;
      padding: 0 8px;
    }
    
    .dshLL_sectionTitle {
      flex: none;
      color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary, inherit));
      font-size: 11px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    
    .dshLL_sectionCount {
      color: var(--dsw-alias-label-tertiary, inherit);
      font-size: 11px;
      line-height: 16px;
      opacity: 0.75;
    }
    
    .dshLL_scroll {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
    }
    
    .dshLL_placeholder {
      padding: 10px;
      color: var(--dsw-alias-label-tertiary, inherit);
      font-size: 12px;
      line-height: 18px;
    }
    
    .dshLL_bottom {
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      max-height: 44%;
      padding: 2px 8px 8px;
      border-top: 1px solid var(--dsw-alias-border-l1, transparent);
    }
    
    .dshLL_rail {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 4px 0;
    }
    
    .dshLL_railButton {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 0;
      border: 0;
      border-radius: var(--dsw-radius-md, 8px);
      background: transparent;
      color: var(--dsw-alias-label-primary);
      cursor: pointer;
    }
    
    .dshLL_railButton:hover {
      background: var(--dsw-alias-interactive-bg-hover);
    }
    
    .dshLL_railButton[data-active="true"] {
      background: var(--dsw-specific-sidebar-nav-item-active, var(--dsw-alias-interactive-bg-hover));
    }
    
    .dshLL_sectionAction {
      display: inline-flex;
      align-items: center;
      margin-left: auto;
    }
    
    .dshLL_sectionActionButton {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      padding: 0;
      border: 0;
      border-radius: var(--dsw-radius-sm, 6px);
      background: transparent;
      color: var(--dsw-alias-label-tertiary, inherit);
      cursor: pointer;
    }
    
    .dshLL_sectionActionButton:hover {
      background: var(--dsw-alias-interactive-bg-hover);
      color: var(--dsw-alias-label-primary, inherit);
    }
    
    .dshLL_wsGroup {
      display: flex;
      flex-direction: column;
    }
    
    .dshLL_wsRow {
      display: flex;
      align-items: center;
      gap: 0;
      border-radius: var(--dsw-radius-md, 8px);
    }
    
    .dshLL_wsRow:hover {
      background: var(--dsw-alias-interactive-bg-hover);
    }
    
    .dshLL_wsChevron {
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 32px;
      padding: 0;
      border: 0;
      border-radius: var(--dsw-radius-md, 8px);
      background: transparent;
      color: var(--dsw-alias-label-tertiary, inherit);
      cursor: pointer;
    }
    
    .dshLL_wsMain {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      align-items: center;
      gap: 8px;
      min-width: 0;
      height: 32px;
      padding: 0 8px 0 0;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    
    .dshLL_wsIcon {
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: var(--dsw-alias-label-secondary, inherit);
    }
    
    .dshLL_wsTitle {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      color: var(--dsw-alias-label-primary, inherit);
      font-size: 13px;
      line-height: 18px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    
    .dshLL_wsCount {
      flex: none;
      color: var(--dsw-alias-label-tertiary, inherit);
      font-size: 11px;
      line-height: 16px;
    }
    
    .dshLL_wsSessions {
      padding-left: 16px;
    }
    
    .dshLL_sessionRow {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 42px;
      margin: 0;
      padding: 5px 10px;
      border: 0;
      border-radius: var(--dsw-radius-md, 8px);
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    
    .dshLL_sessionRow:hover {
      background: var(--dsw-alias-interactive-bg-hover);
    }
    
    .dshLL_statusDot {
      flex: none;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--dsw-alias-label-tertiary, currentColor);
    }
    
    .dshLL_statusDot[data-state="running"] {
      background: var(--dsw-alias-state-success, #2fbf71);
    }
    
    .dshLL_statusDot[data-state="pending"] {
      background: var(--dsw-alias-state-warning, #e6a23c);
    }
    
    .dshLL_statusDot[data-state="unread"] {
      background: var(--dsw-alias-state-info, #6aa7ff);
    }
    
    .dshLL_sessionMain {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }
    
    .dshLL_sessionTitle {
      overflow: hidden;
      color: var(--dsw-alias-label-primary, inherit);
      font-size: 13px;
      line-height: 18px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    
    .dshLL_sessionMeta {
      color: var(--dsw-alias-label-tertiary, inherit);
      font-size: 11px;
      line-height: 16px;
    }
    
    .dshLL_moreLink {
      display: block;
      width: 100%;
      margin: 2px 0 0;
      padding: 7px 10px;
      border: 0;
      border-radius: var(--dsw-radius-md, 8px);
      background: transparent;
      color: var(--dsw-alias-label-tertiary, inherit);
      font: inherit;
      font-size: 12px;
      line-height: 18px;
      text-align: left;
      cursor: pointer;
    }
    
    .dshLL_moreLink:hover {
      background: var(--dsw-alias-interactive-bg-hover);
      color: var(--dsw-alias-label-primary, inherit);
    }
    
    .dshLL_moreBackdrop {
      position: fixed;
      inset: 0;
      z-index: 1200;
      background: transparent;
    }
    
    .dshLL_moreMenu {
      position: fixed;
      z-index: 1201;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      max-height: min(60vh, 480px);
      padding: 8px;
      border: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.22));
      border-radius: var(--dsw-radius-panel, 12px);
      background: var(--dsw-alias-bg-layer-2, #1f1f1f);
      box-shadow: var(--dsw-elevation-prominent, 0 12px 32px rgba(0, 0, 0, 0.32));
      color: var(--dsw-alias-label-primary, inherit);
      font-family: inherit;
      font-size: 13px;
      overflow: hidden;
    }
    
    .dshLL_menuTitle {
      flex: none;
      padding: 4px 8px 6px;
      color: var(--dsw-alias-label-tertiary, inherit);
      font-size: 11px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    
    .dshLL_menuList {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
    }
    
    .dshLL_menuRow {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 32px;
      padding: 4px 8px;
      border-radius: var(--dsw-radius-md, 8px);
      color: inherit;
      cursor: pointer;
    }
    
    .dshLL_menuRow:hover {
      background: var(--dsw-alias-interactive-bg-hover);
    }
    
    .dshLL_menuRow input {
      flex: none;
      width: 14px;
      height: 14px;
      margin: 0;
      accent-color: var(--dsw-alias-label-primary, currentColor);
    }
    
    .dshLL_menuRowLabel {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    
    .dshLL_menuRowIcon {
      flex: none;
      display: inline-flex;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      color: var(--dsw-alias-label-secondary, inherit);
    }
    
    .dshLL_menuFixed {
      cursor: default;
      opacity: 0.82;
    }
    
    .dshLL_menuFixed:hover {
      background: transparent;
    }
    
    .dshLL_menuCheck {
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      color: var(--dsw-alias-label-secondary, inherit);
      font-size: 12px;
      line-height: 14px;
    }
    
    .dshLL_menuTag {
      flex: none;
      padding: 0 6px;
      border-radius: 999px;
      background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.16));
      color: var(--dsw-alias-label-tertiary, inherit);
      font-size: 10px;
      line-height: 16px;
    }
    
    .dshLL_menuEmpty {
      padding: 8px;
      color: var(--dsw-alias-label-tertiary, inherit);
      font-size: 12px;
    }
    
    .dshLL_menuHint {
      flex: none;
      padding: 6px 8px 2px;
      color: var(--dsw-alias-label-tertiary, inherit);
      font-size: 11px;
      line-height: 16px;
    }
    `;
    /** New conversation glyph. */
    function IconNewChat({ size = 16 }) {
        return ((0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("path", { d: "M13.5 7.6a5.5 5.5 0 0 1-8.1 4.84L2.5 13.5l1.06-2.9A5.5 5.5 0 1 1 13.5 7.6Z", stroke: "currentColor", strokeWidth: "1.3", strokeLinejoin: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M8 5.4v4.2M5.9 7.5h4.2", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round" })] }));
    }
    /** More actions glyph. */
    function IconMore({ size = 16 }) {
        return ((0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "3", cy: "8", r: "1.25" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8", cy: "8", r: "1.25" }), (0, jsx_runtime_1.jsx)("circle", { cx: "13", cy: "8", r: "1.25" })] }));
    }
    /** Workspace folder glyph. */
    function IconWorkspace({ size = 16 }) {
        return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("path", { d: "M2.2 4.3c0-.5.4-.9.9-.9h3l1.2 1.2h5.6c.5 0 .9.4.9.9v6.2c0 .5-.4.9-.9.9H3.1a.9.9 0 0 1-.9-.9V4.3Z", stroke: "currentColor", strokeWidth: "1.2", strokeLinejoin: "round" }) }));
    }
    /** Plug glyph for plugin-backed global panels. */
    function IconPlug({ size = 16 }) {
        return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("path", { d: "M6 2.5v2M10 2.5v2M4 4.5h8v2a4 4 0 0 1-8 0v-2ZM8 10.5v3", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
    }
    /** Checklist glyph for task-like panels. */
    function IconChecklist({ size = 16 }) {
        return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("path", { d: "m2.6 4.4 1.2 1.2 2-2.2M2.6 9.4l1.2 1.2 2-2.2M8.2 4.6h5.2M8.2 9.6h5.2M8.2 12.4h3.4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
    }
    /** Clock glyph for schedule-like panels. */
    function IconClock({ size = 16 }) {
        return ((0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "8", cy: "8", r: "5.6", stroke: "currentColor", strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("path", { d: "M8 4.8V8l2.2 1.4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" })] }));
    }
    /** Plus glyph for the add-workspace action. */
    function IconPlus({ size = 14 }) {
        return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("path", { d: "M8 3v10M3 8h10", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) }));
    }
    /** Pick a stable glyph for a global panel id. */
    function PanelIcon({ id, size = 16 }) {
        const key = id.toLowerCase();
        if (key.includes('plugin'))
            return (0, jsx_runtime_1.jsx)(IconPlug, { size: size });
        if (key.includes('schedule') || key.includes('cron'))
            return (0, jsx_runtime_1.jsx)(IconClock, { size: size });
        if (key.includes('task') || key.includes('goal') || key.includes('workflow'))
            return (0, jsx_runtime_1.jsx)(IconChecklist, { size: size });
        return (0, jsx_runtime_1.jsx)(IconWorkspace, { size: size });
    }
    /** Render a full-width function row. */
    function FunctionRow(props) {
        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "dshLL_row", "data-active": props.active === true ? 'true' : undefined, onClick: props.onClick, children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_rowIcon", children: props.icon }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_rowLabel", children: props.label })] }));
    }
    /** Render a section heading with a count and an optional trailing action. */
    function SectionHeader(props) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_sectionHeader", children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_sectionTitle", children: props.title }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_sectionCount", children: props.count }), props.action === undefined ? null : (0, jsx_runtime_1.jsx)("span", { className: "dshLL_sectionAction", children: props.action })] }));
    }
    /** Read the global panel list into a stable snapshot source. */
    function createPanelSource(ctx) {
        let snapshot = [];
        const listeners = new Set();
        const read = () => {
            const rows = [];
            for (const entry of ctx.slots.entriesOfSlot('sidebar.panellist')) {
                const id = entry.options.id;
                if (id === undefined)
                    continue;
                const raw = entry.options.label;
                const label = typeof raw === 'function' ? raw() : raw;
                rows.push({ id, label: label ?? id, order: entry.options.order ?? 0 });
            }
            rows.sort((a, b) => a.order - b.order);
            return rows;
        };
        const same = (a, b) => {
            if (a.length !== b.length)
                return false;
            for (let index = 0; index < a.length; index += 1) {
                if (a[index].id !== b[index].id || a[index].label !== b[index].label || a[index].order !== b[index].order)
                    return false;
            }
            return true;
        };
        const refresh = () => {
            const next = read();
            if (same(snapshot, next))
                return;
            snapshot = next;
            for (const listener of listeners)
                listener();
        };
        const offSlots = ctx.slots.subscribe('sidebar.panellist', refresh);
        const offLocale = ctx.locale.subscribe(refresh);
        refresh();
        return {
            source: {
                getSnapshot: () => snapshot,
                subscribe: (listener) => {
                    listeners.add(listener);
                    return () => {
                        listeners.delete(listener);
                    };
                },
            },
            dispose: () => {
                offSlots();
                offLocale();
                listeners.clear();
            },
        };
    }
    const PROMOTED_KEY = 'dsh-left-layout:promoted:v1';
    /** Read the browser-local promotion list; malformed storage means no promotions. */
    function readPromoted() {
        try {
            const raw = window.localStorage.getItem(PROMOTED_KEY);
            if (raw === null)
                return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
        }
        catch {
            return [];
        }
    }
    /** Persist the promotion list; storage failures are non-fatal. */
    function writePromoted(ids) {
        try {
            window.localStorage.setItem(PROMOTED_KEY, JSON.stringify(ids));
        }
        catch {
            // Private browsing or a blocked storage partition: keep the in-memory state.
        }
    }
    /** Floating checkbox list that decides which functions sit in the bar. */
    function MoreMenu(props) {
        const { anchor, panels, promoted, onToggle, t } = props;
        return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_moreMenu", role: "dialog", "aria-label": t('more.title'), style: { top: anchor.top, left: anchor.left, width: anchor.width }, onPointerDown: (event) => event.stopPropagation(), children: [(0, jsx_runtime_1.jsx)("div", { className: "dshLL_menuTitle", children: t('more.title') }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_menuFixed dshLL_menuRow", children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuCheck", children: "\u2713" }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuRowIcon", children: (0, jsx_runtime_1.jsx)(IconNewChat, {}) }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuRowLabel", children: t('newSession') }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuTag", children: t('more.always') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_menuList", children: [panels.length === 0 ? (0, jsx_runtime_1.jsx)("div", { className: "dshLL_menuEmpty", children: t('more.empty') }) : null, panels.map((panel) => ((0, jsx_runtime_1.jsxs)("label", { className: "dshLL_menuRow", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: promoted.has(panel.id), onChange: (event) => onToggle(panel.id, event.currentTarget.checked) }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuRowIcon", children: (0, jsx_runtime_1.jsx)(PanelIcon, { id: panel.id }) }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuRowLabel", children: panel.label })] }, panel.id)))] }), (0, jsx_runtime_1.jsx)("div", { className: "dshLL_menuHint", children: t('more.hint') })] }), document.body);
    }
    /** Whether a Workspace is the product's automatic default Workspace. */
    function isDefaultWorkspace(workspace) {
        const path = workspace.path.replace(/\\/g, '/').toLowerCase();
        if (path.endsWith('/deepseek-harness/default-workspace'))
            return true;
        return workspace.title.trim().toLowerCase() === 'default-workspace';
    }
    /** Derive the ungrouped task digest: recent five, remainder, total. */
    function deriveTasks(sessions, workspaces) {
        const defaultWorkspace = workspaces.items.find(isDefaultWorkspace);
        const defaultIds = new Set(defaultWorkspace === undefined ? [] : defaultWorkspace.sessionIds.map(String));
        const assigned = new Set();
        for (const workspace of workspaces.items) {
            for (const id of workspace.sessionIds)
                assigned.add(String(id));
        }
        const archived = new Set(workspaces.archivedSessionIds.map(String));
        const rows = [];
        for (const id of sessions.ids) {
            const summary = sessions.byId[id];
            if (summary === undefined)
                continue;
            const key = String(id);
            if (archived.has(key))
                continue;
            if (assigned.has(key) && !defaultIds.has(key))
                continue;
            if (summary.origin === 'subagent' || summary.blank)
                continue;
            rows.push({ id: key, displayTitle: summary.displayTitle, updatedAt: summary.updatedAt });
        }
        rows.sort((left, right) => right.updatedAt - left.updatedAt);
        const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const visible = rows.filter((row) => row.updatedAt >= cutoff).slice(0, 5);
        const visibleIds = new Set(visible.map((row) => row.id));
        const rest = rows.filter((row) => !visibleIds.has(row.id));
        return { total: rows.length, visible, rest };
    }
    const RELATIVE_TIME = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto', style: 'short' });
    const CALENDAR_DATE = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });
    /** Human-facing update timestamp: relative for the recent month, calendar beyond. */
    function formatUpdatedAt(value) {
        if (!Number.isFinite(value) || value <= 0)
            return '';
        const diff = value - Date.now();
        const size = Math.abs(diff);
        if (size < 60000)
            return RELATIVE_TIME.format(0, 'second');
        if (size < 3600000)
            return RELATIVE_TIME.format(Math.round(diff / 60000), 'minute');
        if (size < 86400000)
            return RELATIVE_TIME.format(Math.round(diff / 3600000), 'hour');
        if (size < 30 * 86400000)
            return RELATIVE_TIME.format(Math.round(diff / 86400000), 'day');
        return CALENDAR_DATE.format(value);
    }
    /** One ungrouped conversation row. */
    function TaskRowView(props) {
        const { row, status, onOpen } = props;
        const dot = status?.pendingInteraction !== undefined && status?.pendingInteraction !== null
            ? 'pending'
            : status?.running === true
                ? 'running'
                : status?.completionUnread === true
                    ? 'unread'
                    : 'idle';
        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "dshLL_sessionRow", title: row.displayTitle, onClick: () => onOpen(row.id), children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_statusDot", "data-state": dot, "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("span", { className: "dshLL_sessionMain", children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_sessionTitle", children: row.displayTitle }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_sessionMeta", children: formatUpdatedAt(row.updatedAt) })] })] }));
    }
    /** Disclosure chevron for a workspace group. */
    function IconChevron({ open, size = 14 }) {
        return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", style: { transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 120ms ease' }, children: (0, jsx_runtime_1.jsx)("path", { d: "m6 3.8 4.2 4.2L6 12.2", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" }) }));
    }
    /** Select the visible Sessions accounted to one Workspace. */
    function deriveWorkspaceSessions(workspace, sessions, archived) {
        const rows = [];
        for (const id of workspace.sessionIds) {
            const summary = sessions.byId[id];
            if (summary === undefined)
                continue;
            const key = String(id);
            if (archived.has(key) || summary.origin === 'subagent' || summary.blank)
                continue;
            rows.push({ id: key, displayTitle: summary.displayTitle, updatedAt: summary.updatedAt });
        }
        rows.sort((left, right) => right.updatedAt - left.updatedAt);
        return rows;
    }
    /** One workspace row, expanding to its conversations. */
    function WorkspaceGroup(props) {
        const { workspace, rows, statusOf, openWorkspace, openSession, t } = props;
        const [expanded, setExpanded] = React.useState(false);
        return ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_wsGroup", children: [(0, jsx_runtime_1.jsxs)("div", { className: "dshLL_wsRow", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_wsChevron", "aria-expanded": expanded, "aria-label": t('section.workspaces'), onClick: () => setExpanded((value) => !value), children: (0, jsx_runtime_1.jsx)(IconChevron, { open: expanded }) }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "dshLL_wsMain", title: workspace.path, onClick: () => openWorkspace(String(workspace.workspaceId)), children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_wsIcon", children: (0, jsx_runtime_1.jsx)(IconWorkspace, { size: 14 }) }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_wsTitle", children: workspace.title }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_wsCount", children: rows.length })] })] }), expanded ? ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_wsSessions", children: rows.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_placeholder", children: t('workspaces.noSessions') })) : (rows.map((row) => ((0, jsx_runtime_1.jsx)(TaskRowView, { row: row, status: statusOf(row.id), onOpen: openSession }, row.id)))) })) : null] }));
    }
    /** The top function bar: New Session plus promoted functions plus More. */
    function FunctionBar(props) {
        const { wide, panels, activePanelId, selectPanel, startSession, t } = props;
        const [promoted, setPromoted] = React.useState(readPromoted);
        const promotedSet = React.useMemo(() => new Set(promoted), [promoted]);
        const visible = panels.filter((panel) => promotedSet.has(panel.id));
        const hiddenCount = panels.length - visible.length;
        const moreLabel = hiddenCount > 0 ? t('more.count', { count: hiddenCount }) : t('more');
        const [open, setOpen] = React.useState(false);
        const [anchor, setAnchor] = React.useState(null);
        const moreRef = React.useRef(null);
        const openMenu = () => {
            const rect = moreRef.current?.getBoundingClientRect();
            const width = Math.max(220, Math.min(300, window.innerWidth - 16));
            const left = rect === undefined ? 8 : Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
            const top = rect === undefined ? 48 : Math.min(rect.bottom + 4, window.innerHeight - 80);
            setAnchor({ top, left, width });
            setOpen(true);
        };
        const toggle = (id, on) => {
            setPromoted((current) => {
                const next = on
                    ? (current.includes(id) ? current : [...current, id])
                    : current.filter((item) => item !== id);
                writePromoted(next);
                return next;
            });
        };
        React.useEffect(() => {
            if (!open)
                return;
            const onKeyDown = (event) => {
                if (event.key === 'Escape')
                    setOpen(false);
            };
            const onResize = () => setOpen(false);
            const onPointerDown = (event) => {
                const target = event.target;
                if (target !== null && target.closest('.dshLL_moreMenu') !== null)
                    return;
                if (target !== null && moreRef.current !== null && moreRef.current.contains(target))
                    return;
                setOpen(false);
            };
            document.addEventListener('keydown', onKeyDown);
            document.addEventListener('pointerdown', onPointerDown, true);
            window.addEventListener('resize', onResize);
            return () => {
                document.removeEventListener('keydown', onKeyDown);
                document.removeEventListener('pointerdown', onPointerDown, true);
                window.removeEventListener('resize', onResize);
            };
        }, [open]);
        const moreButton = ((0, jsx_runtime_1.jsxs)("button", { ref: moreRef, type: "button", className: wide ? 'dshLL_row' : 'dshLL_railButton', "aria-label": moreLabel, title: wide ? undefined : moreLabel, "aria-expanded": open, "data-active": open ? 'true' : undefined, onClick: () => {
                if (open)
                    setOpen(false);
                else
                    openMenu();
            }, children: [(0, jsx_runtime_1.jsx)("span", { className: wide ? 'dshLL_rowIcon' : undefined, children: (0, jsx_runtime_1.jsx)(IconMore, { size: wide ? 16 : 18 }) }), wide ? (0, jsx_runtime_1.jsx)("span", { className: "dshLL_rowLabel", children: moreLabel }) : null] }));
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [wide ? ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_top", children: [(0, jsx_runtime_1.jsx)("div", { className: "dshLL_sectionLabel", children: t('section.functions') }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_functionList", children: [(0, jsx_runtime_1.jsx)(FunctionRow, { icon: (0, jsx_runtime_1.jsx)(IconNewChat, {}), label: t('newSession'), onClick: startSession }), visible.map((panel) => ((0, jsx_runtime_1.jsx)(FunctionRow, { icon: (0, jsx_runtime_1.jsx)(PanelIcon, { id: panel.id }), label: panel.label, active: activePanelId === panel.id, onClick: () => selectPanel(panel.id) }, panel.id))), moreButton] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_rail", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_railButton", "aria-label": t('newSession'), title: t('newSession'), onClick: startSession, children: (0, jsx_runtime_1.jsx)(IconNewChat, { size: 18 }) }), visible.map((panel) => ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_railButton", "aria-label": panel.label, title: panel.label, "data-active": activePanelId === panel.id ? 'true' : undefined, onClick: () => selectPanel(panel.id), children: (0, jsx_runtime_1.jsx)(PanelIcon, { id: panel.id, size: 18 }) }, panel.id))), moreButton] })), open && anchor !== null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "dshLL_moreBackdrop", onPointerDown: () => setOpen(false) }), (0, jsx_runtime_1.jsx)(MoreMenu, { anchor: anchor, panels: panels, promoted: promotedSet, onToggle: toggle, t: t })] })) : null] }));
    }
    /** The three-section sidebar browsing region. */
    function LeftLayoutRegion(props) {
        const { wide, panels, selectPanel, startSession, openSession, openWorkspace, addWorkspace, useSessions, useWorkspaces, useSessionStatus, usePanelInfo, t, } = props;
        const panelRows = React.useSyncExternalStore(panels.subscribe, panels.getSnapshot, panels.getSnapshot);
        const sessions = useSessions((state) => state);
        const workspaces = useWorkspaces((state) => state);
        const sessionStatus = useSessionStatus((state) => state);
        const activePanelId = usePanelInfo((info) => info.activePanelId);
        const [tasksExpanded, setTasksExpanded] = React.useState(false);
        const tasks = React.useMemo(() => deriveTasks(sessions, workspaces), [sessions, workspaces]);
        const taskRows = tasksExpanded ? [...tasks.visible, ...tasks.rest] : tasks.visible;
        const archivedSessions = React.useMemo(() => new Set(workspaces.archivedSessionIds.map(String)), [workspaces.archivedSessionIds]);
        const namedWorkspaces = React.useMemo(() => workspaces.items.filter((workspace) => !isDefaultWorkspace(workspace)), [workspaces.items]);
        const statusOf = (id) => sessionStatus.get(id);
        React.useLayoutEffect(() => {
            document.documentElement.setAttribute('data-dsh-left-layout-active', '');
            return () => {
                document.documentElement.removeAttribute('data-dsh-left-layout-active');
            };
        }, []);
        React.useLayoutEffect(() => {
            const root = document.documentElement;
            if (wide)
                root.removeAttribute('data-dsh-left-layout-collapsed');
            else
                root.setAttribute('data-dsh-left-layout-collapsed', '');
            return () => {
                root.removeAttribute('data-dsh-left-layout-collapsed');
            };
        }, [wide]);
        return ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_root", children: [(0, jsx_runtime_1.jsx)(FunctionBar, { wide: wide, panels: panelRows, activePanelId: activePanelId, selectPanel: selectPanel, startSession: startSession, t: t }), wide ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "dshLL_middle", children: [(0, jsx_runtime_1.jsx)(SectionHeader, { title: t('section.tasks'), count: tasks.total }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_scroll", children: [taskRows.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_placeholder", children: t('tasks.empty') })) : (taskRows.map((row) => ((0, jsx_runtime_1.jsx)(TaskRowView, { row: row, status: sessionStatus.get(row.id), onOpen: openSession }, row.id)))), tasks.rest.length > 0 ? ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_moreLink", "aria-expanded": tasksExpanded, onClick: () => setTasksExpanded((value) => !value), children: tasksExpanded ? t('tasks.less') : t('tasks.more', { count: tasks.rest.length }) })) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_bottom", children: [(0, jsx_runtime_1.jsx)(SectionHeader, { title: t('section.workspaces'), count: namedWorkspaces.length, action: ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_sectionActionButton", "aria-label": t('workspaces.add'), title: t('workspaces.add'), onClick: addWorkspace, children: (0, jsx_runtime_1.jsx)(IconPlus, {}) })) }), (0, jsx_runtime_1.jsx)("div", { className: "dshLL_scroll", children: namedWorkspaces.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_placeholder", children: t('workspaces.empty') })) : (namedWorkspaces.map((workspace) => ((0, jsx_runtime_1.jsx)(WorkspaceGroup, { workspace: workspace, rows: deriveWorkspaceSessions(workspace, sessions, archivedSessions), statusOf: statusOf, openWorkspace: openWorkspace, openSession: openSession, t: t }, String(workspace.workspaceId))))) })] })] })) : null] }));
    }
    /** Register the three-section browsing region and its supporting services. */
    function apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-left-layout: dictionaries');
        ctx.effect(() => {
            const style = document.createElement('style');
            style.setAttribute('data-dsh-left-layout-style', '');
            style.textContent = STYLES;
            document.head.appendChild(style);
            return () => {
                style.remove();
            };
        }, 'dsh-left-layout: styles');
        const panelSource = createPanelSource(ctx);
        ctx.effect(() => () => panelSource.dispose(), 'dsh-left-layout: panel source');
        ctx.slots.inject('sidebar.workspaces', () => ctx.slots.register({
            name: 'sidebar.workspaces',
            priority: -1000,
            locale: NS,
            inject: () => ({
                panels: panelSource.source,
                selectPanel: (id) => {
                    ctx.layout.selectPanel(id);
                },
                startSession: () => {
                    ctx.uiWorkspace.startSession();
                },
                openSession: (id) => {
                    ctx.uiWorkspace.openSession(id);
                },
                openWorkspace: (id) => {
                    void ctx.uiWorkspace.openWorkspace(id);
                },
                addWorkspace: () => {
                    void (async () => {
                        try {
                            const path = await ctx.uiWorkspace.pickDirectory();
                            if (path === null)
                                return;
                            const created = await ctx.workspaces.create({ path });
                            void ctx.uiWorkspace.openWorkspace(created.workspaceId);
                        }
                        catch (error) {
                            console.warn('[dsh-left-layout] add workspace failed', error);
                        }
                    })();
                },
            }),
        }, LeftLayoutRegion));
    }
        return module.exports;
  }
});

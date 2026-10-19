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
    /** Client services this plugin needs. */
    exports.inject = ['slots', 'locale', 'layout', 'uiWorkspace', 'workspaces'];
    const NS = 'leftLayout';
    const zh = {
        'section.functions': '功能',
        'section.tasks': '任务',
        'section.workspaces': '工作区',
        newSession: '新会话',
        more: '更多',
        'tasks.placeholder': '最近的无归属会话将显示在这里',
        'workspaces.placeholder': '已注册的工作区将显示在这里',
    };
    const en = {
        'section.functions': 'Functions',
        'section.tasks': 'Tasks',
        'section.workspaces': 'Workspaces',
        newSession: 'New Session',
        more: 'More',
        'tasks.placeholder': 'Recent ungrouped conversations will appear here',
        'workspaces.placeholder': 'Registered workspaces will appear here',
    };
    const STYLES = `
    html[data-dsh-left-layout-active] [class*="newSession"],
    html[data-dsh-left-layout-active] [class*="panelList"] {
      display: none !important;
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
      flex: none;
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
    /** Render a full-width function row. */
    function FunctionRow(props) {
        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "dshLL_row", "data-active": props.active === true ? 'true' : undefined, onClick: props.onClick, children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_rowIcon", children: props.icon }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_rowLabel", children: props.label })] }));
    }
    /** Render a section heading with an optional count. */
    function SectionHeader(props) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_sectionHeader", children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_sectionTitle", children: props.title }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_sectionCount", children: props.count })] }));
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
    /** The three-section sidebar browsing region. */
    function LeftLayoutRegion(props) {
        const { wide, panels, selectPanel, startSession, useSessions, useWorkspaces, usePanelInfo, t, } = props;
        const panelRows = React.useSyncExternalStore(panels.subscribe, panels.getSnapshot, panels.getSnapshot);
        const sessions = useSessions((state) => state);
        const workspaces = useWorkspaces((state) => state);
        const activePanelId = usePanelInfo((info) => info.activePanelId);
        React.useLayoutEffect(() => {
            document.documentElement.setAttribute('data-dsh-left-layout-active', '');
            return () => {
                document.documentElement.removeAttribute('data-dsh-left-layout-active');
            };
        }, []);
        if (!wide) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_root", children: (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_rail", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_railButton", "aria-label": t('newSession'), title: t('newSession'), onClick: startSession, children: (0, jsx_runtime_1.jsx)(IconNewChat, { size: 18 }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_railButton", "aria-label": t('more'), title: t('more'), children: (0, jsx_runtime_1.jsx)(IconMore, { size: 18 }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_railButton", "aria-label": t('section.workspaces'), title: t('section.workspaces'), children: (0, jsx_runtime_1.jsx)(IconWorkspace, { size: 18 }) })] }) }));
        }
        return ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_root", children: [(0, jsx_runtime_1.jsxs)("div", { className: "dshLL_top", children: [(0, jsx_runtime_1.jsx)("div", { className: "dshLL_sectionLabel", children: t('section.functions') }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_functionList", children: [(0, jsx_runtime_1.jsx)(FunctionRow, { icon: (0, jsx_runtime_1.jsx)(IconNewChat, {}), label: t('newSession'), onClick: startSession }), panelRows.map((panel) => ((0, jsx_runtime_1.jsx)(FunctionRow, { icon: (0, jsx_runtime_1.jsx)(IconWorkspace, {}), label: panel.label, active: activePanelId === panel.id, onClick: () => selectPanel(panel.id) }, panel.id))), (0, jsx_runtime_1.jsx)(FunctionRow, { icon: (0, jsx_runtime_1.jsx)(IconMore, {}), label: t('more'), onClick: () => undefined })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_middle", children: [(0, jsx_runtime_1.jsx)(SectionHeader, { title: t('section.tasks'), count: sessions.ids.length }), (0, jsx_runtime_1.jsx)("div", { className: "dshLL_scroll", children: (0, jsx_runtime_1.jsx)("div", { className: "dshLL_placeholder", children: t('tasks.placeholder') }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_bottom", children: [(0, jsx_runtime_1.jsx)(SectionHeader, { title: t('section.workspaces'), count: workspaces.items.length }), (0, jsx_runtime_1.jsx)("div", { className: "dshLL_scroll", children: (0, jsx_runtime_1.jsx)("div", { className: "dshLL_placeholder", children: t('workspaces.placeholder') }) })] })] }));
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
            }),
        }, LeftLayoutRegion));
    }
        return module.exports;
  }
});

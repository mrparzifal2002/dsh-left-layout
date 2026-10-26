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
    exports.inject = ['slots', 'locale', 'layout', 'uiWorkspace', 'workspaces', 'remote', 'remote.session'];
    const NS = 'leftLayout';
    const zh = {
        'section.functions': '功能',
        'section.tasks': '任务',
        'section.workspaces': '工作区',
        newSession: '新会话',
        more: '更多',
        'more.title': '提到外面',
        'more.promote': '提到外面',
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
        'actions.more': '更多操作',
        'actions.openFolder': '打开本地文件夹',
        'actions.rename': '重命名',
        'actions.deleteWorkspace': '删除该工作区',
        'actions.pin': '置顶',
        'actions.unpin': '取消置顶',
        'actions.archive': '归档',
        'actions.deleteTask': '删除任务',
        'actions.newConversation': '在此工作区新建对话',
        'dialog.renameWorkspace': '重命名工作区',
        'dialog.renameSession': '重命名对话',
        'dialog.deleteWorkspace': '删除该工作区？',
        'dialog.deleteWorkspaceMessage': '只删除工作区登记，不删除目录和会话日志。',
        'dialog.deleteTask': '删除任务？',
        'dialog.deleteTaskMessage': '该对话将从任务区隐藏，不会删除会话日志。',
        'dialog.archive': '归档任务？',
        'dialog.archiveMessage': '归档后将从任务区移除；若仍在运行，会先停止其工作。',
        'dialog.cancel': '取消',
        'dialog.save': '保存',
        'dialog.delete': '删除',
        'dialog.confirmArchive': '归档',
        'dialog.processing': '处理中…',
        'dialog.empty': '名称不能为空',
        'dialog.failed': '操作失败',
    };
    const en = {
        'section.functions': 'Functions',
        'section.tasks': 'Tasks',
        'section.workspaces': 'Workspaces',
        newSession: 'New Session',
        more: 'More',
        'more.title': 'Show outside',
        'more.promote': 'Show outside',
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
        'actions.more': 'More actions',
        'actions.openFolder': 'Open local folder',
        'actions.rename': 'Rename',
        'actions.deleteWorkspace': 'Delete this workspace',
        'actions.pin': 'Pin to top',
        'actions.unpin': 'Unpin',
        'actions.archive': 'Archive',
        'actions.deleteTask': 'Delete task',
        'actions.newConversation': 'New conversation in this workspace',
        'dialog.renameWorkspace': 'Rename workspace',
        'dialog.renameSession': 'Rename conversation',
        'dialog.deleteWorkspace': 'Delete this workspace?',
        'dialog.deleteWorkspaceMessage': 'Only the workspace registration is removed; the directory and session logs stay.',
        'dialog.deleteTask': 'Delete task?',
        'dialog.deleteTaskMessage': 'The conversation is hidden from the task area; its session log is not deleted.',
        'dialog.archive': 'Archive task?',
        'dialog.archiveMessage': 'The task leaves the task area; running work is stopped first.',
        'dialog.cancel': 'Cancel',
        'dialog.save': 'Save',
        'dialog.delete': 'Delete',
        'dialog.confirmArchive': 'Archive',
        'dialog.processing': 'Working…',
        'dialog.empty': 'Name cannot be empty',
        'dialog.failed': 'Operation failed',
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
      color: var(--dsw-alias-label-secondary, inherit);
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: 0.02em;
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
      color: var(--dsw-alias-label-secondary, inherit);
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: 0.02em;
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
      position: relative;
      display: flex;
      align-items: center;
      gap: 2px;
      width: 100%;
      min-height: 42px;
      margin: 0;
      padding: 2px 6px 2px 10px;
      border-radius: var(--dsw-radius-md, 8px);
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
    }
    
    .dshLL_sessionRow:hover {
      background: var(--dsw-alias-interactive-bg-hover);
    }
    
    .dshLL_sessionMainButton {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      align-items: center;
      gap: 8px;
      min-width: 0;
      min-height: 38px;
      margin: 0;
      padding: 3px 0;
      border: 0;
      border-radius: var(--dsw-radius-sm, 6px);
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
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
    
    .dshLL_rowActions {
      flex: none;
      display: flex;
      align-items: center;
      gap: 2px;
      opacity: 0;
      transition: opacity 100ms ease;
    }
    
    .dshLL_sessionRow:hover .dshLL_rowActions,
    .dshLL_sessionRow:focus-within .dshLL_rowActions,
    .dshLL_sessionRow[data-menu-open="true"] .dshLL_rowActions,
    .dshLL_wsRow:hover .dshLL_rowActions,
    .dshLL_wsRow:focus-within .dshLL_rowActions,
    .dshLL_wsRow[data-menu-open="true"] .dshLL_rowActions {
      opacity: 1;
    }
    
    .dshLL_rowAction {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: 0;
      border-radius: var(--dsw-radius-sm, 6px);
      background: transparent;
      color: var(--dsw-alias-label-secondary, inherit);
      cursor: pointer;
    }
    
    .dshLL_rowAction:hover {
      background: var(--dsw-alias-interactive-bg-hover);
      color: var(--dsw-alias-label-primary, inherit);
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
    
    .dshLL_actionBackdrop {
      position: fixed;
      inset: 0;
      z-index: 1300;
      background: transparent;
    }
    
    .dshLL_actionMenu {
      position: fixed;
      z-index: 1301;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      min-width: 180px;
      padding: 5px;
      border: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.22));
      border-radius: var(--dsw-radius-panel, 12px);
      background: var(--dsw-alias-bg-layer-2, #1f1f1f);
      box-shadow: var(--dsw-elevation-prominent, 0 12px 32px rgba(0, 0, 0, 0.32));
      color: var(--dsw-alias-label-primary, inherit);
      font-family: inherit;
      font-size: 13px;
      overflow: hidden;
    }
    
    .dshLL_actionItem {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 32px;
      margin: 0;
      padding: 5px 10px;
      border: 0;
      border-radius: var(--dsw-radius-sm, 6px);
      background: transparent;
      color: inherit;
      font: inherit;
      font-size: 13px;
      line-height: 20px;
      text-align: left;
      cursor: pointer;
    }
    
    .dshLL_actionItem:hover {
      background: var(--dsw-alias-interactive-bg-hover);
    }
    
    .dshLL_actionDanger {
      color: var(--dsw-alias-state-error, #e5484d);
    }
    
    .dshLL_actionDanger:hover {
      background: color-mix(in srgb, var(--dsw-alias-state-error, #e5484d) 12%, transparent);
    }
    
    .dshLL_actionSeparator {
      height: 1px;
      margin: 4px 6px;
      background: var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.22));
    }
    
    .dshLL_dialogBackdrop {
      position: fixed;
      inset: 0;
      z-index: 1400;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      background: rgba(0, 0, 0, 0.38);
    }
    
    .dshLL_dialog {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: min(380px, calc(100vw - 32px));
      padding: 18px;
      border: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.22));
      border-radius: var(--dsw-radius-panel, 12px);
      background: var(--dsw-alias-bg-layer-2, #1f1f1f);
      box-shadow: var(--dsw-elevation-prominent, 0 16px 40px rgba(0, 0, 0, 0.4));
      color: var(--dsw-alias-label-primary, inherit);
      font-family: inherit;
    }
    
    .dshLL_dialogTitle {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      line-height: 22px;
    }
    
    .dshLL_dialogMessage {
      margin: 0;
      color: var(--dsw-alias-label-secondary, inherit);
      font-size: 13px;
      line-height: 20px;
    }
    
    .dshLL_dialogInput {
      box-sizing: border-box;
      width: 100%;
      height: 34px;
      padding: 6px 10px;
      border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.32));
      border-radius: var(--dsw-radius-sm, 6px);
      background: var(--dsw-alias-bg-layer-1, transparent);
      color: inherit;
      font: inherit;
      font-size: 13px;
    }
    
    .dshLL_dialogInput:focus {
      outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary, #6aa7ff));
      outline-offset: -1px;
    }
    
    .dshLL_dialogError {
      color: var(--dsw-alias-state-error, #e5484d);
      font-size: 12px;
      line-height: 18px;
    }
    
    .dshLL_dialogActions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    
    .dshLL_dialogButton {
      box-sizing: border-box;
      min-width: 64px;
      height: 32px;
      padding: 0 12px;
      border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.32));
      border-radius: var(--dsw-radius-sm, 6px);
      background: transparent;
      color: inherit;
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    
    .dshLL_dialogButton:hover {
      background: var(--dsw-alias-interactive-bg-hover);
    }
    
    .dshLL_dialogButton:disabled {
      opacity: 0.55;
      cursor: default;
    }
    
    .dshLL_dialogPrimary {
      border-color: transparent;
      background: var(--dsw-alias-button-primary-fill, var(--dsw-specific-sidebar-nav-item-active, #4d6bfe));
      color: var(--dsw-alias-label-primary-inverted, #fff);
    }
    
    .dshLL_dialogPrimary:hover {
      background: var(--dsw-alias-button-primary-hover, var(--dsw-specific-sidebar-nav-item-active, #3f59d8));
    }
    
    .dshLL_dialogDanger {
      border-color: transparent;
      background: var(--dsw-alias-state-error, #e5484d);
      color: #fff;
    }
    
    .dshLL_dialogDanger:hover {
      background: color-mix(in srgb, var(--dsw-alias-state-error, #e5484d) 85%, #000);
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
    
    .dshLL_menuRowButton {
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    
    .dshLL_menuRowButton:hover {
      background: var(--dsw-alias-interactive-bg-hover);
    }
    
    .dshLL_menuRowOpen {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      align-items: center;
      gap: 8px;
      min-width: 0;
      height: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    
    .dshLL_menuRowOpen:focus-visible {
      outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary, #6aa7ff));
      outline-offset: 2px;
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
    /** Container glyph for docker-backed global panels. */
    function IconDocker({ size = 16 }) {
        return ((0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("rect", { x: "3.2", y: "9.6", width: "4.4", height: "4.4", rx: "1", fill: "currentColor", opacity: "0.5" }), (0, jsx_runtime_1.jsx)("rect", { x: "8.8", y: "9.6", width: "4.4", height: "4.4", rx: "1", fill: "currentColor", opacity: "0.7" }), (0, jsx_runtime_1.jsx)("rect", { x: "14.4", y: "9.6", width: "4.4", height: "4.4", rx: "1", fill: "currentColor", opacity: "0.5" }), (0, jsx_runtime_1.jsx)("rect", { x: "8.8", y: "4", width: "4.4", height: "4.4", rx: "1", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("rect", { x: "5.6", y: "15.2", width: "12.8", height: "4.4", rx: "2.2", fill: "currentColor", opacity: "0.35" })] }));
    }
    /** Plus glyph for the add-workspace action. */
    function IconPlus({ size = 14 }) {
        return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("path", { d: "M8 3v10M3 8h10", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) }));
    }
    /** Pick a stable glyph for a global panel id. */
    function PanelIcon({ id, size = 16 }) {
        const key = id.toLowerCase();
        if (key.includes('docker'))
            return (0, jsx_runtime_1.jsx)(IconDocker, { size: size });
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
        const { anchor, panels, promoted, onToggle, onOpen, onStartSession, onClose, t } = props;
        return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_moreMenu", role: "dialog", "aria-label": t('more.title'), style: { top: anchor.top, left: anchor.left, width: anchor.width }, onPointerDown: (event) => event.stopPropagation(), children: [(0, jsx_runtime_1.jsx)("div", { className: "dshLL_menuTitle", children: t('more.title') }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "dshLL_menuFixed dshLL_menuRow dshLL_menuRowButton", onClick: () => {
                        onClose();
                        onStartSession();
                    }, children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuCheck", children: "\u2713" }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuRowIcon", children: (0, jsx_runtime_1.jsx)(IconNewChat, {}) }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuRowLabel", children: t('newSession') }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuTag", children: t('more.always') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_menuList", children: [panels.length === 0 ? (0, jsx_runtime_1.jsx)("div", { className: "dshLL_menuEmpty", children: t('more.empty') }) : null, panels.map((panel) => ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_menuRow", onClick: (event) => {
                                const target = event.target;
                                if (target.closest('input') !== null)
                                    return;
                                if (target.closest('button') !== null)
                                    return;
                                onClose();
                                onOpen(panel.id);
                            }, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: promoted.has(panel.id), "aria-label": t('more.promote'), onChange: (event) => onToggle(panel.id, event.currentTarget.checked) }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "dshLL_menuRowOpen", onClick: () => {
                                        onClose();
                                        onOpen(panel.id);
                                    }, children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuRowIcon", children: (0, jsx_runtime_1.jsx)(PanelIcon, { id: panel.id }) }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_menuRowLabel", children: panel.label })] })] }, panel.id)))] }), (0, jsx_runtime_1.jsx)("div", { className: "dshLL_menuHint", children: t('more.hint') })] }), document.body);
    }
    /** Position a menu near its trigger, flipping upward when the viewport is short. */
    function menuAnchor(rect, itemCount, width = 190) {
        const height = itemCount * 32 + 12;
        const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8));
        let top = rect.bottom + 4;
        if (top + height > window.innerHeight - 8)
            top = Math.max(8, rect.top - height - 4);
        return { top, left, width };
    }
    /** Floating vertical action list used by task and workspace rows. */
    function ActionMenu(props) {
        const { anchor, items, onClose } = props;
        React.useEffect(() => {
            const onKeyDown = (event) => {
                if (event.key === 'Escape')
                    onClose();
            };
            const onPointerDown = (event) => {
                const target = event.target;
                if (target !== null && target.closest('.dshLL_actionMenu') !== null)
                    return;
                onClose();
            };
            const onResize = () => onClose();
            document.addEventListener('keydown', onKeyDown);
            document.addEventListener('pointerdown', onPointerDown, true);
            window.addEventListener('resize', onResize);
            return () => {
                document.removeEventListener('keydown', onKeyDown);
                document.removeEventListener('pointerdown', onPointerDown, true);
                window.removeEventListener('resize', onResize);
            };
        }, [onClose]);
        return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "dshLL_actionBackdrop", onPointerDown: onClose }), (0, jsx_runtime_1.jsx)("div", { className: "dshLL_actionMenu", role: "menu", style: { top: anchor.top, left: anchor.left, width: anchor.width }, onPointerDown: (event) => event.stopPropagation(), children: items.map((item, index) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [index > 0 && (item.danger === true || item.id === 'delete-workspace' || item.id === 'delete-task' || item.id === 'archive') ? ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_actionSeparator" })) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", role: "menuitem", className: 'dshLL_actionItem' + (item.danger === true ? ' dshLL_actionDanger' : ''), onClick: () => {
                                    onClose();
                                    item.onSelect();
                                }, children: item.label })] }, item.id))) })] }), document.body);
    }
    /** Rename dialog shared by workspace and conversation rows. */
    function RenameDialog(props) {
        const { title, initial, onCancel, onSubmit, t } = props;
        const [value, setValue] = React.useState(initial);
        const [busy, setBusy] = React.useState(false);
        const [error, setError] = React.useState(null);
        const inputRef = React.useRef(null);
        React.useEffect(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, []);
        const submit = async () => {
            const next = value.trim();
            if (next === '') {
                setError(t('dialog.empty'));
                return;
            }
            setBusy(true);
            setError(null);
            try {
                await onSubmit(next);
            }
            catch (failure) {
                setError(failure instanceof Error && failure.message !== '' ? failure.message : t('dialog.failed'));
                setBusy(false);
            }
        };
        return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { className: "dshLL_dialogBackdrop", onPointerDown: (event) => {
                if (event.target === event.currentTarget && !busy)
                    onCancel();
            }, children: (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_dialog", role: "dialog", "aria-modal": "true", "aria-label": title, onPointerDown: (event) => event.stopPropagation(), children: [(0, jsx_runtime_1.jsx)("h2", { className: "dshLL_dialogTitle", children: title }), (0, jsx_runtime_1.jsx)("input", { ref: inputRef, className: "dshLL_dialogInput", value: value, disabled: busy, onChange: (event) => setValue(event.currentTarget.value), onKeyDown: (event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                void submit();
                            }
                            else if (event.key === 'Escape' && !busy) {
                                onCancel();
                            }
                        } }), error === null ? null : (0, jsx_runtime_1.jsx)("div", { className: "dshLL_dialogError", children: error }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_dialogActions", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_dialogButton", disabled: busy, onClick: onCancel, children: t('dialog.cancel') }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_dialogButton dshLL_dialogPrimary", disabled: busy, onClick: () => void submit(), children: busy ? t('dialog.processing') : t('dialog.save') })] })] }) }), document.body);
    }
    /** Confirmation dialog for archive and destructive row actions. */
    function ConfirmDialog(props) {
        const { title, message, confirmLabel, danger, onCancel, onConfirm, t } = props;
        const [busy, setBusy] = React.useState(false);
        const [error, setError] = React.useState(null);
        React.useEffect(() => {
            const onKeyDown = (event) => {
                if (event.key === 'Escape' && !busy)
                    onCancel();
            };
            document.addEventListener('keydown', onKeyDown);
            return () => document.removeEventListener('keydown', onKeyDown);
        }, [busy, onCancel]);
        const confirm = async () => {
            setBusy(true);
            setError(null);
            try {
                await onConfirm();
            }
            catch (failure) {
                setError(failure instanceof Error && failure.message !== '' ? failure.message : t('dialog.failed'));
                setBusy(false);
            }
        };
        return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { className: "dshLL_dialogBackdrop", onPointerDown: (event) => {
                if (event.target === event.currentTarget && !busy)
                    onCancel();
            }, children: (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_dialog", role: "dialog", "aria-modal": "true", "aria-label": title, onPointerDown: (event) => event.stopPropagation(), children: [(0, jsx_runtime_1.jsx)("h2", { className: "dshLL_dialogTitle", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "dshLL_dialogMessage", children: message }), error === null ? null : (0, jsx_runtime_1.jsx)("div", { className: "dshLL_dialogError", children: error }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_dialogActions", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_dialogButton", disabled: busy, onClick: onCancel, children: t('dialog.cancel') }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: 'dshLL_dialogButton ' + (danger === true ? 'dshLL_dialogDanger' : 'dshLL_dialogPrimary'), disabled: busy, onClick: () => void confirm(), children: busy ? t('dialog.processing') : confirmLabel })] })] }) }), document.body);
    }
    /** Whether a Workspace is the product's automatic default Workspace. */
    function isDefaultWorkspace(workspace) {
        const path = workspace.path.replace(/\\/g, '/').toLowerCase();
        if (path.endsWith('/deepseek-harness/default-workspace'))
            return true;
        return workspace.title.trim().toLowerCase() === 'default-workspace';
    }
    /** Derive the ungrouped task digest: recent five, remainder, total. */
    function deriveTasks(sessions, workspaces, hidden) {
        const items = workspaces.items ?? [];
        const archivedIds = workspaces.archivedSessionIds ?? [];
        const pinnedIds = workspaces.pinnedSessionIds ?? [];
        const defaultWorkspace = items.find(isDefaultWorkspace);
        const defaultIds = new Set(defaultWorkspace === undefined ? [] : (defaultWorkspace.sessionIds ?? []).map(String));
        const assigned = new Set();
        for (const workspace of items) {
            for (const id of workspace.sessionIds ?? [])
                assigned.add(String(id));
        }
        const archived = new Set(archivedIds.map(String));
        const pinIndex = new Map(pinnedIds.map((id, index) => [String(id), index]));
        const rows = [];
        for (const id of sessions.ids ?? []) {
            const summary = sessions.byId?.[id];
            if (summary === undefined)
                continue;
            const key = String(id);
            if (archived.has(key) || hidden.has(key))
                continue;
            if (assigned.has(key) && !defaultIds.has(key))
                continue;
            if (summary.origin === 'subagent' || summary.blank)
                continue;
            rows.push({
                id: key,
                displayTitle: summary.displayTitle,
                updatedAt: summary.updatedAt,
                cwd: summary.cwd ?? defaultWorkspace?.path,
                pinned: pinIndex.has(key),
            });
        }
        rows.sort((left, right) => {
            const leftPin = pinIndex.get(left.id);
            const rightPin = pinIndex.get(right.id);
            if (leftPin !== undefined || rightPin !== undefined) {
                if (leftPin === undefined)
                    return 1;
                if (rightPin === undefined)
                    return -1;
                return leftPin - rightPin;
            }
            return right.updatedAt - left.updatedAt;
        });
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
    /** One conversation row used by both the task area and workspace groups. */
    function TaskRowView(props) {
        const { row, status, actions, context, onOpen, onHide, t } = props;
        const [anchor, setAnchor] = React.useState(null);
        const [renameOpen, setRenameOpen] = React.useState(false);
        const [confirm, setConfirm] = React.useState(null);
        const dot = status?.pendingInteraction !== undefined && status?.pendingInteraction !== null
            ? 'pending'
            : status?.running === true
                ? 'running'
                : status?.completionUnread === true
                    ? 'unread'
                    : 'idle';
        const items = [
            {
                id: 'pin',
                label: row.pinned ? t('actions.unpin') : t('actions.pin'),
                onSelect: () => {
                    if (row.pinned)
                        actions.unpinSession(row.id);
                    else
                        actions.pinSession(row.id);
                },
            },
            {
                id: 'rename',
                label: t('actions.rename'),
                onSelect: () => setRenameOpen(true),
            },
            ...(row.cwd === undefined ? [] : [{
                    id: 'open-folder',
                    label: t('actions.openFolder'),
                    onSelect: () => actions.openPath(row.cwd),
                }]),
            {
                id: 'archive',
                label: t('actions.archive'),
                onSelect: () => setConfirm('archive'),
            },
            ...(context === 'task' && onHide !== undefined ? [{
                    id: 'delete-task',
                    label: t('actions.deleteTask'),
                    danger: true,
                    onSelect: () => setConfirm('hide'),
                }] : []),
        ];
        return ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_sessionRow", "data-menu-open": anchor === null ? undefined : 'true', children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: "dshLL_sessionMainButton", title: row.displayTitle, onClick: () => onOpen(row.id), children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_statusDot", "data-state": dot, "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("span", { className: "dshLL_sessionMain", children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_sessionTitle", children: row.displayTitle }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_sessionMeta", children: formatUpdatedAt(row.updatedAt) })] })] }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_rowActions", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_rowAction", "aria-label": t('actions.more'), title: t('actions.more'), onClick: (event) => {
                            event.stopPropagation();
                            setAnchor(menuAnchor(event.currentTarget.getBoundingClientRect(), items.length));
                        }, children: (0, jsx_runtime_1.jsx)(IconMore, { size: 14 }) }) }), anchor === null ? null : ((0, jsx_runtime_1.jsx)(ActionMenu, { anchor: anchor, items: items, onClose: () => setAnchor(null) })), renameOpen ? ((0, jsx_runtime_1.jsx)(RenameDialog, { title: t('dialog.renameSession'), initial: row.displayTitle, t: t, onCancel: () => setRenameOpen(false), onSubmit: async (value) => {
                        await actions.renameSession(row.id, value);
                        setRenameOpen(false);
                    } })) : null, confirm === 'archive' ? ((0, jsx_runtime_1.jsx)(ConfirmDialog, { title: t('dialog.archive'), message: t('dialog.archiveMessage'), confirmLabel: t('dialog.confirmArchive'), t: t, onCancel: () => setConfirm(null), onConfirm: async () => {
                        await actions.archiveSession(row.id, true);
                        setConfirm(null);
                    } })) : null, confirm === 'hide' ? ((0, jsx_runtime_1.jsx)(ConfirmDialog, { title: t('dialog.deleteTask'), message: t('dialog.deleteTaskMessage'), confirmLabel: t('dialog.delete'), danger: true, t: t, onCancel: () => setConfirm(null), onConfirm: () => {
                        onHide?.(row.id);
                        setConfirm(null);
                    } })) : null] }));
    }
    /** Disclosure chevron for a workspace group. */
    function IconChevron({ open, size = 14 }) {
        return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", style: { transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 120ms ease' }, children: (0, jsx_runtime_1.jsx)("path", { d: "m6 3.8 4.2 4.2L6 12.2", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" }) }));
    }
    /** Select the visible Sessions accounted to one Workspace. */
    function deriveWorkspaceSessions(workspace, sessions, archived, pinnedSessionIds, hidden) {
        const pinIndex = new Map((pinnedSessionIds ?? []).map((id, index) => [String(id), index]));
        const rows = [];
        for (const id of workspace.sessionIds ?? []) {
            const summary = sessions.byId?.[id];
            if (summary === undefined)
                continue;
            const key = String(id);
            if (archived.has(key) || hidden.has(key) || summary.origin === 'subagent' || summary.blank)
                continue;
            rows.push({
                id: key,
                displayTitle: summary.displayTitle,
                updatedAt: summary.updatedAt,
                cwd: summary.cwd ?? workspace.path,
                pinned: pinIndex.has(key),
            });
        }
        rows.sort((left, right) => {
            const leftPin = pinIndex.get(left.id);
            const rightPin = pinIndex.get(right.id);
            if (leftPin !== undefined || rightPin !== undefined) {
                if (leftPin === undefined)
                    return 1;
                if (rightPin === undefined)
                    return -1;
                return leftPin - rightPin;
            }
            return right.updatedAt - left.updatedAt;
        });
        return rows;
    }
    /** One workspace row, expanding to its conversations. */
    function WorkspaceGroup(props) {
        const { workspace, rows, statusOf, actions, openSession, t } = props;
        const workspaceId = String(workspace.workspaceId);
        const [expanded, setExpanded] = React.useState(false);
        const [anchor, setAnchor] = React.useState(null);
        const [renameOpen, setRenameOpen] = React.useState(false);
        const [deleteOpen, setDeleteOpen] = React.useState(false);
        const items = [
            {
                id: 'open-folder',
                label: t('actions.openFolder'),
                onSelect: () => actions.openPath(workspace.path),
            },
            {
                id: 'rename',
                label: t('actions.rename'),
                onSelect: () => setRenameOpen(true),
            },
            {
                id: 'delete-workspace',
                label: t('actions.deleteWorkspace'),
                danger: true,
                onSelect: () => setDeleteOpen(true),
            },
        ];
        return ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_wsGroup", children: [(0, jsx_runtime_1.jsxs)("div", { className: "dshLL_wsRow", "data-menu-open": anchor === null ? undefined : 'true', children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_wsChevron", "aria-expanded": expanded, "aria-label": t('section.workspaces'), onClick: () => setExpanded((value) => !value), children: (0, jsx_runtime_1.jsx)(IconChevron, { open: expanded }) }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "dshLL_wsMain", title: workspace.path, "aria-expanded": expanded, onClick: () => setExpanded((value) => !value), children: [(0, jsx_runtime_1.jsx)("span", { className: "dshLL_wsIcon", children: (0, jsx_runtime_1.jsx)(IconWorkspace, { size: 14 }) }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_wsTitle", children: workspace.title }), (0, jsx_runtime_1.jsx)("span", { className: "dshLL_wsCount", children: rows.length })] }), (0, jsx_runtime_1.jsxs)("span", { className: "dshLL_rowActions", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_rowAction", "aria-label": t('actions.more'), title: t('actions.more'), onClick: (event) => {
                                        event.stopPropagation();
                                        setAnchor(menuAnchor(event.currentTarget.getBoundingClientRect(), items.length));
                                    }, children: (0, jsx_runtime_1.jsx)(IconMore, { size: 14 }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_rowAction", "aria-label": t('actions.newConversation'), title: t('actions.newConversation'), onClick: (event) => {
                                        event.stopPropagation();
                                        actions.openWorkspace(workspaceId);
                                    }, children: (0, jsx_runtime_1.jsx)(IconNewChat, { size: 14 }) })] })] }), expanded ? ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_wsSessions", children: rows.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_placeholder", children: t('workspaces.noSessions') })) : (rows.map((row) => ((0, jsx_runtime_1.jsx)(TaskRowView, { row: row, status: statusOf(row.id), actions: actions, context: "workspace", onOpen: openSession, t: t }, row.id)))) })) : null, anchor === null ? null : ((0, jsx_runtime_1.jsx)(ActionMenu, { anchor: anchor, items: items, onClose: () => setAnchor(null) })), renameOpen ? ((0, jsx_runtime_1.jsx)(RenameDialog, { title: t('dialog.renameWorkspace'), initial: workspace.title, t: t, onCancel: () => setRenameOpen(false), onSubmit: async (value) => {
                        await actions.renameWorkspace(workspaceId, value);
                        setRenameOpen(false);
                    } })) : null, deleteOpen ? ((0, jsx_runtime_1.jsx)(ConfirmDialog, { title: t('dialog.deleteWorkspace'), message: t('dialog.deleteWorkspaceMessage'), confirmLabel: t('dialog.delete'), danger: true, t: t, onCancel: () => setDeleteOpen(false), onConfirm: async () => {
                        await actions.deleteWorkspace(workspaceId);
                        setDeleteOpen(false);
                    } })) : null] }));
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
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [wide ? ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_top", children: [(0, jsx_runtime_1.jsx)("div", { className: "dshLL_sectionLabel", children: t('section.functions') }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_functionList", children: [(0, jsx_runtime_1.jsx)(FunctionRow, { icon: (0, jsx_runtime_1.jsx)(IconNewChat, {}), label: t('newSession'), onClick: startSession }), visible.map((panel) => ((0, jsx_runtime_1.jsx)(FunctionRow, { icon: (0, jsx_runtime_1.jsx)(PanelIcon, { id: panel.id }), label: panel.label, active: activePanelId === panel.id, onClick: () => selectPanel(panel.id) }, panel.id))), moreButton] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_rail", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_railButton", "aria-label": t('newSession'), title: t('newSession'), onClick: startSession, children: (0, jsx_runtime_1.jsx)(IconNewChat, { size: 18 }) }), visible.map((panel) => ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_railButton", "aria-label": panel.label, title: panel.label, "data-active": activePanelId === panel.id ? 'true' : undefined, onClick: () => selectPanel(panel.id), children: (0, jsx_runtime_1.jsx)(PanelIcon, { id: panel.id, size: 18 }) }, panel.id))), moreButton] })), open && anchor !== null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "dshLL_moreBackdrop", onPointerDown: () => setOpen(false) }), (0, jsx_runtime_1.jsx)(MoreMenu, { anchor: anchor, panels: panels, promoted: promotedSet, onToggle: toggle, onOpen: selectPanel, onStartSession: startSession, onClose: () => setOpen(false), t: t })] })) : null] }));
    }
    const HIDDEN_TASKS_KEY = 'dsh-left-layout:hidden-tasks:v1';
    /** Read locally hidden task ids; malformed storage means nothing is hidden. */
    function readHiddenTasks() {
        try {
            const raw = window.localStorage.getItem(HIDDEN_TASKS_KEY);
            if (raw === null)
                return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
        }
        catch {
            return [];
        }
    }
    /** Persist the locally hidden task ids; storage failures are non-fatal. */
    function writeHiddenTasks(ids) {
        try {
            window.localStorage.setItem(HIDDEN_TASKS_KEY, JSON.stringify(ids));
        }
        catch {
            // Keep the in-memory state when storage is unavailable.
        }
    }
    /** The three-section sidebar browsing region. */
    function LeftLayoutRegion(props) {
        const { wide, panels, selectPanel, startSession, openSession, addWorkspace, useSessions, useWorkspaces, useSessionStatus, usePanelInfo, t, } = props;
        const panelRows = React.useSyncExternalStore(panels.subscribe, panels.getSnapshot, panels.getSnapshot);
        const sessions = useSessions((state) => state);
        const workspaces = useWorkspaces((state) => state);
        const sessionStatus = useSessionStatus((state) => state);
        const activePanelId = usePanelInfo((info) => info.activePanelId);
        const [tasksExpanded, setTasksExpanded] = React.useState(false);
        const [hiddenTasks, setHiddenTasks] = React.useState(readHiddenTasks);
        const hiddenSet = React.useMemo(() => new Set(hiddenTasks), [hiddenTasks]);
        const hideTask = (id) => {
            setHiddenTasks((current) => {
                if (current.includes(id))
                    return current;
                const next = [...current, id];
                writeHiddenTasks(next);
                return next;
            });
        };
        const tasks = React.useMemo(() => deriveTasks(sessions, workspaces, hiddenSet), [sessions, workspaces, hiddenSet]);
        const taskRows = tasksExpanded ? [...tasks.visible, ...tasks.rest] : tasks.visible;
        const workspaceItems = workspaces.items ?? [];
        const pinnedSessionIds = workspaces.pinnedSessionIds ?? [];
        const archivedSessions = React.useMemo(() => new Set((workspaces.archivedSessionIds ?? []).map(String)), [workspaces.archivedSessionIds]);
        const namedWorkspaces = React.useMemo(() => workspaceItems.filter((workspace) => !isDefaultWorkspace(workspace)), [workspaceItems]);
        const statusOf = (id) => sessionStatus.get(id);
        React.useLayoutEffect(() => {
            document.documentElement.setAttribute('data-dsh-left-layout-active', '');
            return () => {
                document.documentElement.removeAttribute('data-dsh-left-layout-active');
            };
        }, []);
        React.useEffect(() => {
            // The native New Session control stays visible in the Windows collapsed
            // title bar; route it through the same default-workspace action.
            const onNewSessionClick = (event) => {
                const target = event.target;
                if (!(target instanceof Element))
                    return;
                if (target.closest('[class*="newSession"]') === null)
                    return;
                event.preventDefault();
                event.stopPropagation();
                startSession();
            };
            document.addEventListener('click', onNewSessionClick, true);
            return () => document.removeEventListener('click', onNewSessionClick, true);
        }, [startSession]);
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
        return ((0, jsx_runtime_1.jsxs)("div", { className: "dshLL_root", children: [(0, jsx_runtime_1.jsx)(FunctionBar, { wide: wide, panels: panelRows, activePanelId: activePanelId, selectPanel: selectPanel, startSession: startSession, t: t }), wide ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "dshLL_middle", children: [(0, jsx_runtime_1.jsx)(SectionHeader, { title: t('section.tasks'), count: tasks.total }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_scroll", children: [taskRows.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_placeholder", children: t('tasks.empty') })) : (taskRows.map((row) => ((0, jsx_runtime_1.jsx)(TaskRowView, { row: row, status: sessionStatus.get(row.id), actions: props, context: "task", onOpen: openSession, onHide: hideTask, t: t }, row.id)))), tasks.rest.length > 0 ? ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_moreLink", "aria-expanded": tasksExpanded, onClick: () => setTasksExpanded((value) => !value), children: tasksExpanded ? t('tasks.less') : t('tasks.more', { count: tasks.rest.length }) })) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "dshLL_bottom", children: [(0, jsx_runtime_1.jsx)(SectionHeader, { title: t('section.workspaces'), count: namedWorkspaces.length, action: ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "dshLL_sectionActionButton", "aria-label": t('workspaces.add'), title: t('workspaces.add'), onClick: addWorkspace, children: (0, jsx_runtime_1.jsx)(IconPlus, {}) })) }), (0, jsx_runtime_1.jsx)("div", { className: "dshLL_scroll", children: namedWorkspaces.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "dshLL_placeholder", children: t('workspaces.empty') })) : (namedWorkspaces.map((workspace) => ((0, jsx_runtime_1.jsx)(WorkspaceGroup, { workspace: workspace, rows: deriveWorkspaceSessions(workspace, sessions, archivedSessions, pinnedSessionIds, hiddenSet), statusOf: statusOf, actions: props, openSession: openSession, t: t }, String(workspace.workspaceId))))) })] })] })) : null] }));
    }
    /** Register the three-section browsing region and its supporting services. */
    function apply(ctx) {
        ctx.effect(() => {
            try {
                return ctx.locale.register(NS, { zh, en });
            }
            catch (error) {
                console.warn('[dsh-left-layout] locale registration failed', error);
                return () => { };
            }
        }, 'dsh-left-layout: dictionaries');
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
                    try {
                        const snapshot = ctx.workspaces.list.getSnapshot();
                        const defaultWorkspace = snapshot.items.find(isDefaultWorkspace);
                        if (defaultWorkspace === undefined)
                            ctx.uiWorkspace.startSession();
                        else
                            ctx.uiWorkspace.startSession(defaultWorkspace.workspaceId);
                    }
                    catch (error) {
                        console.warn('[dsh-left-layout] default workspace lookup failed', error);
                        ctx.uiWorkspace.startSession();
                    }
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
                pinSession: (id) => {
                    void ctx.uiWorkspace.pinSession(id).catch((error) => {
                        console.warn('[dsh-left-layout] pin failed', error);
                    });
                },
                unpinSession: (id) => {
                    void ctx.uiWorkspace.unpinSession(id).catch((error) => {
                        console.warn('[dsh-left-layout] unpin failed', error);
                    });
                },
                archiveSession: async (id, stopActivity) => {
                    await ctx.uiWorkspace.archiveSession(id, stopActivity ? { stopActivity: true } : undefined);
                },
                renameSession: async (id, title) => {
                    const sessions = ctx.get('sessions', false);
                    if (sessions === undefined)
                        throw new Error('session service is unavailable');
                    await sessions.using(id, { source: 'workspaceOperation' }, async (reference) => {
                        const result = await reference.binding.session.rename(title);
                        if (!result.ok)
                            throw new Error(result.error.message);
                    });
                },
                renameWorkspace: async (id, title) => {
                    await ctx.workspaces.rename(id, title);
                },
                deleteWorkspace: async (id) => {
                    await ctx.workspaces.delete(id);
                },
                openPath: (path) => {
                    if (path === '')
                        return;
                    void (async () => {
                        try {
                            const remote = ctx.remote;
                            const result = await remote.session.openWorkspacePath({ path });
                            if (!result.ok) {
                                console.warn('[dsh-left-layout] open path failed', result.error);
                            }
                        }
                        catch (error) {
                            console.warn('[dsh-left-layout] open path failed', error);
                        }
                    })();
                },
            }),
        }, LeftLayoutRegion));
    }
        return module.exports;
  }
});

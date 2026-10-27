import * as React from 'react'
import { createPortal } from 'react-dom'
import type { Context } from '@deepseek-ai/cordis'
import type { SessionListState } from '@deepseek-ai/dsh-api-session-controller/client'
import type { WorkspaceSnapshot, WorkspaceView } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-workspace/client'

/** Client services this plugin needs. */
export const inject = ['slots', 'locale', 'layout', 'uiWorkspace', 'workspaces', 'remote', 'remote.session']

const NS = 'leftLayout'

type LayoutT = (key: LeftLayoutKey, params?: Record<string, unknown>) => string

type LeftLayoutKey =
  | 'section.functions'
  | 'skills.open'
  | 'section.tasks'
  | 'section.workspaces'
  | 'newSession'
  | 'more'
  | 'more.title'
  | 'more.promote'
  | 'more.count'
  | 'more.always'
  | 'more.hint'
  | 'more.empty'
  | 'tasks.placeholder'
  | 'tasks.empty'
  | 'tasks.more'
  | 'tasks.less'
  | 'workspaces.placeholder'
  | 'workspaces.empty'
  | 'workspaces.add'
  | 'workspaces.noSessions'
  | 'actions.more'
  | 'actions.openFolder'
  | 'actions.rename'
  | 'actions.deleteWorkspace'
  | 'actions.pin'
  | 'actions.unpin'
  | 'actions.archive'
  | 'actions.deleteTask'
  | 'actions.newConversation'
  | 'dialog.renameWorkspace'
  | 'dialog.renameSession'
  | 'dialog.deleteWorkspace'
  | 'dialog.deleteWorkspaceMessage'
  | 'dialog.deleteTask'
  | 'dialog.deleteTaskMessage'
  | 'dialog.archive'
  | 'dialog.archiveMessage'
  | 'dialog.cancel'
  | 'dialog.save'
  | 'dialog.delete'
  | 'dialog.confirmArchive'
  | 'dialog.processing'
  | 'dialog.empty'
  | 'dialog.failed'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    leftLayout: LeftLayoutKey
  }
}

const zh: Record<LeftLayoutKey, string> = {
  'section.functions': '功能',
  'skills.open': '技能',
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
}

const en: Record<LeftLayoutKey, string> = {
  'section.functions': 'Functions',
  'skills.open': 'Skills',
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
}

/** One global function entry read from the sidebar panel list. */
interface PanelItem {
  id: string
  label: string
  order: number
}

/** Registrant face delivered to the layout component. */
interface LeftLayoutInjected {
  panels: {
    getSnapshot(): readonly PanelItem[]
    subscribe(listener: () => void): () => void
  }
  selectPanel(id: string): void
  startSession(): void
  openSkills(): void
  openSession(id: string): void
  openWorkspace(id: string): void
  addWorkspace(): void
  pinSession(id: string): void
  unpinSession(id: string): void
  archiveSession(id: string, stopActivity: boolean): Promise<void>
  renameSession(id: string, title: string): Promise<void>
  renameWorkspace(id: string, title: string): Promise<void>
  deleteWorkspace(id: string): Promise<void>
  openPath(path: string): void
}

type LeftLayoutProps = PropsRuntime<'sidebar.workspaces'>
  & PropsLocale<typeof NS>
  & InjectFace<LeftLayoutInjected>

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

/* Drag-to-reorder affordance for promoted functions, in both bar shapes. */
.dshLL_row[draggable="true"],
.dshLL_railButton[draggable="true"] {
  cursor: grab;
  -webkit-user-select: none;
  user-select: none;
}

.dshLL_row[draggable="true"]:active,
.dshLL_railButton[draggable="true"]:active {
  cursor: grabbing;
}

.dshLL_row[data-dragging="true"],
.dshLL_railButton[data-dragging="true"] {
  opacity: 0.4;
}

.dshLL_row[data-drop="before"],
.dshLL_railButton[data-drop="before"] {
  box-shadow: inset 0 2px 0 0 var(--dsw-alias-state-business-primary, #6aa7ff);
}

.dshLL_row[data-drop="after"],
.dshLL_railButton[data-drop="after"] {
  box-shadow: inset 0 -2px 0 0 var(--dsw-alias-state-business-primary, #6aa7ff);
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
`

/** New conversation glyph. */
function IconNewChat({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.5 7.6a5.5 5.5 0 0 1-8.1 4.84L2.5 13.5l1.06-2.9A5.5 5.5 0 1 1 13.5 7.6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 5.4v4.2M5.9 7.5h4.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

/** More actions glyph. */
function IconMore({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="3" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="13" cy="8" r="1.25" />
    </svg>
  )
}

/** Workspace folder glyph. */
function IconWorkspace({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.2 4.3c0-.5.4-.9.9-.9h3l1.2 1.2h5.6c.5 0 .9.4.9.9v6.2c0 .5-.4.9-.9.9H3.1a.9.9 0 0 1-.9-.9V4.3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

/** Plug glyph for plugin-backed global panels. */
function IconPlug({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 2.5v2M10 2.5v2M4 4.5h8v2a4 4 0 0 1-8 0v-2ZM8 10.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Checklist glyph for task-like panels. */
function IconChecklist({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m2.6 4.4 1.2 1.2 2-2.2M2.6 9.4l1.2 1.2 2-2.2M8.2 4.6h5.2M8.2 9.6h5.2M8.2 12.4h3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Clock glyph for schedule-like panels. */
function IconClock({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 4.8V8l2.2 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Container glyph for docker-backed global panels. */
function IconDocker({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.2" y="9.6" width="4.4" height="4.4" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="8.8" y="9.6" width="4.4" height="4.4" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="14.4" y="9.6" width="4.4" height="4.4" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="8.8" y="4" width="4.4" height="4.4" rx="1" fill="currentColor" />
      <rect x="5.6" y="15.2" width="12.8" height="4.4" rx="2.2" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

/** Spark glyph for the skills manager entry. */
function IconSkill({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.6l1.55 3.26 3.55.52-2.57 2.5.61 3.54L8 9.75 4.86 11.42l.61-3.54L2.9 5.38l3.55-.52L8 1.6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

/** Plus glyph for the add-workspace action. */
function IconPlus({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/** Pick a stable glyph for a global panel id. */
function PanelIcon({ id, size = 16 }: { id: string; size?: number }): React.ReactElement {
  const key = id.toLowerCase()
  if (key.includes('docker')) return <IconDocker size={size} />
  if (key.includes('plugin')) return <IconPlug size={size} />
  if (key.includes('schedule') || key.includes('cron')) return <IconClock size={size} />
  if (key.includes('task') || key.includes('goal') || key.includes('workflow')) return <IconChecklist size={size} />
  return <IconWorkspace size={size} />
}

/** Which side of the hovered row a dragged function would land on. */
type DropEdge = 'before' | 'after'

/**
 * Insert `draggedId` on the requested side of `targetId`. Returns the input
 * array unchanged when the move is meaningless, so callers can skip a write.
 */
function moveInList(
  ids: readonly string[],
  draggedId: string,
  targetId: string,
  edge: DropEdge,
): readonly string[] {
  if (draggedId === targetId) return ids
  const from = ids.indexOf(draggedId)
  if (from < 0) return ids
  const next = [...ids]
  next.splice(from, 1)
  const anchor = next.indexOf(targetId)
  if (anchor < 0) return ids
  next.splice(edge === 'after' ? anchor + 1 : anchor, 0, draggedId)
  return next
}

/** Drag wiring handed to one reorderable function button. */
interface DragHandle {
  dragging: boolean
  edge: DropEdge | null
  onDragStart(event: React.DragEvent<HTMLElement>): void
  onDragOver(event: React.DragEvent<HTMLElement>): void
  onDragLeave(event: React.DragEvent<HTMLElement>): void
  onDrop(event: React.DragEvent<HTMLElement>): void
  onDragEnd(event: React.DragEvent<HTMLElement>): void
}

/** Render a full-width function row. */
function FunctionRow(props: {
  icon: React.ReactNode
  label: string
  active?: boolean
  drag?: DragHandle
  onClick(): void
}): React.ReactElement {
  const drag = props.drag
  return (
    <button
      type="button"
      className="dshLL_row"
      data-active={props.active === true ? 'true' : undefined}
      draggable={drag === undefined ? undefined : true}
      data-dragging={drag !== undefined && drag.dragging ? 'true' : undefined}
      data-drop={drag?.edge ?? undefined}
      onDragStart={drag?.onDragStart}
      onDragOver={drag?.onDragOver}
      onDragLeave={drag?.onDragLeave}
      onDrop={drag?.onDrop}
      onDragEnd={drag?.onDragEnd}
      onClick={props.onClick}
    >
      <span className="dshLL_rowIcon">{props.icon}</span>
      <span className="dshLL_rowLabel">{props.label}</span>
    </button>
  )
}

/** Render a section heading with a count and an optional trailing action. */
function SectionHeader(props: { title: string; count: number; action?: React.ReactNode }): React.ReactElement {
  return (
    <div className="dshLL_sectionHeader">
      <span className="dshLL_sectionTitle">{props.title}</span>
      <span className="dshLL_sectionCount">{props.count}</span>
      {props.action === undefined ? null : <span className="dshLL_sectionAction">{props.action}</span>}
    </div>
  )
}

/** Read the global panel list into a stable snapshot source. */
function createPanelSource(ctx: Context): {
  source: LeftLayoutInjected['panels']
  dispose(): void
} {
  let snapshot: readonly PanelItem[] = []
  const listeners = new Set<() => void>()

  const read = (): PanelItem[] => {
    const rows: PanelItem[] = []
    for (const entry of ctx.slots.entriesOfSlot('sidebar.panellist')) {
      const id = entry.options.id
      if (id === undefined) continue
      const raw = entry.options.label
      const label = typeof raw === 'function' ? raw() : raw
      rows.push({ id, label: label ?? id, order: entry.options.order ?? 0 })
    }
    rows.sort((a, b) => a.order - b.order)
    return rows
  }

  const same = (a: readonly PanelItem[], b: readonly PanelItem[]): boolean => {
    if (a.length !== b.length) return false
    for (let index = 0; index < a.length; index += 1) {
      if (a[index].id !== b[index].id || a[index].label !== b[index].label || a[index].order !== b[index].order) return false
    }
    return true
  }

  const refresh = (): void => {
    const next = read()
    if (same(snapshot, next)) return
    snapshot = next
    for (const listener of listeners) listener()
  }

  const offSlots = ctx.slots.subscribe('sidebar.panellist', refresh)
  const offLocale = ctx.locale.subscribe(refresh)
  refresh()

  return {
    source: {
      getSnapshot: () => snapshot,
      subscribe: (listener) => {
        listeners.add(listener)
        return () => {
          listeners.delete(listener)
        }
      },
    },
    dispose: () => {
      offSlots()
      offLocale()
      listeners.clear()
    },
  }
}

const PROMOTED_KEY = 'dsh-left-layout:promoted:v1'

/**
 * Read the browser-local promotion list. The array doubles as the display
 * order of the function bar, so duplicates are collapsed on read; malformed
 * storage means no promotions.
 */
function readPromoted(): string[] {
  try {
    const raw = window.localStorage.getItem(PROMOTED_KEY)
    if (raw === null) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const ids: string[] = []
    for (const item of parsed) {
      if (typeof item === 'string' && !ids.includes(item)) ids.push(item)
    }
    return ids
  } catch {
    return []
  }
}

/** Persist the promotion list; storage failures are non-fatal. */
function writePromoted(ids: readonly string[]): void {
  try {
    window.localStorage.setItem(PROMOTED_KEY, JSON.stringify(ids))
  } catch {
    // Private browsing or a blocked storage partition: keep the in-memory state.
  }
}

/** Floating checkbox list that decides which functions sit in the bar. */
function MoreMenu(props: {
  anchor: { top: number; left: number; width: number }
  panels: readonly PanelItem[]
  promoted: ReadonlySet<string>
  onToggle(id: string, on: boolean): void
  onOpen(id: string): void
  onStartSession(): void
  onClose(): void
  t: LayoutT
}): React.ReactElement {
  const { anchor, panels, promoted, onToggle, onOpen, onStartSession, onClose, t } = props
  return createPortal(
    <div
      className="dshLL_moreMenu"
      role="dialog"
      aria-label={t('more.title')}
      style={{ top: anchor.top, left: anchor.left, width: anchor.width }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="dshLL_menuTitle">{t('more.title')}</div>
      <button
        type="button"
        className="dshLL_menuFixed dshLL_menuRow dshLL_menuRowButton"
        onClick={() => {
          onClose()
          onStartSession()
        }}
      >
        <span className="dshLL_menuCheck">✓</span>
        <span className="dshLL_menuRowIcon"><IconNewChat /></span>
        <span className="dshLL_menuRowLabel">{t('newSession')}</span>
        <span className="dshLL_menuTag">{t('more.always')}</span>
      </button>
      <div className="dshLL_menuList">
        {panels.length === 0 ? <div className="dshLL_menuEmpty">{t('more.empty')}</div> : null}
        {panels.map((panel) => (
          <div
            key={panel.id}
            className="dshLL_menuRow"
            onClick={(event) => {
              const target = event.target as Element
              if (target.closest('input') !== null) return
              if (target.closest('button') !== null) return
              onClose()
              onOpen(panel.id)
            }}
          >
            <input
              type="checkbox"
              checked={promoted.has(panel.id)}
              aria-label={t('more.promote')}
              onChange={(event) => onToggle(panel.id, event.currentTarget.checked)}
            />
            <button
              type="button"
              className="dshLL_menuRowOpen"
              onClick={() => {
                onClose()
                onOpen(panel.id)
              }}
            >
              <span className="dshLL_menuRowIcon"><PanelIcon id={panel.id} /></span>
              <span className="dshLL_menuRowLabel">{panel.label}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="dshLL_menuHint">{t('more.hint')}</div>
    </div>,
    document.body,
  )
}

/** One entry in a row action menu. */
interface ActionMenuItem {
  id: string
  label: string
  danger?: boolean
  onSelect(): void
}

interface MenuAnchor {
  top: number
  left: number
  width: number
}

/** Position a menu near its trigger, flipping upward when the viewport is short. */
function menuAnchor(rect: DOMRect, itemCount: number, width = 190): MenuAnchor {
  const height = itemCount * 32 + 12
  const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8))
  let top = rect.bottom + 4
  if (top + height > window.innerHeight - 8) top = Math.max(8, rect.top - height - 4)
  return { top, left, width }
}

/** Floating vertical action list used by task and workspace rows. */
function ActionMenu(props: {
  anchor: MenuAnchor
  items: readonly ActionMenuItem[]
  onClose(): void
}): React.ReactElement {
  const { anchor, items, onClose } = props
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }
    const onPointerDown = (event: PointerEvent): void => {
      const target = event.target as Element | null
      if (target !== null && target.closest('.dshLL_actionMenu') !== null) return
      onClose()
    }
    const onResize = (): void => onClose()
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown, true)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown, true)
      window.removeEventListener('resize', onResize)
    }
  }, [onClose])

  return createPortal(
    <>
      <div className="dshLL_actionBackdrop" onPointerDown={onClose} />
      <div
        className="dshLL_actionMenu"
        role="menu"
        style={{ top: anchor.top, left: anchor.left, width: anchor.width }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && (item.danger === true || item.id === 'delete-workspace' || item.id === 'delete-task' || item.id === 'archive') ? (
              <div className="dshLL_actionSeparator" />
            ) : null}
            <button
              type="button"
              role="menuitem"
              className={'dshLL_actionItem' + (item.danger === true ? ' dshLL_actionDanger' : '')}
              onClick={() => {
                onClose()
                item.onSelect()
              }}
            >
              {item.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    </>,
    document.body,
  )
}

/** Rename dialog shared by workspace and conversation rows. */
function RenameDialog(props: {
  title: string
  initial: string
  onCancel(): void
  onSubmit(value: string): Promise<void>
  t: LayoutT
}): React.ReactElement {
  const { title, initial, onCancel, onSubmit, t } = props
  const [value, setValue] = React.useState(initial)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const submit = async (): Promise<void> => {
    const next = value.trim()
    if (next === '') {
      setError(t('dialog.empty'))
      return
    }
    setBusy(true)
    setError(null)
    try {
      await onSubmit(next)
    } catch (failure) {
      setError(failure instanceof Error && failure.message !== '' ? failure.message : t('dialog.failed'))
      setBusy(false)
    }
  }

  return createPortal(
    <div
      className="dshLL_dialogBackdrop"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget && !busy) onCancel()
      }}
    >
      <div
        className="dshLL_dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <h2 className="dshLL_dialogTitle">{title}</h2>
        <input
          ref={inputRef}
          className="dshLL_dialogInput"
          value={value}
          disabled={busy}
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              void submit()
            } else if (event.key === 'Escape' && !busy) {
              onCancel()
            }
          }}
        />
        {error === null ? null : <div className="dshLL_dialogError">{error}</div>}
        <div className="dshLL_dialogActions">
          <button type="button" className="dshLL_dialogButton" disabled={busy} onClick={onCancel}>
            {t('dialog.cancel')}
          </button>
          <button
            type="button"
            className="dshLL_dialogButton dshLL_dialogPrimary"
            disabled={busy}
            onClick={() => void submit()}
          >
            {busy ? t('dialog.processing') : t('dialog.save')}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** Confirmation dialog for archive and destructive row actions. */
function ConfirmDialog(props: {
  title: string
  message: string
  confirmLabel: string
  danger?: boolean
  onCancel(): void
  onConfirm(): Promise<void> | void
  t: LayoutT
}): React.ReactElement {
  const { title, message, confirmLabel, danger, onCancel, onConfirm, t } = props
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && !busy) onCancel()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [busy, onCancel])

  const confirm = async (): Promise<void> => {
    setBusy(true)
    setError(null)
    try {
      await onConfirm()
    } catch (failure) {
      setError(failure instanceof Error && failure.message !== '' ? failure.message : t('dialog.failed'))
      setBusy(false)
    }
  }

  return createPortal(
    <div
      className="dshLL_dialogBackdrop"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget && !busy) onCancel()
      }}
    >
      <div
        className="dshLL_dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <h2 className="dshLL_dialogTitle">{title}</h2>
        <p className="dshLL_dialogMessage">{message}</p>
        {error === null ? null : <div className="dshLL_dialogError">{error}</div>}
        <div className="dshLL_dialogActions">
          <button type="button" className="dshLL_dialogButton" disabled={busy} onClick={onCancel}>
            {t('dialog.cancel')}
          </button>
          <button
            type="button"
            className={'dshLL_dialogButton ' + (danger === true ? 'dshLL_dialogDanger' : 'dshLL_dialogPrimary')}
            disabled={busy}
            onClick={() => void confirm()}
          >
            {busy ? t('dialog.processing') : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** Minimal row shape the task list needs from a Session summary. */
interface TaskRow {
  id: string
  displayTitle: string
  updatedAt: number
  cwd?: string
  pinned: boolean
}

/** Minimal status shape used by the row dot. */
interface TaskStatus {
  running?: boolean
  pendingInteraction?: unknown
  completionUnread?: boolean
}

/** Whether a Workspace is the product's automatic default Workspace. */
function isDefaultWorkspace(workspace: WorkspaceView): boolean {
  const path = workspace.path.replace(/\\/g, '/').toLowerCase()
  if (path.endsWith('/deepseek-harness/default-workspace')) return true
  return workspace.title.trim().toLowerCase() === 'default-workspace'
}

/** Derive the ungrouped task digest: recent five, remainder, total. */
function deriveTasks(
  sessions: SessionListState,
  workspaces: WorkspaceSnapshot,
  hidden: ReadonlySet<string>,
): {
  total: number
  visible: TaskRow[]
  rest: TaskRow[]
} {
  const items = workspaces.items ?? []
  const archivedIds = workspaces.archivedSessionIds ?? []
  const pinnedIds = workspaces.pinnedSessionIds ?? []
  const defaultWorkspace = items.find(isDefaultWorkspace)
  const defaultIds = new Set<string>(defaultWorkspace === undefined ? [] : (defaultWorkspace.sessionIds ?? []).map(String))
  const assigned = new Set<string>()
  for (const workspace of items) {
    for (const id of workspace.sessionIds ?? []) assigned.add(String(id))
  }
  const archived = new Set<string>(archivedIds.map(String))
  const pinIndex = new Map<string, number>(pinnedIds.map((id, index) => [String(id), index]))
  const rows: TaskRow[] = []
  for (const id of sessions.ids ?? []) {
    const summary = sessions.byId?.[id]
    if (summary === undefined) continue
    const key = String(id)
    if (archived.has(key) || hidden.has(key)) continue
    if (assigned.has(key) && !defaultIds.has(key)) continue
    if (summary.origin === 'subagent' || summary.blank) continue
    rows.push({
      id: key,
      displayTitle: summary.displayTitle,
      updatedAt: summary.updatedAt,
      cwd: summary.cwd ?? defaultWorkspace?.path,
      pinned: pinIndex.has(key),
    })
  }
  rows.sort((left, right) => {
    const leftPin = pinIndex.get(left.id)
    const rightPin = pinIndex.get(right.id)
    if (leftPin !== undefined || rightPin !== undefined) {
      if (leftPin === undefined) return 1
      if (rightPin === undefined) return -1
      return leftPin - rightPin
    }
    return right.updatedAt - left.updatedAt
  })
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000
  const visible = rows.filter((row) => row.updatedAt >= cutoff).slice(0, 5)
  const visibleIds = new Set(visible.map((row) => row.id))
  const rest = rows.filter((row) => !visibleIds.has(row.id))
  return { total: rows.length, visible, rest }
}

const RELATIVE_TIME = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto', style: 'short' })
const CALENDAR_DATE = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' })

/** Human-facing update timestamp: relative for the recent month, calendar beyond. */
function formatUpdatedAt(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return ''
  const diff = value - Date.now()
  const size = Math.abs(diff)
  if (size < 60_000) return RELATIVE_TIME.format(0, 'second')
  if (size < 3_600_000) return RELATIVE_TIME.format(Math.round(diff / 60_000), 'minute')
  if (size < 86_400_000) return RELATIVE_TIME.format(Math.round(diff / 3_600_000), 'hour')
  if (size < 30 * 86_400_000) return RELATIVE_TIME.format(Math.round(diff / 86_400_000), 'day')
  return CALENDAR_DATE.format(value)
}

/** One conversation row used by both the task area and workspace groups. */
function TaskRowView(props: {
  row: TaskRow
  status: TaskStatus | undefined
  actions: LeftLayoutInjected
  context: 'task' | 'workspace'
  onOpen(id: string): void
  onHide?(id: string): void
  t: LayoutT
}): React.ReactElement {
  const { row, status, actions, context, onOpen, onHide, t } = props
  const [anchor, setAnchor] = React.useState<MenuAnchor | null>(null)
  const [renameOpen, setRenameOpen] = React.useState(false)
  const [confirm, setConfirm] = React.useState<'archive' | 'hide' | null>(null)
  const dot = status?.pendingInteraction !== undefined && status?.pendingInteraction !== null
    ? 'pending'
    : status?.running === true
      ? 'running'
      : status?.completionUnread === true
        ? 'unread'
        : 'idle'

  const items: ActionMenuItem[] = [
    {
      id: 'pin',
      label: row.pinned ? t('actions.unpin') : t('actions.pin'),
      onSelect: () => {
        if (row.pinned) actions.unpinSession(row.id)
        else actions.pinSession(row.id)
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
      onSelect: () => actions.openPath(row.cwd as string),
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
  ]

  return (
    <div className="dshLL_sessionRow" data-menu-open={anchor === null ? undefined : 'true'}>
      <button
        type="button"
        className="dshLL_sessionMainButton"
        title={row.displayTitle}
        onClick={() => onOpen(row.id)}
      >
        <span className="dshLL_statusDot" data-state={dot} aria-hidden="true" />
        <span className="dshLL_sessionMain">
          <span className="dshLL_sessionTitle">{row.displayTitle}</span>
          <span className="dshLL_sessionMeta">{formatUpdatedAt(row.updatedAt)}</span>
        </span>
      </button>
      <span className="dshLL_rowActions">
        <button
          type="button"
          className="dshLL_rowAction"
          aria-label={t('actions.more')}
          title={t('actions.more')}
          onClick={(event) => {
            event.stopPropagation()
            setAnchor(menuAnchor(event.currentTarget.getBoundingClientRect(), items.length))
          }}
        >
          <IconMore size={14} />
        </button>
      </span>
      {anchor === null ? null : (
        <ActionMenu anchor={anchor} items={items} onClose={() => setAnchor(null)} />
      )}
      {renameOpen ? (
        <RenameDialog
          title={t('dialog.renameSession')}
          initial={row.displayTitle}
          t={t}
          onCancel={() => setRenameOpen(false)}
          onSubmit={async (value) => {
            await actions.renameSession(row.id, value)
            setRenameOpen(false)
          }}
        />
      ) : null}
      {confirm === 'archive' ? (
        <ConfirmDialog
          title={t('dialog.archive')}
          message={t('dialog.archiveMessage')}
          confirmLabel={t('dialog.confirmArchive')}
          t={t}
          onCancel={() => setConfirm(null)}
          onConfirm={async () => {
            await actions.archiveSession(row.id, true)
            setConfirm(null)
          }}
        />
      ) : null}
      {confirm === 'hide' ? (
        <ConfirmDialog
          title={t('dialog.deleteTask')}
          message={t('dialog.deleteTaskMessage')}
          confirmLabel={t('dialog.delete')}
          danger
          t={t}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            onHide?.(row.id)
            setConfirm(null)
          }}
        />
      ) : null}
    </div>
  )
}

/** Disclosure chevron for a workspace group. */
function IconChevron({ open, size = 14 }: { open: boolean; size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 120ms ease' }}
    >
      <path d="m6 3.8 4.2 4.2L6 12.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Select the visible Sessions accounted to one Workspace. */
function deriveWorkspaceSessions(
  workspace: WorkspaceView,
  sessions: SessionListState,
  archived: ReadonlySet<string>,
  pinnedSessionIds: readonly string[],
  hidden: ReadonlySet<string>,
): TaskRow[] {
  const pinIndex = new Map<string, number>((pinnedSessionIds ?? []).map((id, index) => [String(id), index]))
  const rows: TaskRow[] = []
  for (const id of workspace.sessionIds ?? []) {
    const summary = sessions.byId?.[id]
    if (summary === undefined) continue
    const key = String(id)
    if (archived.has(key) || hidden.has(key) || summary.origin === 'subagent' || summary.blank) continue
    rows.push({
      id: key,
      displayTitle: summary.displayTitle,
      updatedAt: summary.updatedAt,
      cwd: summary.cwd ?? workspace.path,
      pinned: pinIndex.has(key),
    })
  }
  rows.sort((left, right) => {
    const leftPin = pinIndex.get(left.id)
    const rightPin = pinIndex.get(right.id)
    if (leftPin !== undefined || rightPin !== undefined) {
      if (leftPin === undefined) return 1
      if (rightPin === undefined) return -1
      return leftPin - rightPin
    }
    return right.updatedAt - left.updatedAt
  })
  return rows
}

/** One workspace row, expanding to its conversations. */
function WorkspaceGroup(props: {
  workspace: WorkspaceView
  rows: readonly TaskRow[]
  statusOf(id: string): TaskStatus | undefined
  actions: LeftLayoutInjected
  openSession(id: string): void
  t: LayoutT
}): React.ReactElement {
  const { workspace, rows, statusOf, actions, openSession, t } = props
  const workspaceId = String(workspace.workspaceId)
  const [expanded, setExpanded] = React.useState(false)
  const [anchor, setAnchor] = React.useState<MenuAnchor | null>(null)
  const [renameOpen, setRenameOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const items: ActionMenuItem[] = [
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
  ]

  return (
    <div className="dshLL_wsGroup">
      <div className="dshLL_wsRow" data-menu-open={anchor === null ? undefined : 'true'}>
        <button
          type="button"
          className="dshLL_wsChevron"
          aria-expanded={expanded}
          aria-label={t('section.workspaces')}
          onClick={() => setExpanded((value) => !value)}
        >
          <IconChevron open={expanded} />
        </button>
        <button
          type="button"
          className="dshLL_wsMain"
          title={workspace.path}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          <span className="dshLL_wsIcon"><IconWorkspace size={14} /></span>
          <span className="dshLL_wsTitle">{workspace.title}</span>
          <span className="dshLL_wsCount">{rows.length}</span>
        </button>
        <span className="dshLL_rowActions">
          <button
            type="button"
            className="dshLL_rowAction"
            aria-label={t('actions.more')}
            title={t('actions.more')}
            onClick={(event) => {
              event.stopPropagation()
              setAnchor(menuAnchor(event.currentTarget.getBoundingClientRect(), items.length))
            }}
          >
            <IconMore size={14} />
          </button>
          <button
            type="button"
            className="dshLL_rowAction"
            aria-label={t('actions.newConversation')}
            title={t('actions.newConversation')}
            onClick={(event) => {
              event.stopPropagation()
              actions.openWorkspace(workspaceId)
            }}
          >
            <IconNewChat size={14} />
          </button>
        </span>
      </div>
      {expanded ? (
        <div className="dshLL_wsSessions">
          {rows.length === 0 ? (
            <div className="dshLL_placeholder">{t('workspaces.noSessions')}</div>
          ) : (
            rows.map((row) => (
              <TaskRowView
                key={row.id}
                row={row}
                status={statusOf(row.id)}
                actions={actions}
                context="workspace"
                onOpen={openSession}
                t={t}
              />
            ))
          )}
        </div>
      ) : null}
      {anchor === null ? null : (
        <ActionMenu anchor={anchor} items={items} onClose={() => setAnchor(null)} />
      )}
      {renameOpen ? (
        <RenameDialog
          title={t('dialog.renameWorkspace')}
          initial={workspace.title}
          t={t}
          onCancel={() => setRenameOpen(false)}
          onSubmit={async (value) => {
            await actions.renameWorkspace(workspaceId, value)
            setRenameOpen(false)
          }}
        />
      ) : null}
      {deleteOpen ? (
        <ConfirmDialog
          title={t('dialog.deleteWorkspace')}
          message={t('dialog.deleteWorkspaceMessage')}
          confirmLabel={t('dialog.delete')}
          danger
          t={t}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={async () => {
            await actions.deleteWorkspace(workspaceId)
            setDeleteOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

/** The top function bar: New Session plus promoted functions plus More. */
function FunctionBar(props: {
  wide: boolean
  panels: readonly PanelItem[]
  activePanelId: string | null
  selectPanel(id: string): void
  startSession(): void
  openSkills(): void
  t: LayoutT
}): React.ReactElement {
  const { wide, panels, activePanelId, selectPanel, startSession, openSkills, t } = props
  // The promotion array is both the membership set and the display order of
  // the bar: dragging rewrites it, so the order the user sees is the order
  // that survives a reload.
  const [promoted, setPromoted] = React.useState<string[]>(readPromoted)
  const promotedSet = React.useMemo(() => new Set(promoted), [promoted])
  const availablePanels = React.useMemo(
    () => panels.filter((panel) => panel.id !== 'skills-manager'),
    [panels],
  )
  const visible = React.useMemo(() => {
    const byId = new Map(availablePanels.map((panel) => [panel.id, panel]))
    const rows: PanelItem[] = []
    for (const id of promoted) {
      const panel = byId.get(id)
      if (panel !== undefined) rows.push(panel)
    }
    return rows
  }, [availablePanels, promoted])
  const hiddenCount = availablePanels.length - visible.length
  const [draggingId, setDraggingId] = React.useState<string | null>(null)
  const [dropEdge, setDropEdge] = React.useState<{ id: string; edge: DropEdge } | null>(null)
  const moreLabel = hiddenCount > 0 ? t('more.count', { count: hiddenCount }) : t('more')
  const [open, setOpen] = React.useState(false)
  const [anchor, setAnchor] = React.useState<{ top: number; left: number; width: number } | null>(null)
  const moreRef = React.useRef<HTMLButtonElement>(null)

  const openMenu = (): void => {
    const rect = moreRef.current?.getBoundingClientRect()
    const width = Math.max(220, Math.min(300, window.innerWidth - 16))
    const left = rect === undefined ? 8 : Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))
    const top = rect === undefined ? 48 : Math.min(rect.bottom + 4, window.innerHeight - 80)
    setAnchor({ top, left, width })
    setOpen(true)
  }

  /** Set the promotion list and mirror it to storage in one place. */
  const commit = (next: string[]): void => {
    setPromoted(next)
    writePromoted(next)
  }

  const toggle = (id: string, on: boolean): void => {
    if (on) {
      if (!promoted.includes(id)) commit([...promoted, id])
      return
    }
    if (promoted.includes(id)) commit(promoted.filter((item) => item !== id))
  }

  /** Move a dragged function next to another one; both edges are supported. */
  const movePromoted = (draggedId: string, targetId: string, edge: DropEdge): void => {
    const next = moveInList(promoted, draggedId, targetId, edge)
    if (next !== promoted) commit([...next])
  }

  /**
   * Drag wiring for one function button. The list is a single vertical stack in
   * both bar shapes, so the pointer's half of the row decides the landing edge.
   */
  const dragHandle = (id: string): DragHandle => ({
    dragging: draggingId === id,
    edge: dropEdge !== null && dropEdge.id === id ? dropEdge.edge : null,
    onDragStart: (event) => {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', id)
      setDraggingId(id)
      setDropEdge(null)
    },
    onDragOver: (event) => {
      if (draggingId === null || draggingId === id) return
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
      const rect = event.currentTarget.getBoundingClientRect()
      const edge: DropEdge = event.clientY - rect.top > rect.height / 2 ? 'after' : 'before'
      if (dropEdge === null || dropEdge.id !== id || dropEdge.edge !== edge) setDropEdge({ id, edge })
    },
    onDragLeave: (event) => {
      const next = event.relatedTarget as Node | null
      if (next !== null && event.currentTarget.contains(next)) return
      if (dropEdge !== null && dropEdge.id === id) setDropEdge(null)
    },
    onDrop: (event) => {
      event.preventDefault()
      const edge = dropEdge !== null && dropEdge.id === id ? dropEdge.edge : 'before'
      if (draggingId !== null) movePromoted(draggingId, id, edge)
      setDraggingId(null)
      setDropEdge(null)
    },
    onDragEnd: () => {
      setDraggingId(null)
      setDropEdge(null)
    },
  })

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = (): void => setOpen(false)
    const onPointerDown = (event: PointerEvent): void => {
      const target = event.target as Element | null
      if (target !== null && target.closest('.dshLL_moreMenu') !== null) return
      if (target !== null && moreRef.current !== null && moreRef.current.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown, true)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown, true)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const moreButton = (
    <button
      ref={moreRef}
      type="button"
      className={wide ? 'dshLL_row' : 'dshLL_railButton'}
      aria-label={moreLabel}
      title={wide ? undefined : moreLabel}
      aria-expanded={open}
      data-active={open ? 'true' : undefined}
      onClick={() => {
        if (open) setOpen(false)
        else openMenu()
      }}
    >
      <span className={wide ? 'dshLL_rowIcon' : undefined}><IconMore size={wide ? 16 : 18} /></span>
      {wide ? <span className="dshLL_rowLabel">{moreLabel}</span> : null}
    </button>
  )

  return (
    <>
      {wide ? (
        <div className="dshLL_top">
          <div className="dshLL_sectionLabel">{t('section.functions')}</div>
          <div className="dshLL_functionList">
            <FunctionRow icon={<IconNewChat />} label={t('newSession')} onClick={startSession} />
            <FunctionRow icon={<IconSkill />} label={t('skills.open')} onClick={openSkills} />
            {visible.map((panel) => (
              <FunctionRow
                key={panel.id}
                icon={<PanelIcon id={panel.id} />}
                label={panel.label}
                active={activePanelId === panel.id}
                drag={dragHandle(panel.id)}
                onClick={() => selectPanel(panel.id)}
              />
            ))}
            {moreButton}
          </div>
        </div>
      ) : (
        <div className="dshLL_rail">
          <button type="button" className="dshLL_railButton" aria-label={t('newSession')} title={t('newSession')} onClick={startSession}>
            <IconNewChat size={18} />
          </button>
          <button type="button" className="dshLL_railButton" aria-label={t('skills.open')} title={t('skills.open')} onClick={openSkills}>
            <IconSkill size={18} />
          </button>
          {visible.map((panel) => {
            const drag = dragHandle(panel.id)
            return (
              <button
                key={panel.id}
                type="button"
                className="dshLL_railButton"
                aria-label={panel.label}
                title={panel.label}
                data-active={activePanelId === panel.id ? 'true' : undefined}
                draggable
                data-dragging={drag.dragging ? 'true' : undefined}
                data-drop={drag.edge ?? undefined}
                onDragStart={drag.onDragStart}
                onDragOver={drag.onDragOver}
                onDragLeave={drag.onDragLeave}
                onDrop={drag.onDrop}
                onDragEnd={drag.onDragEnd}
                onClick={() => selectPanel(panel.id)}
              >
                <PanelIcon id={panel.id} size={18} />
              </button>
            )
          })}
          {moreButton}
        </div>
      )}
      {open && anchor !== null ? (
        <>
          <div className="dshLL_moreBackdrop" onPointerDown={() => setOpen(false)} />
          <MoreMenu
            anchor={anchor}
            panels={availablePanels}
            promoted={promotedSet}
            onToggle={toggle}
            onOpen={selectPanel}
            onStartSession={startSession}
            onClose={() => setOpen(false)}
            t={t}
          />
        </>
      ) : null}
    </>
  )
}

const HIDDEN_TASKS_KEY = 'dsh-left-layout:hidden-tasks:v1'

/** Read locally hidden task ids; malformed storage means nothing is hidden. */
function readHiddenTasks(): string[] {
  try {
    const raw = window.localStorage.getItem(HIDDEN_TASKS_KEY)
    if (raw === null) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

/** Persist the locally hidden task ids; storage failures are non-fatal. */
function writeHiddenTasks(ids: readonly string[]): void {
  try {
    window.localStorage.setItem(HIDDEN_TASKS_KEY, JSON.stringify(ids))
  } catch {
    // Keep the in-memory state when storage is unavailable.
  }
}

/** The three-section sidebar browsing region. */
function LeftLayoutRegion(props: LeftLayoutProps): React.ReactElement {
  const {
    wide,
    panels,
    selectPanel,
    startSession,
    openSkills,
    openSession,
    addWorkspace,
    useSessions,
    useWorkspaces,
    useSessionStatus,
    usePanelInfo,
    t,
  } = props
  const panelRows = React.useSyncExternalStore(
    panels.subscribe,
    panels.getSnapshot,
    panels.getSnapshot,
  )
  const sessions = useSessions((state) => state)
  const workspaces = useWorkspaces((state) => state)
  const sessionStatus = useSessionStatus((state) => state)
  const activePanelId = usePanelInfo((info) => info.activePanelId)
  const [tasksExpanded, setTasksExpanded] = React.useState(false)
  const [hiddenTasks, setHiddenTasks] = React.useState<string[]>(readHiddenTasks)
  const hiddenSet = React.useMemo(() => new Set(hiddenTasks), [hiddenTasks])
  const hideTask = (id: string): void => {
    setHiddenTasks((current) => {
      if (current.includes(id)) return current
      const next = [...current, id]
      writeHiddenTasks(next)
      return next
    })
  }
  const tasks = React.useMemo(
    () => deriveTasks(sessions, workspaces, hiddenSet),
    [sessions, workspaces, hiddenSet],
  )
  const taskRows = tasksExpanded ? [...tasks.visible, ...tasks.rest] : tasks.visible
  const workspaceItems = workspaces.items ?? []
  const pinnedSessionIds = workspaces.pinnedSessionIds ?? []
  const archivedSessions = React.useMemo(
    () => new Set<string>((workspaces.archivedSessionIds ?? []).map(String)),
    [workspaces.archivedSessionIds],
  )
  const namedWorkspaces = React.useMemo(
    () => workspaceItems.filter((workspace) => !isDefaultWorkspace(workspace)),
    [workspaceItems],
  )
  const statusOf = (id: string): TaskStatus | undefined => sessionStatus.get(id as never)

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute('data-dsh-left-layout-active', '')
    return () => {
      document.documentElement.removeAttribute('data-dsh-left-layout-active')
    }
  }, [])

  React.useEffect(() => {
    // The native New Session control stays visible in the Windows collapsed
    // title bar; route it through the same default-workspace action.
    const onNewSessionClick = (event: MouseEvent): void => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('[class*="newSession"]') === null) return
      event.preventDefault()
      event.stopPropagation()
      startSession()
    }
    document.addEventListener('click', onNewSessionClick, true)
    return () => document.removeEventListener('click', onNewSessionClick, true)
  }, [startSession])

  React.useLayoutEffect(() => {
    const root = document.documentElement
    if (wide) root.removeAttribute('data-dsh-left-layout-collapsed')
    else root.setAttribute('data-dsh-left-layout-collapsed', '')
    return () => {
      root.removeAttribute('data-dsh-left-layout-collapsed')
    }
  }, [wide])

  return (
    <div className="dshLL_root">
      <FunctionBar
        wide={wide}
        panels={panelRows}
        activePanelId={activePanelId}
        selectPanel={selectPanel}
        startSession={startSession}
        openSkills={openSkills}
        t={t}
      />

      {wide ? (
        <>
          <div className="dshLL_middle">
            <SectionHeader title={t('section.tasks')} count={tasks.total} />
            <div className="dshLL_scroll">
              {taskRows.length === 0 ? (
                <div className="dshLL_placeholder">{t('tasks.empty')}</div>
              ) : (
                taskRows.map((row) => (
                  <TaskRowView
                    key={row.id}
                    row={row}
                    status={sessionStatus.get(row.id as never)}
                    actions={props}
                    context="task"
                    onOpen={openSession}
                    onHide={hideTask}
                    t={t}
                  />
                ))
              )}
              {tasks.rest.length > 0 ? (
                <button
                  type="button"
                  className="dshLL_moreLink"
                  aria-expanded={tasksExpanded}
                  onClick={() => setTasksExpanded((value) => !value)}
                >
                  {tasksExpanded ? t('tasks.less') : t('tasks.more', { count: tasks.rest.length })}
                </button>
              ) : null}
            </div>
          </div>

          <div className="dshLL_bottom">
            <SectionHeader
              title={t('section.workspaces')}
              count={namedWorkspaces.length}
              action={(
                <button
                  type="button"
                  className="dshLL_sectionActionButton"
                  aria-label={t('workspaces.add')}
                  title={t('workspaces.add')}
                  onClick={addWorkspace}
                >
                  <IconPlus />
                </button>
              )}
            />
            <div className="dshLL_scroll">
              {namedWorkspaces.length === 0 ? (
                <div className="dshLL_placeholder">{t('workspaces.empty')}</div>
              ) : (
                namedWorkspaces.map((workspace) => (
                  <WorkspaceGroup
                    key={String(workspace.workspaceId)}
                    workspace={workspace}
                    rows={deriveWorkspaceSessions(
                      workspace,
                      sessions,
                      archivedSessions,
                      pinnedSessionIds,
                      hiddenSet,
                    )}
                    statusOf={statusOf}
                    actions={props}
                    openSession={openSession}
                    t={t}
                  />
                ))
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

/** Register the three-section browsing region and its supporting services. */
export function apply(ctx: Context): void {
  ctx.effect(() => {
    try {
      return ctx.locale.register(NS, { zh, en })
    } catch (error) {
      console.warn('[dsh-left-layout] locale registration failed', error)
      return () => {}
    }
  }, 'dsh-left-layout: dictionaries')

  ctx.effect(() => {
    const style = document.createElement('style')
    style.setAttribute('data-dsh-left-layout-style', '')
    style.textContent = STYLES
    document.head.appendChild(style)
    return () => {
      style.remove()
    }
  }, 'dsh-left-layout: styles')

  const panelSource = createPanelSource(ctx)
  ctx.effect(() => () => panelSource.dispose(), 'dsh-left-layout: panel source')


  ctx.slots.inject('sidebar.workspaces', () => ctx.slots.register({
    name: 'sidebar.workspaces',
    priority: -1000,
    locale: NS,
    inject: (): LeftLayoutInjected => ({
      panels: panelSource.source,
      selectPanel: (id) => {
        ctx.layout.selectPanel(id as never)
      },
      openSkills: () => {
        try {
          const mainEntries = ctx.slots.entriesOfSlot('main')
          if (mainEntries.some((entry) => entry.options.key === 'skills-manager')) {
            ctx.layout.selectPanel('skills-manager' as never)
            return
          }
        } catch (error) {
          console.warn('[dsh-left-layout] skills main panel lookup failed', error)
        }

        const pressSettingsShortcut = (altKey: boolean): void => {
          try {
            document.dispatchEvent(new KeyboardEvent('keydown', {
              key: ',',
              code: 'Comma',
              ctrlKey: true,
              altKey,
              bubbles: true,
              cancelable: true,
            }))
          } catch {
            // Ignore synthetic keyboard failures.
          }
        }

        const openSettings = (): void => {
          const row = document.querySelector('[class*="triggerRow"]')
          const account = row?.querySelector<HTMLButtonElement>('button[aria-haspopup="menu"]')
            ?? document.querySelector<HTMLButtonElement>('button[aria-label="账号菜单"]')
          if (account !== null && account !== undefined) {
            account.click()
            window.setTimeout(() => {
              const items = Array.from(document.querySelectorAll<HTMLButtonElement>('button[class*="_item_"]'))
              const settingsItem = items.find((item) => {
                const text = (item.textContent ?? '').trim()
                return text.startsWith('设置') || text.toLowerCase().startsWith('settings')
              })
              if (settingsItem !== undefined) {
                settingsItem.click()
                return
              }
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
              pressSettingsShortcut(false)
              pressSettingsShortcut(true)
            }, 250)
            return
          }
          const fallback = document.querySelector<HTMLButtonElement>('[class*="triggerRow"] button[aria-haspopup="dialog"]')
          if (fallback !== null) {
            fallback.click()
            return
          }
          pressSettingsShortcut(false)
          pressSettingsShortcut(true)
        }

        const labelOfSkills = (): string => {
          try {
            const entries = (ctx.slots as unknown as {
              entriesOfSlot(key: string): readonly {
                options: { id?: string; label?: string | (() => string) }
              }[]
            }).entriesOfSlot('settings.section')
            const entry = entries.find((item) => item.options.id === 'skills-manager')
            const raw = entry?.options.label
            const label = typeof raw === 'function' ? raw() : raw
            if (typeof label === 'string' && label !== '') return label
          } catch {
            // Fall through to the default label.
          }
          return '技能'
        }

        openSettings()
        const label = labelOfSkills()
        let attempts = 0
        const selectSection = (): void => {
          const cells = Array.from(document.querySelectorAll<HTMLButtonElement>('[class*="navCell"]'))
          const target = cells.find((cell) => (cell.textContent ?? '').includes(label))
          if (target !== undefined) {
            target.click()
            return
          }
          if (attempts >= 60) {
            console.warn('[dsh-left-layout] skills settings section not found')
            return
          }
          attempts += 1
          window.setTimeout(selectSection, 50)
        }
        window.setTimeout(selectSection, 50)
      },
      startSession: () => {
        try {
          const snapshot = ctx.workspaces.list.getSnapshot()
          const defaultWorkspace = snapshot.items.find(isDefaultWorkspace)
          if (defaultWorkspace === undefined) ctx.uiWorkspace.startSession()
          else ctx.uiWorkspace.startSession(defaultWorkspace.workspaceId as never)
        } catch (error) {
          console.warn('[dsh-left-layout] default workspace lookup failed', error)
          ctx.uiWorkspace.startSession()
        }
      },
      openSession: (id) => {
        ctx.uiWorkspace.openSession(id as never)
      },
      openWorkspace: (id) => {
        void ctx.uiWorkspace.openWorkspace(id as never)
      },
      addWorkspace: () => {
        void (async () => {
          try {
            const path = await ctx.uiWorkspace.pickDirectory()
            if (path === null) return
            const created = await ctx.workspaces.create({ path })
            void ctx.uiWorkspace.openWorkspace(created.workspaceId as never)
          } catch (error) {
            console.warn('[dsh-left-layout] add workspace failed', error)
          }
        })()
      },
      pinSession: (id) => {
        void ctx.uiWorkspace.pinSession(id as never).catch((error) => {
          console.warn('[dsh-left-layout] pin failed', error)
        })
      },
      unpinSession: (id) => {
        void ctx.uiWorkspace.unpinSession(id as never).catch((error) => {
          console.warn('[dsh-left-layout] unpin failed', error)
        })
      },
      archiveSession: async (id, stopActivity) => {
        await ctx.uiWorkspace.archiveSession(
          id as never,
          stopActivity ? { stopActivity: true } : undefined,
        )
      },
      renameSession: async (id, title) => {
        const sessions = ctx.get('sessions', false) as typeof ctx.sessions | undefined
        if (sessions === undefined) throw new Error('session service is unavailable')
        await sessions.using(id as never, { source: 'workspaceOperation' }, async (reference) => {
          const result = await reference.binding.session.rename(title)
          if (!result.ok) throw new Error(result.error.message)
        })
      },
      renameWorkspace: async (id, title) => {
        await ctx.workspaces.rename(id as never, title)
      },
      deleteWorkspace: async (id) => {
        await ctx.workspaces.delete(id as never)
      },
      openPath: (path) => {
        if (path === '') return
        void (async () => {
          try {
            const remote = (ctx as unknown as {
              remote: {
                session: {
                  openWorkspacePath(request: { path: string }): Promise<{
                    ok: boolean
                    error?: { message?: string }
                  }>
                }
              }
            }).remote
            const result = await remote.session.openWorkspacePath({ path })
            if (!result.ok) {
              console.warn('[dsh-left-layout] open path failed', result.error)
            }
          } catch (error) {
            console.warn('[dsh-left-layout] open path failed', error)
          }
        })()
      },
    }),
  }, LeftLayoutRegion as never))
}
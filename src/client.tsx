import * as React from 'react'
import type { Context } from '@deepseek-ai/cordis'
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-workspace/client'

/** Client services this plugin needs. */
export const inject = ['slots', 'locale', 'layout', 'uiWorkspace', 'workspaces']

const NS = 'leftLayout'

type LeftLayoutKey =
  | 'section.functions'
  | 'section.tasks'
  | 'section.workspaces'
  | 'newSession'
  | 'more'
  | 'tasks.placeholder'
  | 'workspaces.placeholder'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    leftLayout: LeftLayoutKey
  }
}

const zh: Record<LeftLayoutKey, string> = {
  'section.functions': '功能',
  'section.tasks': '任务',
  'section.workspaces': '工作区',
  newSession: '新会话',
  more: '更多',
  'tasks.placeholder': '最近的无归属会话将显示在这里',
  'workspaces.placeholder': '已注册的工作区将显示在这里',
}

const en: Record<LeftLayoutKey, string> = {
  'section.functions': 'Functions',
  'section.tasks': 'Tasks',
  'section.workspaces': 'Workspaces',
  newSession: 'New Session',
  more: 'More',
  'tasks.placeholder': 'Recent ungrouped conversations will appear here',
  'workspaces.placeholder': 'Registered workspaces will appear here',
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
}

type LeftLayoutProps = PropsRuntime<'sidebar.workspaces'>
  & PropsLocale<typeof NS>
  & InjectFace<LeftLayoutInjected>

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

/** Render a full-width function row. */
function FunctionRow(props: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick(): void
}): React.ReactElement {
  return (
    <button
      type="button"
      className="dshLL_row"
      data-active={props.active === true ? 'true' : undefined}
      onClick={props.onClick}
    >
      <span className="dshLL_rowIcon">{props.icon}</span>
      <span className="dshLL_rowLabel">{props.label}</span>
    </button>
  )
}

/** Render a section heading with an optional count. */
function SectionHeader(props: { title: string; count: number }): React.ReactElement {
  return (
    <div className="dshLL_sectionHeader">
      <span className="dshLL_sectionTitle">{props.title}</span>
      <span className="dshLL_sectionCount">{props.count}</span>
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

/** The three-section sidebar browsing region. */
function LeftLayoutRegion(props: LeftLayoutProps): React.ReactElement {
  const {
    wide,
    panels,
    selectPanel,
    startSession,
    useSessions,
    useWorkspaces,
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
  const activePanelId = usePanelInfo((info) => info.activePanelId)

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute('data-dsh-left-layout-active', '')
    return () => {
      document.documentElement.removeAttribute('data-dsh-left-layout-active')
    }
  }, [])

  if (!wide) {
    return (
      <div className="dshLL_root">
        <div className="dshLL_rail">
          <button type="button" className="dshLL_railButton" aria-label={t('newSession')} title={t('newSession')} onClick={startSession}>
            <IconNewChat size={18} />
          </button>
          <button type="button" className="dshLL_railButton" aria-label={t('more')} title={t('more')}>
            <IconMore size={18} />
          </button>
          <button type="button" className="dshLL_railButton" aria-label={t('section.workspaces')} title={t('section.workspaces')}>
            <IconWorkspace size={18} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dshLL_root">
      <div className="dshLL_top">
        <div className="dshLL_sectionLabel">{t('section.functions')}</div>
        <div className="dshLL_functionList">
          <FunctionRow icon={<IconNewChat />} label={t('newSession')} onClick={startSession} />
          {panelRows.map((panel) => (
            <FunctionRow
              key={panel.id}
              icon={<IconWorkspace />}
              label={panel.label}
              active={activePanelId === panel.id}
              onClick={() => selectPanel(panel.id)}
            />
          ))}
          <FunctionRow icon={<IconMore />} label={t('more')} onClick={() => undefined} />
        </div>
      </div>

      <div className="dshLL_middle">
        <SectionHeader title={t('section.tasks')} count={sessions.ids.length} />
        <div className="dshLL_scroll">
          <div className="dshLL_placeholder">{t('tasks.placeholder')}</div>
        </div>
      </div>

      <div className="dshLL_bottom">
        <SectionHeader title={t('section.workspaces')} count={workspaces.items.length} />
        <div className="dshLL_scroll">
          <div className="dshLL_placeholder">{t('workspaces.placeholder')}</div>
        </div>
      </div>
    </div>
  )
}

/** Register the three-section browsing region and its supporting services. */
export function apply(ctx: Context): void {
  ctx.effect(
    () => ctx.locale.register(NS, { zh, en }),
    'dsh-left-layout: dictionaries',
  )

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
      startSession: () => {
        ctx.uiWorkspace.startSession()
      },
    }),
  }, LeftLayoutRegion as never))
}

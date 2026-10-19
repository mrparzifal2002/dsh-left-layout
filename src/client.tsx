import * as React from 'react'
import { createPortal } from 'react-dom'
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
  | 'more.title'
  | 'more.always'
  | 'more.hint'
  | 'more.empty'
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
  'more.title': '提到外面',
  'more.always': '常驻',
  'more.hint': '勾选后显示在功能栏',
  'more.empty': '暂无其他功能',
  'tasks.placeholder': '最近的无归属会话将显示在这里',
  'workspaces.placeholder': '已注册的工作区将显示在这里',
}

const en: Record<LeftLayoutKey, string> = {
  'section.functions': 'Functions',
  'section.tasks': 'Tasks',
  'section.workspaces': 'Workspaces',
  newSession: 'New Session',
  more: 'More',
  'more.title': 'Show outside',
  'more.always': 'Always',
  'more.hint': 'Checked functions appear in the function bar',
  'more.empty': 'No other functions',
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

/** Pick a stable glyph for a global panel id. */
function PanelIcon({ id, size = 16 }: { id: string; size?: number }): React.ReactElement {
  const key = id.toLowerCase()
  if (key.includes('plugin')) return <IconPlug size={size} />
  if (key.includes('schedule') || key.includes('cron')) return <IconClock size={size} />
  if (key.includes('task') || key.includes('goal') || key.includes('workflow')) return <IconChecklist size={size} />
  return <IconWorkspace size={size} />
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

const PROMOTED_KEY = 'dsh-left-layout:promoted:v1'

/** Read the browser-local promotion list; malformed storage means no promotions. */
function readPromoted(): string[] {
  try {
    const raw = window.localStorage.getItem(PROMOTED_KEY)
    if (raw === null) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
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
  t(key: LeftLayoutKey): string
}): React.ReactElement {
  const { anchor, panels, promoted, onToggle, t } = props
  return createPortal(
    <div
      className="dshLL_moreMenu"
      role="dialog"
      aria-label={t('more.title')}
      style={{ top: anchor.top, left: anchor.left, width: anchor.width }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="dshLL_menuTitle">{t('more.title')}</div>
      <div className="dshLL_menuFixed dshLL_menuRow">
        <span className="dshLL_menuCheck">✓</span>
        <span className="dshLL_menuRowIcon"><IconNewChat /></span>
        <span className="dshLL_menuRowLabel">{t('newSession')}</span>
        <span className="dshLL_menuTag">{t('more.always')}</span>
      </div>
      <div className="dshLL_menuList">
        {panels.length === 0 ? <div className="dshLL_menuEmpty">{t('more.empty')}</div> : null}
        {panels.map((panel) => (
          <label key={panel.id} className="dshLL_menuRow">
            <input
              type="checkbox"
              checked={promoted.has(panel.id)}
              onChange={(event) => onToggle(panel.id, event.currentTarget.checked)}
            />
            <span className="dshLL_menuRowIcon"><PanelIcon id={panel.id} /></span>
            <span className="dshLL_menuRowLabel">{panel.label}</span>
          </label>
        ))}
      </div>
      <div className="dshLL_menuHint">{t('more.hint')}</div>
    </div>,
    document.body,
  )
}

/** The top function bar: New Session plus promoted functions plus More. */
function FunctionBar(props: {
  wide: boolean
  panels: readonly PanelItem[]
  activePanelId: string | null
  selectPanel(id: string): void
  startSession(): void
  t(key: LeftLayoutKey): string
}): React.ReactElement {
  const { wide, panels, activePanelId, selectPanel, startSession, t } = props
  const [promoted, setPromoted] = React.useState<string[]>(readPromoted)
  const promotedSet = React.useMemo(() => new Set(promoted), [promoted])
  const visible = panels.filter((panel) => promotedSet.has(panel.id))
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

  const toggle = (id: string, on: boolean): void => {
    setPromoted((current) => {
      const next = on
        ? (current.includes(id) ? current : [...current, id])
        : current.filter((item) => item !== id)
      writePromoted(next)
      return next
    })
  }

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = (): void => setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const moreButton = (
    <button
      ref={moreRef}
      type="button"
      className={wide ? 'dshLL_row' : 'dshLL_railButton'}
      aria-label={t('more')}
      title={wide ? undefined : t('more')}
      aria-expanded={open}
      data-active={open ? 'true' : undefined}
      onClick={() => {
        if (open) setOpen(false)
        else openMenu()
      }}
    >
      <span className={wide ? 'dshLL_rowIcon' : undefined}><IconMore size={wide ? 16 : 18} /></span>
      {wide ? <span className="dshLL_rowLabel">{t('more')}</span> : null}
    </button>
  )

  return (
    <>
      {wide ? (
        <div className="dshLL_top">
          <div className="dshLL_sectionLabel">{t('section.functions')}</div>
          <div className="dshLL_functionList">
            <FunctionRow icon={<IconNewChat />} label={t('newSession')} onClick={startSession} />
            {visible.map((panel) => (
              <FunctionRow
                key={panel.id}
                icon={<PanelIcon id={panel.id} />}
                label={panel.label}
                active={activePanelId === panel.id}
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
          {visible.map((panel) => (
            <button
              key={panel.id}
              type="button"
              className="dshLL_railButton"
              aria-label={panel.label}
              title={panel.label}
              data-active={activePanelId === panel.id ? 'true' : undefined}
              onClick={() => selectPanel(panel.id)}
            >
              <PanelIcon id={panel.id} size={18} />
            </button>
          ))}
          {moreButton}
        </div>
      )}
      {open && anchor !== null ? (
        <>
          <div className="dshLL_moreBackdrop" onPointerDown={() => setOpen(false)} />
          <MoreMenu
            anchor={anchor}
            panels={panels}
            promoted={promotedSet}
            onToggle={toggle}
            t={t}
          />
        </>
      ) : null}
    </>
  )
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

  return (
    <div className="dshLL_root">
      <FunctionBar
        wide={wide}
        panels={panelRows}
        activePanelId={activePanelId}
        selectPanel={selectPanel}
        startSession={startSession}
        t={t}
      />

      {wide ? (
        <>
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
        </>
      ) : null}
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
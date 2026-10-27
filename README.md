---
description: "Three-section left sidebar layout for the DSH Web GUI: a function bar, a recent-task area, and a workspace area."
kind: "package-bundle"
---

# dsh-left-layout

English | [中文](README.zh.md)

A DeepSeek Harness (DSH) bundle plugin that replaces the sidebar's browsing region with three
sections — **functions**, **recent tasks**, and **workspaces** — and lets you drag the function bar
into any order you like.

```
┌────────────────────────────────┐
│  DSH                       ▸   │  native shell (kept)
├────────────────────────────────┤
│  + New session                 │  always visible, not draggable
│  Docker                    ⠿   │  promoted functions,
│  Skills                    ⠿   │  drag to reorder
│  More (3)                      │
├────────────────────────────────┤
│  Refactor the loader       ⋮   │  tasks: newest 5 of the
│  Fix drag reorder          ⋮   │  last 30 days
│  Show more                     │
├────────────────────────────────┤
│  ▾ dsh-plugins         +   ⋮   │  workspaces, expandable
│      Fix drag reorder      ⋮   │
└────────────────────────────────┘
```

## Why

The stock sidebar is one flat scrolling list: every registered panel sits above every conversation,
and there is no way to keep the panels you actually use within reach. This plugin splits the region
by intent, keeps the five conversations you are most likely to reopen at the top, and lets you
choose — and order — the functions you want on the bar.

The native shell is untouched: the brand row, the collapse rail, the Settings footer, and the
title-bar New Session control all stay where they were. Only the browsing region is replaced.

## Features

### Functions

- **New session** is pinned to the top and always visible.
- Every other function — built-in panels *and* settings-only features such as **Skills** — can be
  **promoted** to the bar or left in the **More** menu.
- Promoted functions can be **dragged into any order**, and the order survives a reload.
- The **More** button reports how many functions are currently hidden.
- In the **More** menu each row has two independent gestures: the checkbox moves the function
  between the bar and More, while clicking the icon or name opens it and closes the menu.
- A settings-only function has no sidebar panel of its own. Clicking **Skills** opens the skills
  manager main panel when that panel exists; otherwise it opens Settings and selects the **Skills**
  section.

### Tasks

- Lists the conversations in DSH's automatic default workspace, plus any conversation not assigned
  to a workspace.
- A conversation is *recent* when it last saw activity within 30 days; only the newest five are
  shown. **Show more** expands the complete list, older conversations included.
- Hover a row for its three-dot menu: **Pin to top** (or **Unpin**), **Rename**, **Open local
  folder**, **Archive**, and **Delete task** (red). Archiving stops running work first.
- Archived sessions and subagent-origin sessions are hidden.

### Workspaces

- Every explicitly registered workspace gets a row; expand it to see its conversations, or use the
  plus button to register another directory.
- Hover a row for the three-dot menu and the new-conversation button. The menu offers **Open local
  folder**, **Rename**, and **Delete this workspace** (red).

## Install

Requirements:

| | |
|---|---|
| DSH | `>=0.2.1-rc.2 <0.3.0-0` |
| Node | `>=22.19.0` (only needed to build from source) |
| React | `^18.2.0` (supplied by the host) |

Install from a checkout of this repository:

```bash
git clone https://github.com/mrparzifal2002/dsh-left-layout.git
cd dsh-left-layout
npm install
npm run build          # only after changing src/ — lib/ ships built
```

Link it into the profile and register the bundle:

```bash
pnpm add link:/absolute/path/to/dsh-left-layout
```

Add `dsh-left-layout` to `dsh.profile.bundles` in the profile's `package.json`. The bundle patch
(`cordis.patch.yml`) inserts the plugin's loader row itself, so no separate patch entry is needed.

Restart the GUI and the three sections are in place.

## Turning it off

Settings → Plugins lists the bundle like any other plugin. Disable it to restore the stock sidebar
immediately; enable it to bring the layout back. The plugin holds no server-side data, and it
removes its styles and DOM markers on unload.

## What it stores

All state is per browser, in `localStorage`. Nothing leaves the machine and nothing is written to
the profile.

| Key | Contents |
|---|---|
| `dsh-left-layout:promoted:v1` | Ordered list of function ids on the bar. The array order *is* the display order. |
| `dsh-left-layout:hidden-tasks:v1` | Ids of conversations hidden with **Delete task**. |
| `dsh-left-layout:skills-seeded:v1` | One-time flag that stops **Skills** from being re-added to the bar after a deliberate unpromote. |

To reset the layout, remove those keys and reload.

## Behavior details

- **Default workspace.** The task section treats the product's automatic default workspace
  (`.../deepseek-harness/default-workspace`, title `default-workspace`) as its bucket. Explicit
  workspaces stay in the bottom section.
- **New session target.** The button creates the conversation in the automatic default workspace
  when that workspace is registered; if it is missing, it falls back to the native
  current/recent-workspace choice.
- **Blank sessions** are not listed. The New Session button still creates one; the row appears once
  the conversation has content.
- **Drag semantics.** Drop on the upper half of a row to land above it, on the lower half to land
  below it; a drop line marks the target. A newly checked function is appended to the end — and so
  is a function you uncheck and check again.
- **Delete task is a local hide.** DSH does not expose Session-log deletion, so the conversation
  disappears from this sidebar only; the log is untouched.
- **Collapsed sidebar.** When the sidebar is collapsed the browsing region is hidden by design; the
  title-bar New Session control stays visible, so you can still start a conversation.

## Development

```bash
npm install
npm run typecheck      # tsc --noEmit
npm run build          # src/client.tsx -> lib/client.js + lib/types/
```

| Path | Role |
|---|---|
| `src/client.tsx` | The whole feature: layout component, styles, storage, i18n table. |
| `src/index.ts` | Inert host half — the plugin is entirely browser-side. |
| `scripts/build.mjs` | Transpiles the client into a `window.__ModuleLoader__` factory bundle and emits declarations. |
| `lib/` | Committed build output, so a checkout runs without a build step. |
| `locale/` | Panel title and description for the plugin list. |

`lib/` is committed and kept in sync with `src/` in the same commit. The build normalizes line
endings before writing, so rebuilding on Windows and Linux produces a byte-identical bundle — a
one-line source change yields a small diff instead of a whole-file churn.

## Limitations

- **Mouse only.** Function-bar reordering uses native HTML5 drag-and-drop, so touch screens and
  keyboard-only reordering do not work.
- **Workspace reorder is not implemented.** Rename, delete, and open-folder are available from the
  hover menu instead.
- **Default-workspace detection is a convention.** It matches the path and title of this DSH
  release; if a deployment changes either, the task section falls back to ungrouped conversations.
- **The Skills bridge walks the DOM.** Locating the Settings section relies on class-name fragments
  and section text, so a host that renames either leaves the panel open but unsectioned — a
  `settings section not found` warning appears in the console.
- **Single source of order.** The promotion array doubles as the display order, which keeps one
  piece of state instead of two; the trade-off is that unchecking then re-checking moves a function
  to the end.

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| Sidebar looks unchanged | The bundle is not active: check `dsh.profile.bundles`, then Settings → Plugins, then restart the GUI. |
| Function bar holds nothing but New session | Nothing is promoted yet — open **More** and tick the functions you want. |
| Dragging a row does nothing | Only promoted rows are draggable (New session never is), and dragging needs a mouse. |
| Tasks section shows only ungrouped conversations | The default-workspace convention does not match this deployment; see Limitations. |
| Clicking Skills opens Settings but not the Skills page | The host changed its settings DOM; see Limitations. |
| Order or hidden tasks look stale | Remove the `dsh-left-layout:*` keys listed above and reload. |

## License

MIT — see [LICENSE](LICENSE).

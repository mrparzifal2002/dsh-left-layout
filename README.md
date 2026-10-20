---
description: "Three-section left sidebar layout for the DSH Web GUI: a function bar, a recent-task area, and a workspace area."
kind: "package-bundle"
---

# dsh-left-layout

[中文](README.zh.md) | English

## Overview

`dsh-left-layout` replaces the sidebar browsing region with a three-section layout:

1. **Functions** — New Session and the global panels. New Session is always visible. Every other
   function can live in the **More** menu and is promoted to the bar with a checkbox.
2. **Tasks** — conversations in the default workspace plus ungrouped conversations. The five most
   recent conversations from the last 30 days stay visible; everything else folds into **Show more**.
3. **Workspaces** — every explicitly registered workspace. Expand a row to see its conversations,
   or use the plus button to register another directory.

The native sidebar shell (brand row, collapse rail, Settings footer) is kept. Only the browsing
region and the old New Session / panel-list controls are replaced.

## Install

The package is a normal DSH bundle. Install it with the plugin manager (local path or registry),
or mount it manually:

```bash
pnpm add link:/absolute/path/to/dsh-left-layout
```

Add `dsh-left-layout` to `dsh.profile.bundles` in the profile `package.json`. The bundle patch
inserts the loader row, so no separate patch entry is needed.

## Toggle it off

Settings → Plugins lists the bundle like any other plugin. Disable it there to restore the stock
sidebar immediately; re-enable it to bring the three-section layout back. The plugin owns no
persistent data, and it removes its styles and DOM markers on unload.

Promotion choices are stored per browser in `localStorage` under
`dsh-left-layout:promoted:v1`; tasks removed with **Delete task** are stored under
`dsh-left-layout:hidden-tasks:v1`.

## Behavior notes

- **Default workspace**: the task area treats the product's automatic default workspace
  (`.../deepseek-harness/default-workspace`, title `default-workspace`) as the task bucket, and
  also includes conversations not assigned to any workspace. Explicit workspaces stay in the
  bottom section.
- **Recent five**: a conversation is "recent" when its last activity is within 30 days. Only the
  five newest recent rows are shown; **Show more** expands to the complete task list, including
  older conversations.
- **Blank sessions** are not listed as conversations. The New Session button still creates one and
  the conversation view remains the place where it grows into a row.
- **Archived sessions** and subagent-origin sessions are hidden from both sections.
- **Workspace row actions**: hover a workspace row to reveal the three-dot menu and the
  new-conversation button. Clicking the row (or its chevron) expands/collapses the workspace.
  The menu offers **Open local folder**, **Rename**, and **Delete this workspace** (red).
- **Task row actions**: hover a conversation to reveal its three-dot menu with **Pin to top**
  (or **Unpin**), **Rename**, **Open local folder**, **Archive**, and **Delete task** (red).
  Archive stops running work first. DSH does not delete Session logs, so **Delete task** only
  hides the conversation from this sidebar; it is not a log deletion.

## Development

```bash
npm install
npm run typecheck
npm run build
```

`npm run build` transpiles `src/client.tsx` into the `window.__ModuleLoader__` factory bundle at
`lib/client.js` and emits declarations under `lib/types`. The host half (`lib/index.js`) is inert:
the entire feature is browser-side.

## Known limitations

- Workspace drag-reorder is not exposed yet; rename, delete, and open-folder are available from
  the hover menu. **Delete task** is a local hide, not a Session-log deletion.
- The default-workspace match is a path/title convention of this DSH release. If a deployment
  changes that convention, the task area falls back to ungrouped conversations only.
- On Windows the sidebar's collapsed state hides the browsing region; the native title-bar New
  Session control is kept visible in that state.

## License

MIT

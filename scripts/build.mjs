import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const node = process.execPath
const tsc = join(root, 'node_modules', 'typescript', 'bin', 'tsc')

rmSync(join(root, '.build'), { recursive: true, force: true })
rmSync(join(root, 'lib', 'types'), { recursive: true, force: true })
mkdirSync(join(root, 'lib'), { recursive: true })

execFileSync(node, [tsc, '-p', join(root, 'tsconfig.build.json')], { cwd: root, stdio: 'inherit' })
execFileSync(node, [tsc, '-p', join(root, 'tsconfig.types.json')], { cwd: root, stdio: 'inherit' })

const body = readFileSync(join(root, '.build', 'client.js'), 'utf8')
const wrapped = `window.__ModuleLoader__.load({
  id: "dsh-left-layout",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
${body.replace(/^/gm, '    ')}    return module.exports;
  }
});
`
writeFileSync(join(root, 'lib', 'client.js'), wrapped)

writeFileSync(join(root, 'lib', 'index.js'), `export const name = 'left-layout'

/** Host half is intentionally inert: this plugin is a browser-side layout. */
export function apply() {}
`)
console.log('built lib/client.js and lib/index.js')

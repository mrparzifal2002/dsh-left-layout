import type { Context } from '@deepseek-ai/cordis';
/** Client services this plugin needs. */
export declare const inject: string[];
type LeftLayoutKey = 'section.functions' | 'section.tasks' | 'section.workspaces' | 'newSession' | 'more' | 'more.title' | 'more.count' | 'more.always' | 'more.hint' | 'more.empty' | 'tasks.placeholder' | 'tasks.empty' | 'tasks.more' | 'tasks.less' | 'workspaces.placeholder' | 'workspaces.empty' | 'workspaces.add' | 'workspaces.noSessions';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        leftLayout: LeftLayoutKey;
    }
}
/** Register the three-section browsing region and its supporting services. */
export declare function apply(ctx: Context): void;
export {};

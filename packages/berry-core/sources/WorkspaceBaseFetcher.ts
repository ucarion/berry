import {Fetcher, FetchOptions} from './Fetcher';
import {WorkspaceBaseResolver} from './WorkspaceBaseResolver';
import * as structUtils        from './structUtils';
import {Locator}               from './types';

export class WorkspaceBaseFetcher implements Fetcher {
  supports(locator: Locator) {
    if (!locator.reference.startsWith(WorkspaceBaseResolver.protocol))
      return false;

    return true;
  }

  async fetchManifest(locator: Locator, opts: FetchOptions) {
    return this.getWorkspace(locator, opts).manifest;
  }

  async fetch(locator: Locator, opts: FetchOptions) {
    return this.getWorkspace(locator, opts).cwd;
  }

  getWorkspace(locator: Locator, opts: FetchOptions) {
    const normalizedLocator = structUtils.makeLocatorFromIdent(locator, locator.reference.slice(WorkspaceBaseResolver.protocol.length));

    return opts.project.getWorkspaceByLocator(normalizedLocator);
  }
}
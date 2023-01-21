import { AtomAsset } from 'dumi-assets-types';
import {
  ILocalesConfig,
  IPreviewerProps,
  IRouteMeta,
  ISidebarGroup,
  IThemeConfig,
} from 'dumi/dist/client/theme-api/types';
import { PICKED_PKG_FIELDS } from 'dumi/dist/constants';
import { ComponentType } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface SiteState {
  pkg: Partial<Record<keyof typeof PICKED_PKG_FIELDS, any>>;
  entryExports: Record<string, any>;
  demos: Record<
    string,
    {
      component: ComponentType;
      asset: IPreviewerProps['asset'];
      routeId: string;
    }
  >;
  components: Record<string, AtomAsset>;
  locales: ILocalesConfig;
  themeConfig: IThemeConfig;
  loading: boolean;
  setLoading: (status: boolean) => void;
}

interface Store {
  siteData: SiteState;
  sidebar: ISidebarGroup[];
  routeMeta: IRouteMeta;
}

export const useSiteStore = create<Store>()(
  devtools(
    () => ({
      siteData: {
        setLoading: undefined,
        loading: true,
        pkg: {},
        components: {},
        demos: {},
        locales: [],
        entryExports: {},
        themeConfig: undefined,
      },
      sidebar: [],
      routeMeta: {
        toc: [],
        texts: [],
        tabs: undefined,
        frontmatter: undefined,
      },
    }),
    { name: 'dumi-site-store' },
  ),
);
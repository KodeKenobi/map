/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/tailwind.config`; params?: Router.UnknownInputParams; } | { pathname: `/../store/slices/wellnessCardsSlice`; params?: Router.UnknownInputParams; } | { pathname: `/../store/slices/wisdomCardsSlice`; params?: Router.UnknownInputParams; } | { pathname: `/../store/slices/wealthCardsSlice`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/tailwind.config`; params?: Router.UnknownOutputParams; } | { pathname: `/../store/slices/wellnessCardsSlice`; params?: Router.UnknownOutputParams; } | { pathname: `/../store/slices/wisdomCardsSlice`; params?: Router.UnknownOutputParams; } | { pathname: `/../store/slices/wealthCardsSlice`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/tailwind.config${`?${string}` | `#${string}` | ''}` | `/../store/slices/wellnessCardsSlice${`?${string}` | `#${string}` | ''}` | `/../store/slices/wisdomCardsSlice${`?${string}` | `#${string}` | ''}` | `/../store/slices/wealthCardsSlice${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/tailwind.config`; params?: Router.UnknownInputParams; } | { pathname: `/../store/slices/wellnessCardsSlice`; params?: Router.UnknownInputParams; } | { pathname: `/../store/slices/wisdomCardsSlice`; params?: Router.UnknownInputParams; } | { pathname: `/../store/slices/wealthCardsSlice`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}

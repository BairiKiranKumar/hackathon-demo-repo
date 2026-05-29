import { createTheme, rem, Loader } from '@mantine/core'

import {CustomLoader} from '@lowLevelComp/Loader/CustomLoader'

/**
 * This object will be used to override Mantine theme defaults.
 * See https://mantine.dev/theming/mantine-provider/#theme-object for theming options
 * @type {import("@mantine/core").MantineThemeOverride}
 */
const theme = {
  headings: {
    sizes: {
      h1: { fontSize: rem(40), lineHeight: rem(48) },
      h2: { fontSize: rem(32), lineHeight: rem(40) },
      h3: { fontSize: rem(24), lineHeight: rem(32) },
      h4: { fontSize: rem(18), lineHeight: rem(24) },
      h5: { fontSize: rem(16), lineHeight: rem(20) },
      h6: { fontSize: rem(12), lineHeight: rem(16) },
    },
  },
  fontSizes: {
    xxs: rem(10),
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  lineHeights: {
    xxs: rem(12),
    xs: rem(16),
    sm: rem(20),
    md: rem(24),
    lg: rem(26),
    xl: rem(28),
  },
  radius: {
    md: rem(10),
    lg: rem(16),
  },
  primaryColor: 'green',
  colors: {
    green: [
      '#ebfbee',
      '#d3f9d8',
      '#b2f2bb',
      '#8ce99a',
      '#69db7c',
      '#53957D',
      '#096744',
      '#3a8569',
      '#9DD6C6',
      '#2b8a3e',
    ],
  },

  components: {
    Button: {
      styles: (theme, params) => {
        return {
          root: {
            padding:
              params.size === 'xs'
                ? '0 12px'
                : params.size === 'sm'
                  ? '0 16px'
                  : params.size === 'md'
                    ? '0 20px'
                    : params.size === 'lg'
                      ? '0 24px'
                      : '0 32px', // xl size
            height:
              params.size === 'xs'
                ? '24px'
                : params.size === 'sm'
                  ? '32px'
                  : params.size === 'md'
                    ? '40px'
                    : params.size === 'lg'
                      ? '48px'
                      : '56px', // xl size
          },
        }
      },
    },
    Pill: {
      styles: (theme, params) => {
        return {
          root: {
            padding:
              params.size === 'sm'
                ? '0 8px'
                : params.size === 'md'
                  ? '0 8px'
                  : '',
            fontSize:
              params.size === 'sm'
                ? '10px'
                : params.size === 'md'
                  ? '12px'
                  : params.size === 'lg' &&
                      params.className?.includes('ai-pill')
                    ? '12px'
                    : '',
            height:
              params.size === 'sm'
                ? '20px'
                : params.size === 'md'
                  ? '24px'
                  : params.size === 'lg' &&
                      params.className?.includes('ai-pill')
                    ? '28px'
                    : '',
          },
        }
      },
    },
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CustomLoader },
        type: 'custom',
      },
    }),
  },
}

export default createTheme(theme)

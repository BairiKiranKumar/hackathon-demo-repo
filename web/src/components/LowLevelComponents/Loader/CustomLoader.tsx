import { forwardRef } from 'react'

import { Box, MantineLoaderComponent } from '@mantine/core'
import cx from 'clsx'

import classes from './CustomLoader.module.css'
import './CustomLoader.css'

export const CustomLoader: MantineLoaderComponent = forwardRef(
  ({ className }, ref) => (
    <div className="loader-container">
      <Box component="span" className={cx(classes.loader, className)} ref={ref}>
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="AI Loader">
            <path
              id="AI Loader_2"
              d="M48.5194 24.6083C48.7173 23.7318 50.7299 23.7318 50.9279 24.6083C52.1362 29.9584 54.4024 37.115 58.3673 41.08C62.3323 45.0449 69.4889 47.3111 74.839 48.5194C75.7155 48.7173 75.7155 50.7299 74.839 50.9279C69.4889 52.1362 62.3323 54.4024 58.3673 58.3673C54.4024 62.3323 52.1362 69.4889 50.9279 74.839C50.7299 75.7155 48.7173 75.7155 48.5194 74.839C47.3111 69.4889 45.0449 62.3323 41.08 58.3673C37.115 54.4024 29.9584 52.1362 24.6083 50.9279C23.7318 50.7299 23.7318 48.7173 24.6083 48.5194C29.9584 47.3111 37.115 45.0449 41.08 41.08C45.0449 37.115 47.3111 29.9584 48.5194 24.6083Z"
              fill="url(#paint0_linear_3708_214246)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_3708_214246"
              x1="81.7236"
              y1="49.7236"
              x2="17.7236"
              y2="49.7236"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5D45CF" />
              <stop offset="1" stopColor="#BE62DD" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
    </div>
  )
)

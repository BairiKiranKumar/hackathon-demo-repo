import { Box, Skeleton } from '@mantine/core'

import { SkeletonLoaderProps } from 'src/interfaces/commonInterfaces'

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 1,
  isAiGradient = false,
  height = 28,
  radius = 4,
  width = '100%',
  circle = false,
  display = 'flex',
  styleClass = '',
  mb = 0,
  mt = 0,
}) => {
  // Create an array of size `count`
  const skeletonArray = Array.from({ length: count })

  return (
    <>
      <Box
        display={display}
        style={{ width: '100%' }}
        className={styleClass}
        mb={mb}
        mt={mt}
      >
        {skeletonArray.map((_, index) => (
          <Skeleton
            key={index}
            className={`bh-skeleton ${isAiGradient ? 'bh-ai-loader' : ''}`}
            height={height}
            width={width}
            radius={radius}
            circle={circle}
          />
        ))}
      </Box>
    </>
  )
}

export default SkeletonLoader

import { Flex, Grid, Divider } from '@mantine/core'
import type { Overview, OverviewVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import SkeletonLoader from 'src/components/LowLevelComponents/SkeletonLoader/SkeletonLoader'
import OverviewTab from 'src/pages/MemberPanelPage/Tabs/Overview'

export const QUERY: TypedDocumentNode<Overview, OverviewVariables> = gql`
  query Overview($id: Int!) {
    overview: overview(id: $id) {
      id
      overview
      careManagement
      operationalMetrics
    }
  }
`

export const Loading = () => (
  <Flex gap={20} direction="column" mt={16}>
    <Flex gap={12} direction="column">
      <SkeletonLoader width={152} />
      <SkeletonLoader height={150} />
    </Flex>
    <Flex gap={12} direction="column">
      <SkeletonLoader width={152} />
      <Grid gutter={{ base: 20 }}>
        <Grid.Col span={6}>
          <SkeletonLoader height={38} />
        </Grid.Col>
        <Grid.Col span={6}>
          <SkeletonLoader height={38} />
        </Grid.Col>
        <Grid.Col span={6}>
          <SkeletonLoader height={38} />
        </Grid.Col>
        <Grid.Col span={6}>
          <SkeletonLoader height={38} />
        </Grid.Col>
      </Grid>
      <SkeletonLoader width="47px" height={14} />
      <Divider my={'sm'} variant="dashed" />
      <SkeletonLoader width={152} />
      <Grid gutter={{ base: 20 }}>
        <Grid.Col span={6}>
          <SkeletonLoader height={38} />
        </Grid.Col>
        <Grid.Col span={6}>
          <SkeletonLoader height={38} />
        </Grid.Col>
        <Grid.Col span={6}>
          <SkeletonLoader height={38} />
        </Grid.Col>
        <Grid.Col span={6}>
          <SkeletonLoader height={38} />
        </Grid.Col>
      </Grid>
      <SkeletonLoader width={47} height={14} />
    </Flex>
  </Flex>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<OverviewVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ overview }: CellSuccessProps) => {
  console.log(overview)
  return <OverviewTab overview={overview} />
}

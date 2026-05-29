import OverviewCell from 'src/components/Overview/OverviewCell'

type OverviewPageProps = {
  id: number
}

const OverviewPage = ({ id }: OverviewPageProps) => {
  return <OverviewCell id={id} />
}

export default OverviewPage

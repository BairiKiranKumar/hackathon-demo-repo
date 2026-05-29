import EditOverviewCell from 'src/components/Overview/EditOverviewCell'

type OverviewPageProps = {
  id: number
}

const EditOverviewPage = ({ id }: OverviewPageProps) => {
  return <EditOverviewCell id={id} />
}

export default EditOverviewPage

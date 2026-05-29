import React from 'react'

import CarePlanContent from './CarePlanContent'
import ServicePlanContent from './ServicePlanContent'

const AllPlanContent = ({ ServicePlanData, CarePlanData, allPlansTab }) => {
  return (
    <>
      {allPlansTab === 'service-plan' ? (
        <ServicePlanContent ServicePlanData={ServicePlanData} />
      ) : (
        <CarePlanContent CarePlanData={CarePlanData} />
      )}
    </>
  )
}

export default AllPlanContent

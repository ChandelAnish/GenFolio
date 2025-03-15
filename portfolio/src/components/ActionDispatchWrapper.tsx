"use client"

import { fillConnectDetails } from '@/store/connect'
import { fillExperiencesDetails } from '@/store/experiences'
import { useAppDispatch } from '@/store/hooks'
import { fillIntroductionDetails } from '@/store/introduction'
import { fillProjectsDetails } from '@/store/projects'
import { fillToolsAndTechnologiesDetails } from '@/store/toolsAndTechnologies'
import { PortfolioData } from '@/types'
import React, { useEffect } from 'react'

export default function ActionDispatchWrapper({children, data}: {children: React.ReactNode, data:PortfolioData}) {

  const dispatch = useAppDispatch()

useEffect(()=>{
    dispatch(fillIntroductionDetails(data.introduction))
    dispatch(fillExperiencesDetails(data.experiences))
    dispatch(fillProjectsDetails(data.projects))
    dispatch(fillToolsAndTechnologiesDetails(data.toolsAndTechnologies))
    dispatch(fillConnectDetails(data.connect))
})

  return (
    <>
      {children}
    </>
  )
}

'use client'

import React from 'react'

import {
  EmployeeTable,
} from '~/components/tables/employee-table'


export default function SampleEmployeesPage(): React.ReactElement {
  return (
    <div className='container mx-auto my-4'>
      <EmployeeTable />
    </div>
  )
}

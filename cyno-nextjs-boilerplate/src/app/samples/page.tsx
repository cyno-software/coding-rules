import React from 'react'

import {
  EmployeesTable,
} from '~/components/tables/employees-table'


export default function SampleEmployeesPage(): React.ReactElement {
  return (
    <div className='container mx-auto my-4'>
      <EmployeesTable />
    </div>
  )
}

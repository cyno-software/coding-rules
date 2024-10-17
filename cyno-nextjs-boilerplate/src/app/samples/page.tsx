import React, {
  Suspense,
} from "react"

import {
  EmployeesTable,
} from "~/components/tables/employees-table"

export default function SampleEmployeesPage(): React.ReactElement {
  return (
    <Suspense>
      <div className="container mx-auto my-4">
        <EmployeesTable />
      </div>
    </Suspense>
  )
}

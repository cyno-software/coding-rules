import React, {
  Suspense,
} from "react"

import {
  UploadInput,
} from "~/components/inputs/upload-input"
import {
  EmployeesTable,
} from "~/components/tables/employees-table"

export default function SampleEmployeesPage(): React.ReactElement {
  return (
    <Suspense>
      <div className="container mx-auto my-4">
        <UploadInput
          apiUrl="https://api.example.com"
          authToken="your-auth-token"
          onServerUploaded={
            (response) => {
              // TODO: Handle response
              // eslint-disable-next-line no-console
              console.log(
                "Tải lên hoàn tất:", response
              )
            }
          }
        />

        <EmployeesTable />
      </div>
    </Suspense>
  )
}

/* eslint-disable no-restricted-syntax */
"use client"

import React from "react"

import {
  FilePond,
  type FilePondProps,
} from "react-filepond"
import "filepond/dist/filepond.min.css"

export interface FilePondErrorDescription {
  type: string
  code: number
  body: string
}

interface UploadInputProps<T> extends Omit<FilePondProps, "onaddfile" | "onremovefile"> {
  onServerUploaded?: (response: T) => void
  apiUrl: string
  uploadPath?: string
  uploadUrl?: string
  authToken: string
  customLabels?: Partial<typeof defaultLabels>
  maxFiles?: number
  allowMultiple?: boolean
  acceptedFileTypes?: string[]
  maxFileSize?: number
  language?: "en" | "vi"
}

const defaultLabels = {
  en: {
    labelIdle: "Drag & drop your files or <span class=\"filepond--label-action\">Browse</span>",
    labelInvalidField: "Invalid file",
    labelFileWaitingForSize: "Waiting for size",
    labelFileSizeNotAvailable: "Size not available",
    labelFileLoading: "Loading...",
    labelFileLoadError: "Error during load",
    labelFileProcessing: "Uploading...",
    labelFileProcessingComplete: "Upload complete",
    labelFileProcessingAborted: "Upload cancelled",
    labelFileProcessingError: "Error during upload",
    labelFileProcessingRevertError: "Error during revert",
    labelFileRemoveError: "Error during remove",
    labelTapToCancel: "tap to cancel",
    labelTapToRetry: "tap to retry",
    labelTapToUndo: "tap to undo",
    labelButtonRemoveItem: "Remove",
    labelButtonAbortItemLoad: "Abort",
    labelButtonRetryItemLoad: "Retry",
    labelButtonAbortItemProcessing: "Cancel",
    labelButtonUndoItemProcessing: "Undo",
    labelButtonRetryItemProcessing: "Retry",
    labelButtonProcessItem: "Upload",
  },
  vi: {
    labelIdle: "Kéo & thả files của bạn vào đây hoặc <span class=\"filepond--label-action\">tải lên</span>",
    labelInvalidField: "File không hợp lệ",
    labelFileWaitingForSize: "Đang xử lý",
    labelFileSizeNotAvailable: "Không có kích thước",
    labelFileLoading: "Đang tải...",
    labelFileLoadError: "Tải lên thất bại",
    labelFileProcessing: "Đang tải lên...",
    labelFileProcessingComplete: "Tải lên thành công",
    labelFileProcessingAborted: "Đã hủy tải lên",
    labelFileProcessingError: "Lỗi trong quá trình tải lên",
    labelFileProcessingRevertError: "Lỗi khi hoàn tác",
    labelFileRemoveError: "Có lỗi khi xóa",
    labelTapToCancel: "chọn để hủy",
    labelTapToRetry: "chọn để thử lại",
    labelTapToUndo: "chọn để hoàn tác",
    labelButtonRemoveItem: "Xóa",
    labelButtonAbortItemLoad: "Hủy",
    labelButtonRetryItemLoad: "Thử lại",
    labelButtonAbortItemProcessing: "Hủy",
    labelButtonUndoItemProcessing: "Hoàn tác",
    labelButtonRetryItemProcessing: "Thử lại",
    labelButtonProcessItem: "Tải lên",
  },
}

export function UploadInput<T>({
  name = "files",
  onServerUploaded,
  apiUrl,
  uploadPath,
  uploadUrl,
  authToken,
  server,
  customLabels = {
  },
  maxFiles = 10,
  allowMultiple = true,
  acceptedFileTypes = [],
  maxFileSize = 1024 * 10,
  language = "vi",
  ...props
}: UploadInputProps<T>) {
  const getUploadUrl = () => {
    if (uploadUrl) {
      return uploadUrl
    }
    if (uploadPath) {
      return `${apiUrl}${uploadPath}`
    }
    return `${apiUrl}/upload`
  }

  const serverOptions = {
    process: {
      url: getUploadUrl(),
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      ondata: (formData: FormData) => {
        const existingFiles = formData.getAll(name)
        formData.delete(name)
        existingFiles.forEach((file) => {
          formData.append(
            name, file
          )
        })
        return formData
      },
      onload: (response: string) => {
        const parsedResponse = JSON.parse(response)
        onServerUploaded?.(parsedResponse)
        return parsedResponse
      },
    },
    ...(typeof server === "object" ? server : {
    }),
  }

  const selectedLanguageLabels = defaultLabels[language]
  const combinedLabels = {
    ...selectedLanguageLabels,
    ...customLabels,
  }

  return (
    <FilePond
      allowMultiple={allowMultiple}
      maxFiles={maxFiles}
      acceptedFileTypes={acceptedFileTypes}
      fileSizeBase={maxFileSize}
      server={serverOptions}
      allowRevert={false}
      name={name}
      credits={false}
      {...combinedLabels}
      {...props}
    />
  )
}

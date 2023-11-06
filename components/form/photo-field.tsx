import { ChangeEvent } from 'react'
import { Box, FormHelperText, Typography } from '@mui/material'
import Image from 'next/image'
import { Control, FieldValues, Form, Path, useController } from 'react-hook-form'

import { DEFAULT_THUMBNAIL_URL } from '@/constants'

export type PhotoFieldProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
}

export function PhotoField<T extends FieldValues>({ name, control, label }: PhotoFieldProps<T>) {
  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const previewUrl = value?.previewUrl || DEFAULT_THUMBNAIL_URL
  const inputId = `photo-field-${name}`

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    onChange({
      file,
      previewUrl: url
    })
  }

  return (
    <Box my={1.5}>
      <Typography variant="body2">{label}</Typography>

      <Box component="label" sx={{ cursor: 'pointer' }} htmlFor={inputId} ref={ref}>
        <Image src={previewUrl} width={246} height={180} layout="fixed" alt="work thumbnail" />
      </Box>

      <FormHelperText error={!!error}>{error?.message}</FormHelperText>

      <Box
        id={inputId}
        component="input"
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </Box>
  )
}

import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useTagList } from '@/hooks'
import { WorkPayload } from '@/models'
import { AutocompleteField, InputField } from '../form'
import { Button } from '@mui/material'

export interface WorkFormProps {
  initialValues?: Partial<WorkPayload>
  onSubmit?: (payload: Partial<WorkPayload>) => void
}

export function WorkForm({ initialValues, onSubmit }: WorkFormProps) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter your title'),
    shortDescription: yup.string().required('Please enter your description'),
    tagList: yup.array().of(yup.string()).min(1, 'Please select at least one')
  })

  const { control, handleSubmit } = useForm<Partial<WorkPayload>>({
    defaultValues: {
      title: '',
      shortDescription: '',
      tagList: [],
      ...initialValues
    },
    resolver: yupResolver(schema)
  })

  const { data } = useTagList({})
  const tagList = data?.data || []

  async function handleFormSubmit(payload: Partial<WorkPayload>) {
    if (!payload) return
    await onSubmit?.(payload)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField name="title" placeholder="Your work title" control={control} label="Title" />

      <InputField
        name="shortDescription"
        placeholder="Your Work Description"
        label="Short description"
        control={control}
        InputProps={{
          multiline: true,
          rows: 3
        }}
      />

      <AutocompleteField
        name="tagList"
        control={control}
        label="Categories"
        options={tagList}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
      />

      <Button variant="contained" type="submit" size="small">
        {initialValues?.id ? 'Save' : 'Submit'}
      </Button>
    </Box>
  )
}

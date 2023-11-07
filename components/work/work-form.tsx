import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress } from '@mui/material'

import { useTagList } from '@/hooks'
import { WorkPayload } from '@/models'
import { AutocompleteField, EditorField, InputField, PhotoField } from '../form'

export interface WorkFormProps {
  initialValues?: Partial<WorkPayload>
  onSubmit?: (payload: FormData) => void
}

export function WorkForm({ initialValues, onSubmit }: WorkFormProps) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter your title'),
    shortDescription: yup.string().required('Please enter your description'),
    tagList: yup.array().of(yup.string()).min(1, 'Please select at least one'),
    thumbnail: yup
      .object()
      .nullable()
      .test((value: any, context) => {
        if (Boolean(initialValues?.id) || Boolean(value?.file)) return true

        return context.createError({ message: 'Please select an image.' })
      })
      .test('test-size', 'Maximum file exceeded. Please select another file.', (value: any) => {
        const fileSize = value?.file?.['size'] || 0
        const MB_TO_BYTES = 1024 * 1024
        const MAX_SIZE = 3 * MB_TO_BYTES // 3MB

        return fileSize <= MAX_SIZE
      }),
    fullDescription: yup.string().required('Please enter your description')
  })

  const {
    control,
    formState: { isSubmitting },
    handleSubmit
  } = useForm<Partial<WorkPayload>>({
    defaultValues: {
      title: '',
      shortDescription: '',
      tagList: [],
      thumbnail: initialValues?.id ? { file: null, previewUrl: initialValues.thumbnailUrl } : null,
      fullDescription: '',
      ...initialValues
    },
    resolver: yupResolver(schema)
  })

  const { data } = useTagList({})
  const tagList = data?.data || []

  async function handleFormSubmit(formValues: Partial<WorkPayload>) {
    if (!formValues) return

    const payload = new FormData()
    // id
    if (formValues.id) {
      payload.set('id', formValues.id)
    }

    // thumbnail
    if (formValues.thumbnail?.file) {
      payload.set('thumbnail', formValues.thumbnail?.file)
    }

    // tagList
    formValues.tagList?.forEach((tag) => {
      payload.append('tagList', tag)
    })

    // title, short description, full description
    const keyList: Array<keyof Partial<WorkPayload>> = [
      'title',
      'shortDescription',
      'fullDescription'
    ]
    keyList.forEach((name) => {
      if (initialValues?.[name] !== formValues[name]) {
        payload.set(name, formValues[name] as string)
      }
    })

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

      <PhotoField name="thumbnail" label="Thumbnail" control={control} />

      <EditorField name="fullDescription" label="Full description" control={control} />

      <Button
        variant="contained"
        type="submit"
        size="small"
        sx={{ fontSize: '18px' }}
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
      >
        {initialValues?.id ? 'Save' : 'Submit'}
      </Button>
    </Box>
  )
}

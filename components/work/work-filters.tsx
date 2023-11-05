import { InputAdornment, debounce } from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'

import { WorkFiltersPayload } from '@/models'
import { Search } from '@mui/icons-material'
import { InputField } from '../form'

export interface WorkFiltersProps {
  initialValues?: WorkFiltersPayload
  onSubmit?: (payload: WorkFiltersPayload) => void
}

export function WorkFilters({ initialValues, onSubmit }: WorkFiltersProps) {
  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
      ...initialValues
    }
  })

  async function handleFiltersSubmit(payload: WorkFiltersPayload) {
    await onSubmit?.(payload)
  }

  const debounceSearchChange = debounce(handleSubmit(handleFiltersSubmit), 350)

  return (
    <Box component="form" onSubmit={handleSubmit(handleFiltersSubmit)}>
      <InputField
        name="search"
        placeholder="search work by title"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          )
        }}
        onChange={debounceSearchChange}
      />
    </Box>
  )
}
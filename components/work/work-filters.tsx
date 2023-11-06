import { InputAdornment, debounce } from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'

import { WorkFiltersPayload } from '@/models'
import { Search } from '@mui/icons-material'
import { AutocompleteField, InputField } from '../form'
import { useTagList } from '@/hooks'

export interface WorkFiltersProps {
  initialValues?: WorkFiltersPayload
  onSubmit?: (payload: WorkFiltersPayload) => void
}

export function WorkFilters({ initialValues, onSubmit }: WorkFiltersProps) {
  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
      selectedTagList: [],
      ...initialValues
    }
  })

  const { data } = useTagList({})
  const tagList = data?.data || []

  async function handleFiltersSubmit(payload: WorkFiltersPayload) {
    if (!payload) return

    payload.tagList_like = payload.selectedTagList?.join('|') || ''
    delete payload.selectedTagList
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
        onChange={() => debounceSearchChange()}
      />

      <AutocompleteField
        name="selectedTagList"
        control={control}
        label="Filter by category"
        placeholder="Category"
        options={tagList}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
        onChange={() => debounceSearchChange()}
      />
    </Box>
  )
}

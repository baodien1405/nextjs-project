import { Box, FormHelperText, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { LegacyRef, useRef } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface ReactQuillWrapperProps extends ReactQuillProps {
  forwardedRef: LegacyRef<ReactQuill>
}

const ReactQuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')

    const Component = ({ forwardedRef, ...props }: ReactQuillWrapperProps) => {
      return <RQ ref={forwardedRef} {...props} />
    }

    return Component
  },
  { ssr: false }
)

export type EditorFieldProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
}

export function EditorField<T extends FieldValues>({ name, control, label }: EditorFieldProps<T>) {
  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const editorRef = useRef(null)

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        // image: imageHandler,
      }
    }
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background'
  ]

  return (
    <Box my={1.5}>
      <Typography variant="body2">{label}</Typography>

      <Box>
        <ReactQuillWrapper
          forwardedRef={editorRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={(content) => onChange(content)}
        />
      </Box>

      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </Box>
  )
}

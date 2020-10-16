import { useToasts } from 'react-toast-notifications'

export const ToastDemo = ({ content }) => {
  const { addToast } = useToasts()
  return (
    <Button onClick={() => addToast(content, {
      appearance: 'success',
      autoDismiss: true,
    })}>
      Add Toast
    </Button>
  )
}
import { Notification, Transition } from '@mantine/core'
import { IconX, IconCheck } from '@tabler/icons-react'

import { useAppUtilityStore } from 'src/store/AppUtilityStore'

const BhToastNotification = () => {
  const xIcon = <IconX size={24} />
  const checkIcon = <IconCheck size={24} />
  const { toasts, removeToast } = useAppUtilityStore()
  return (
    <div
      style={{ position: 'fixed', top: 48, right: 16, zIndex: 1000 }}
      className="bh-toaster-wrap"
    >
      {toasts.map((toast) => (
        <Transition
          key={toast.id}
          mounted={true}
          transition="scale"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={{ marginBottom: '10px', ...styles }}>
              <Notification
                miw={372}
                p={!toast.type || toast.type === 'default' ? 22 : 12}
                icon={
                  toast.type === 'success'
                    ? checkIcon
                    : toast.type === 'error'
                      ? xIcon
                      : ''
                }
                title={toast.title}
                color={
                  toast.type === 'success'
                    ? 'teal'
                    : toast.type === 'error'
                      ? 'red'
                      : 'blue'
                }
                onClose={() => removeToast(toast.id)}
              >
                {toast.message}
              </Notification>
            </div>
          )}
        </Transition>
      ))}
    </div>
  )
}

export default BhToastNotification

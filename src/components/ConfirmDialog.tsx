import { useEffect, type ReactNode } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  /** Style the confirm button as a destructive action. */
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

/** A simple modal confirmation dialog with a dimmed backdrop. */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-margin-mobile"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative z-10 w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline-variant p-md md:p-lg shadow-[0_12px_48px_rgba(24,29,25,0.22)]">
        <h2 className="font-display text-headline-sm text-on-surface mb-xs">{title}</h2>
        {/* div, not p: the message may contain block content such as a list */}
        <div className="font-body text-body-md text-on-surface-variant mb-lg">{message}</div>
        <div className="flex justify-end gap-sm">
          <button
            type="button"
            onClick={onCancel}
            className="px-md py-[10px] rounded-full border border-outline text-on-surface font-label-lg text-label-lg hover:bg-surface-container-low transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-md py-[10px] rounded-full font-label-lg text-label-lg text-on-primary transition-all hover:brightness-110 ${
              destructive ? 'bg-error' : 'bg-primary'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

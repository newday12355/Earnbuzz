"use client"

interface LogoutConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
}

export function LogoutConfirmation({ onConfirm, onCancel }: LogoutConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to logout? You'll need to login again to access your account.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

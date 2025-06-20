const ModalPopup = ({ title, footer ,isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-0 animate-fadeIn">

                {/* Header */}
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition-colors text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                    {children}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t p-4">
                    {footer}
                </div>
            </div>
        </div>
    )
}
export default ModalPopup;
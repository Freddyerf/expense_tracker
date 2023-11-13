// components/Modal.js
const Modal = ({ show, onClose, children }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow p-4 max-w-sm w-full">
          <div>
            {children}
            <button
              onClick={onClose}
              className="mt-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  
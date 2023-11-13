// Modal.js
const Modal = ({ show, onClose, children }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white rounded-lg p-5 m-4 max-w-lg w-full shadow-lg">
            <div className="mb-4">
              {children}
            </div>
            <button
              onClick={onClose}
              className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  
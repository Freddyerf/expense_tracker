// AddButton.js
const AddButton = ({ onClick, text }) => {
    return (
      <button
        onClick={onClick}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {text}
      </button>
    );
  };
  
  export default AddButton;
  
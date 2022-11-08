import "./SelectedMenuOption.css";

function SelectedMenuOption({ option, handleDelete }) {
  return (
    <div className="selected-option-container">
      <div className="selected-option-content">
        <div className="selected-option-text">{option.value}</div>
        <div
          className="delete-selected-option-action"
          onClick={() => handleDelete(option)}
        >
          x
        </div>
      </div>
    </div>
  );
}

export default SelectedMenuOption;

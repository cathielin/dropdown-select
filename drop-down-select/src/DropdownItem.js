import React from "react";
import "./DropdownItem.css";

function DropdownItem({
  option,
  renderLabel,
  checkbox,
  checked,
  selectionHandler,
}) {
  return (
    <div
      key={option.label}
      className="dropdown-item"
      onClick={() => selectionHandler(option)}
    >
      {checkbox && (
        <input
          className="dropdown-checkbox"
          type="checkbox"
          checked={checked}
        />
      )}
      <div className="dropdown-text">{renderLabel(option.label)}</div>
    </div>
  );
}

export default DropdownItem;

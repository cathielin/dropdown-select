import React, { useState, useMemo } from "react";
import DropdownItem from "./DropdownItem";
import SelectedMenuOption from "./SelectedMenuOption";
import "./DropdownMultiSelect.css";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

function DropdownSelect({ isMulti, options, renderLabel, onChange }) {
  const defaultSelection = { label: "Select Options", value: "Select Options" };
  const noSelection = { label: "None", value: "None" };

  const [showMenu, setShowMenu] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(isMulti ? [] : null);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleSelectAll = () => {
    if (selectedChoice.length === options.length) {
      setSelectedChoice([]);
      onChange([]);
    } else if (
      selectedChoice.length < options.length &&
      selectedChoice.length > 0
    ) {
      let remainingOptions = options.filter(
        (option) => selectedChoice.indexOf(option) === -1
      );
      setSelectedChoice([...selectedChoice, ...remainingOptions]);
      onChange(options);
    } else if (selectedChoice.length===0) {
      setSelectedChoice(options);
      onChange(options);
    }
  };

  const handleMenuSelection = (selected) => {
    if (isMulti) {
      if (findValue(selected)) {
        deleteValue(selected);
      } else {
        setSelectedChoice([...selectedChoice, selected]);
        onChange([...selectedChoice, selected]);
      }
    } else {
      if (selected === noSelection) {
        setSelectedChoice(null);
        onChange(null);
      } else {
        setSelectedChoice(selected);
        onChange(selected);
      }
    }
  };

  const findValue = (target) => {
    return (
      selectedChoice !== null &&
      selectedChoice.findIndex(
        (selection) => selection.value === target.value
      ) >= 0
    );
  };

  const deleteValue = (target) => {
    let newValue = selectedChoice.filter(
      (selection) => selection.value !== target.value
    );
    setSelectedChoice(newValue);
    onChange(newValue);
  };

  const optionsList = useMemo(
    () =>
      options.map((option) => (
        <DropdownItem
          key={option.label}
          option={option}
          renderLabel={renderLabel}
          checkbox={isMulti}
          checked={isMulti ? findValue(option) : false}
          selectionHandler={handleMenuSelection}
        />
      )),
    [options, renderLabel, findValue, handleMenuSelection, isMulti]
  );

  const selectionsList = useMemo(() => {
    if (isMulti) {
      if (selectedChoice.length === 0) {
        return defaultSelection.value;
      } else {
        return selectedChoice.map((selected) => (
          <SelectedMenuOption option={selected} handleDelete={deleteValue} />
        ));
      }
    } else {
      if (selectedChoice === null) {
        return noSelection.value;
      } else {
        return selectedChoice.value;
      }
    }
  }, [selectedChoice, isMulti]);

  return (
    <div className="dropdown-container">
      <div className="dropdown-main-view">
        <div className="dropdown-selected-choice">{selectionsList}</div>
        <div onClick={handleMenuClick} className="dropdown-action">
          <Icon />
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {isMulti ? (
            <DropdownItem
              option={{ label: "All", value: "All" }}
              renderLabel={renderLabel}
              checkbox={true}
              checked={selectedChoice.length === options.length}
              selectionHandler={handleSelectAll}
            />
          ) : (
            <DropdownItem
              option={noSelection}
              renderLabel={renderLabel}
              checkbox={false}
              checked={selectedChoice === null}
              selectionHandler={handleMenuSelection}
            />
          )}

          {optionsList}
        </div>
      )}
    </div>
  );
}
export default DropdownSelect;

import "./App.css";
import DropdownSelect from "./DropdownSelect.js";

function App() {
  const generateData = () => {
    let start = [];
    for (let i = 0; i < 10; i++) {
      start.push({ label: i, value: "val " + i });
    }
    return start;
  };

  const options = generateData();

  return (
    <div className="main-app">
      <div>
        <DropdownSelect
          isMulti={true}
          options={options}
          renderLabel={(str) => str}
          onChange={() => {}}
        />
      </div>

      <div>
        <DropdownSelect
          isMulti={false}
          renderLabel={(str) => str}
          options={options}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

export default App;

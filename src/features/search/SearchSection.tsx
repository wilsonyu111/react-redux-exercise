import React, { createContext, useContext, useState } from "react"
import SearchBar from "./SearchBar"

// radio button passed to child via context
export const SearchMode = createContext<string>("")

const SearchSection: React.FC = () => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState<string>("Name")
  
  // Handle change event for radio buttons
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
    console.log(selectedOption)
  }

  return (
    <div>
      {/* passing to SearchBar child */}
      <SearchMode.Provider value={selectedOption}>
        <SearchBar />
      </SearchMode.Provider>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {/* only allow numeric searching, ID contain only numeric characters */}
        <div style={{ padding: "5px" }}>
          <input
            data-testid="id-radio-button"
            type="radio"
            id="radioById"
            name="groupById" // This is to group radio buttons together
            value="ID"
            style={{ padding: "1px" }}
            checked={selectedOption === "ID"}
            onChange={handleChange}
          />
          <label htmlFor="radioById">ID</label>
        </div>
        {/* only allow name searching */}
        <div style={{ padding: "5px" }}>
          <input
            data-testid="name-radio-button"
            type="radio"
            id="radioByName"
            name="groupByName" // This is a different name to demonstrate different groups
            value="Name"
            style={{ padding: "1px" }}
            checked={selectedOption === "Name"}
            onChange={handleChange}
          />
          <label htmlFor="radioByName">Name</label>
        </div>
      </div>
    </div>
  )
}

export default SearchSection

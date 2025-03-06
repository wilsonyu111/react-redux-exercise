import { useContext, useState } from "react"
import { SearchMode } from "./SearchSection"
import { store } from "../../app/store"
import { useDispatch } from "react-redux"
import { selectItem } from "../grocery/grocerySlice"

const SearchBar = () => {
  const [searchVal, setSearchVal] = useState("")
  const searchMode = useContext(SearchMode)
  const dispatch = useDispatch()
  let type = "number"
  let placeholder = "Search ID"
  const searchById = (id: number) => {
    dispatch(selectItem(id))
    setSearchVal("")
  }

  const searchByName = (name: string) => {
    console.log(name)

    for (let i = 0; i < store.getState().grocery.list.length; i++) {
      let item = store.getState().grocery.list[i]
      if (item.name === name) {
        dispatch(selectItem(item.id))
        break
      }
    }
    setSearchVal("")
  }

  if (searchMode === "Name") {
    type = "text"
    placeholder = "Search Name"
  }

  return (
    <div className="search-bar">
      <input
        key="searchBox"
        data-testid="search-bar"
        type={type}
        value={searchVal}
        placeholder={placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchVal(event.target.value)
        }}
      />
      <button
        data-testid="submit-search-btn"
        onClick={() => {
          searchMode === "Name"
            ? searchByName(searchVal)
            : searchById(Number(searchVal))
        }}
      >
        submit
      </button>
    </div>
  )
}

export default SearchBar

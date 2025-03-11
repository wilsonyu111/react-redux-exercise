import { useContext, useState } from "react"
import { SearchMode } from "./SearchSection"
import { store } from "../../app/store"
import { useDispatch } from "react-redux"
import { selectItem } from "../grocery/grocerySlice"


// since there wasn't any description of how the search bar should be implemented
//  I choose to output the item info when if it exists in the redux state
//  otherwise the show compoent will remain empty
const SearchBar = () => {
  // store the user input state
  const [searchVal, setSearchVal] = useState("")

  // take the context variable from parent
  const searchMode = useContext(SearchMode)
  const dispatch = useDispatch()
  // search mode is by default number
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

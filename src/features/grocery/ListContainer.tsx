import { useEffect } from "react"

import { type RootState } from "../../app/store"
import { addItem } from "./grocerySlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import ListInputs from "./ListInputs"
import ListSelection from "./ListSelection"
import ListTable from "./ListTable"
import SearchSection from "../search/SearchSection"

// custom hook
function useCustomHook(groceryList:any ){
  useEffect(() => {
    // fetch data from API (localhost:3001/groceries) and set in redux.
    console.log("groceryList", groceryList)
  }, [groceryList])
}

export const ListContainer: React.FC = () => {
  // ✅ Get groceryList from Redux state
  const groceryList = useAppSelector((state: RootState) => state.grocery.list)

  // ✅ Get dispatch function
  const dispatch = useAppDispatch()

  useCustomHook(groceryList)
  return (
    <section className="groceryApp">
      {/* search bar */}
      <div className="searchBar"><SearchSection/></div>
      <div className="listInputs">
        <ListInputs addItem={item => dispatch(addItem(item))} />
      </div>
      <div className="types">
        <ListSelection />
        <ListTable />
      </div>
    </section>
  )
}

export default ListContainer

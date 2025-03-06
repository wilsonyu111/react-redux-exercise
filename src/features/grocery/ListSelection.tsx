import { RootState } from "@reduxjs/toolkit/query"
import { useDispatch, useSelector } from "react-redux"
import { deselectItem, removeItem, selectItem } from "./grocerySlice"
import Table from "react-bootstrap/Table"
import React, { useEffect } from "react"

interface Item {
  id: number
  name: string
  category: string
  deliveryMethod: string
}

interface ItemRowProps {
  item: Item
}

export const ShowDiv = ({name, val}: any) => {
    return (<div className="list-view-section">
        <div style={{width:"90px", textAlign:"right", paddingRight:"10px"}}>{name}:</div> <div data-testid="table-row-select-val">{val}</div>
    </div>)
  }

export const ListView: React.FC<ItemRowProps> = ({ item }) => {

  if (item === undefined || item === null || item.id === 0) {
    return <div data-testid="table-row-select-empty-val"></div>
  } else {
    return (
      <div>
        <ShowDiv name={"id"} val={item.id}/>
        <ShowDiv name={"name"} val={item.name}/>
        <ShowDiv name={"category"} val={item.category}/>
        <ShowDiv name={"delivery"} val={item.deliveryMethod}/>
      </div>
    )
  }
}

const ListSelection = () => {
  const item = useSelector((state: RootState) => state.grocery.selectedItem)

  return (
    <div className="list-view">
      <ListView item={item} />
    </div>
  )
}

export default ListSelection

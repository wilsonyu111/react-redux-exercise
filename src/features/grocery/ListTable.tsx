import { RootState } from "@reduxjs/toolkit/query"
import { useDispatch, useSelector } from "react-redux"
import { deselectItem, removeItem, selectItem } from "./grocerySlice"
import Table from "react-bootstrap/Table"
import React from "react"

interface Item {
  id: number
  name: string
  category: string
  deliveryMethod: string
}

interface ItemRowProps {
  item: Item
}

export const ItemRow: React.FC<ItemRowProps> = ({ item }) => {
  const dispatch = useDispatch()
  const { id, name, category, deliveryMethod } = item
  return (
    <tr
      data-testid="table-row-select"
      onClick={() => {
        dispatch(selectItem(id))
      }}
    >
      <td style={{ cursor: "pointer" }}>
        <button
          onClick={() => {
            dispatch(removeItem(id))
          }}
        >
          X
        </button>
      </td>
      <td data-testid="table-row-id">{id}</td>
      <td data-testid="table-row-name">{name}</td>
      <td data-testid="table-row-cat">{category}</td>
      <td data-testid="table-row-del">{deliveryMethod}</td>
    </tr>
  )
}

export const ListTable = () => {
  const lstTable = useSelector((state: RootState) => state.grocery.list)
  const dispatch = useDispatch()

  return (
    <div className="listTable">
      <button
        onClick={() => {
          dispatch(deselectItem())
        }}
      >
        deselect
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>name</th>
            <th>category</th>
            <th>delivery method</th>
          </tr>
        </thead>
        <tbody className="itemTable">
          {lstTable.map((item: any) => {
            return <ItemRow key={item.id} item={item} />
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default ListTable

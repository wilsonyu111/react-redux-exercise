// Define the structure of an item
interface Item {
  id: number
  name: string
  category: string
  deliveryMethod: string
}

// Define props for the component
interface ListInputsProps {
  addItem: (item: Item) => void // addItem must accept an `Item`
}

export const ListInputs: React.FC<ListInputsProps> = ({ addItem }) => {
  const createItem = () => {
    const item: Item = {
      id: 10,
      name: "Roasted Turkey",
      category: "Deli",
      deliveryMethod: "Ground",
    }

    addItem(item)
  }

  return (
    <button className="addItemButton" onClick={createItem}>
      Add Random Item
    </button>
  )
}

export default ListInputs

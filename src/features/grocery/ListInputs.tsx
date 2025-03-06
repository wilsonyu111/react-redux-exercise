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
    let d = new Date()

    const item: Item = {
      // this was hardcoded to 10 but this will cause key issue
      // so I change it to use epoch time
      id: d.getTime(),
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

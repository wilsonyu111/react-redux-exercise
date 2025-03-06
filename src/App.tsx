import "./App.css"
import GroceryList from "./features/grocery/ListContainer"
import logo from "./full-cadent-logo.svg"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="cadent-app-logo" alt="logo" />
        <h2>React Redux App</h2>{" "}
      </header>
      <main className="App-main">
        <GroceryList />
      </main>
    </div>
  )
}

export default App

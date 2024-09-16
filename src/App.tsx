import ListGroup from "./components/ListGroup";

function App() {
  let items = ["New York", "SA", "Seoul"];
  return (
    
    <div>
      <ListGroup items ={items} heading="Cities"/>
    </div>
  );
}
export default App;

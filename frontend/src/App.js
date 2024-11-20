import {useEffect, useState} from "react";
import axios from "axios";

function App()
{

  const [value,setvalue] = useState("");
  const [fruit,setfruit] = useState([]);

  function handlevalue(evt)
  {
    setvalue(evt.target.value)
  }

  function add()
  {
    
    axios.post("http://localhost:5000/addfruit",{newfruit:value})
    setfruit([...fruit,{name:value}])
    setvalue("")
  }
 
  useEffect(function(){
  axios.get("http://localhost:5000/fruitlist").then((data)=>
    {
    setfruit(data.data);
  });
  
  },[]);

  const deleteFruit = (id) =>{
    axios.post(`http://localhost:5000/deletefruit`,{id}).then(()=> {
      setfruit((prevActivities)=>prevActivities.filter((item)=>item._id !== id));
    })
    .catch((err) => {
      console.error("Error deleting fruit:",err);
    });
  };


  return(
  <div className="listes">
     <div className="list">
     <input value={value} onChange={handlevalue} placeholder="Enter Fruit Name"></input>
     <button onClick={add}>Add</button>
      </div>
 <div className="box">
    
     {fruit.map((items) => {
      return( 
      <div key={items._id} className="fruit-item">
        <h1>{items.name}</h1>
        <button onClick={() => deleteFruit(items._id)
        }>Delete</button>
</div>
      )
})}
    
    </div>
    </div>
    
  )
}

export default App
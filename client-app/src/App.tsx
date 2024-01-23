import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>
        {activities.map((activitiy: any) => (
          <List.Item key={activitiy.id}>{activitiy.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;

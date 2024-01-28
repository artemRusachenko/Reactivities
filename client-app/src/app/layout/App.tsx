import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBat";
import ActivitiyDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "./LoadingComponenet";

export default observer(function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent/>;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiyDashboard />
      </Container>
    </>
  );
});
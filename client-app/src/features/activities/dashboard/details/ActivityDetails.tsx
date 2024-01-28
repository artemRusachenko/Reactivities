import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import LoadingComponenet from "../../../../app/layout/LoadingComponenet";

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    openForm,
    cancellSelectedActivity,
  } = activityStore;

  if (!activity) return <LoadingComponenet />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width="2">
          <Button
            onClick={() => openForm(activity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancellSelectedActivity}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

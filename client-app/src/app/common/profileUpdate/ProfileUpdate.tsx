import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import * as Yup from "yup";
import MyTextInput from "../form/MyTextInput";
import MyTextArea from "../form/MyTextArea";
import { Button } from "semantic-ui-react";

interface Props {
  setEditProfileMode: (editMode: boolean) => void;
}

export default observer(function ProfileUpdate({ setEditProfileMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();

  return (
    <Formik
      validationSchema={Yup.object({
        displayName: Yup.string().required("THe display name is required"),
      })}
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={values => {
        updateProfile(values).then(() => {
          setEditProfileMode(false);
        });
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Name" />
          <MyTextArea rows={4} placeholder="Bio" name="bio" />
          <Button
            positive
            type="submit"
            loading={isSubmitting}
            content="Update profile"
            floated="right"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
});

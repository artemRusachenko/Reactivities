import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

interface LoginFormValues {
  email: string;
  password: string;
  error?: string | null;
}

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik<LoginFormValues>
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, {setErrors}) => userStore.login(values).catch(_ => 
      setErrors({error: 'Invalid email or passsword'}))}
    >
      {({ handleSubmit, isSubmitting, errors}) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as='h2' content='Login to Reactivities' color="teal" textAlign="center"/>
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name='error' render={() => 
              errors.error ? (
                <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />):null
              
            }
          />
          <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
        </Form>
      )}
    </Formik>
  );
});

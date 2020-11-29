import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { LOGIN_REQUEST } from '../reducers/translate';
import { Form, TextArea, Button, Icon, Divider } from 'semantic-ui-react';
const Login = () => {
  const dispatch = useDispatch('');
  const responseSuccessGoogle = (response) => {
    console.log(response);

    dispatch({
      type: LOGIN_REQUEST,
      data: {
        id: response.googleId,
        email: response.profileObj.email,
        name: response.profileObj.name,
      },
    });
  };

  const responseFailGoogle = (response) => {
    alert(response);
  };
  return (
    <GoogleLogin
      clientId="939267278265-sdm785tivv8fjkl18b3pvhalhe37i46l.apps.googleusercontent.com"
      buttonText="로그인"
      render={(renderProps) => (
        <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <Icon name="google" /> Login
        </Button>
      )}
      onSuccess={responseSuccessGoogle}
      onFailure={responseFailGoogle}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
};
export default Login;

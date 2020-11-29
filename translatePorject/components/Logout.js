import React, { useCallback, useState, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { LOGOUT_REQUEST } from '../reducers/translate';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import SendMail from './SendMail';
const Logout = () => {
  const dispatch = useDispatch('');
  const { user } = useSelector((state) => state.translate);
  const [clickMail, setclickMail] = useState(false);

  useEffect(() => {
    if (clickMail) {
      return;
    }
  }, [clickMail]);

  const onClickSendMail = useCallback(() => {
    setclickMail((pre) => !pre);
  }, [clickMail]);

  const logoutGoogle = () => {
    // console.log('logout');
    dispatch({ type: LOGOUT_REQUEST, id: user });
  };

  return (
    <>
      <Button circular icon="mail outline" onClick={onClickSendMail} />

      <GoogleLogout
        clientId="939267278265-sdm785tivv8fjkl18b3pvhalhe37i46l.apps.googleusercontent.com"
        buttonText="logout"
        render={(renderProps) => (
          <Button
            circular
            circular
            icon="log out"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          />
        )}
        onLogoutSuccess={logoutGoogle}
      />
      {clickMail && (
        <SendMail
          onClickClosed={onClickSendMail}
          setclickMail={setclickMail}
          clickMail={clickMail}
        />
      )}
    </>
  );
};
export default Logout;

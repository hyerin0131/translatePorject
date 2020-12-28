import React, { useCallback, useState, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { LOGOUT_REQUEST } from '../reducers/translate';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon, Form, Container, Input } from 'semantic-ui-react';

import { SEND_EMAIL_REQUEST } from '../reducers/translate';
import styled from 'styled-components';
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContainForm = styled.div`
  padding: 20px;
  background: #ffffffff;
  display: flex;
  flex: 0.5;
  height: 500px;
  border-radius: 0.28571429rem;
  flex-direction: column;
`;

const SendMail = ({ onClickClosed, setclickMail, clickMail }) => {
  const dispatch = useDispatch('');
  const { sendEmailsuccess } = useSelector((state) => state.translate);

  const onSubmit = useCallback(async () => {
    console.log('submit');
    await dispatch({ type: SEND_EMAIL_REQUEST });

    if (sendEmailsuccess) {
      alert('Message Succeess !');
      setclickMail(false);
      return;
    }

    // console.log(text);
  }, [setclickMail]);

  return (
    <>
      <Overlay>
        <ContainForm>
          <div>
            <Icon
              link
              name="close"
              onClick={onClickClosed}
              style={{ float: 'right' }}
            />
          </div>

          <Form onSubmit={onSubmit}>
            <Form.Field>
              <label>Email</label>
              <Input iconPosition="left" placeholder="Email">
                <Icon name="at" />
                <input />
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Subject</label>
              <input placeholder="Subject here.." />
            </Form.Field>
            <Form.TextArea
              style={{ resize: 'none', height: '200px' }}
              label="Content"
              placeholder="Enter the text here..."
            />
            <Button type="submit">Submit</Button>
          </Form>
        </ContainForm>
      </Overlay>
    </>
  );
};
export default SendMail;

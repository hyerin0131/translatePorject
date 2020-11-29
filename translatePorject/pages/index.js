import React, { useState, useCallback, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import History from '../components/History';
import { TRANSLATE_SIMPLE_REQUEST } from '../reducers/translate';
import { Form, TextArea, Button, Icon, Divider } from 'semantic-ui-react';
import styled, { ThemeProvider } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Login from '../components/Login';
const SimpleCol = styled.div`
  width: 100%;
  padding: 30px;
  height: 100%;
  position: relative;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 50%;
    marin: 0 auto;
  }
`;

const SimpleContainer = styled.div`
  height: 70%;

  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    height: 60%;
    display: block;
  }
`;

const ListContainer = styled.div`
  height: 30%;
  margin-left: 40px;
  margin-right: 40px;
  position: relative;

  @media only screen and (max-width: 768px) {
    padding: 30px;
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const Main = () => {
  const [text, setText] = useState('');
  const [textOut, setTextOut] = useState('');
  const { simple, translateSimplesuccess } = useSelector(
    (state) => state.translate
  );
  const dispatch = useDispatch('');

  useEffect(() => {
    if (translateSimplesuccess) {
      setTextOut(simple[0].Output);
    }
  }, [translateSimplesuccess]);

  const onSubmit = useCallback(() => {
    console.log('submit');
    console.log(text);
    if (text.trim('') === '') {
      alert('내용을 입력하세요');
      return;
    }
    dispatch({ type: TRANSLATE_SIMPLE_REQUEST, data: text });
  }, [text]);
  const onChangeText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );

  const onItemClick = useCallback(
    (Input, Output) => () => {
      setTextOut(Output);
      setText(Input);
    },
    []
  );

  const onClickCopy = useCallback(() => {}, []);

  const onClickRedo = useCallback(() => {
    setText('');
  }, []);
  return (
    <AppLayout>
      <div
        style={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
      >
        <SimpleContainer>
          <SimpleCol>
            <Form style={{ height: '100%' }} onSubmit={onSubmit}>
              <TextArea
                style={{
                  height: '100%',
                  resize: 'none',
                  padding: '11px 46px 11px 11px',
                }}
                placeholder="텍스트를 입력하세요..."
                onChange={onChangeText}
                value={text}
              />

              <Button
                style={{ bottom: '5px', right: '9px', position: 'absolute' }}
                position
                basic
                icon="exchange"
                type="submit"
              ></Button>
            </Form>
            <Button
              style={{ top: '35px', right: '39px', position: 'absolute' }}
              position
              basic
              icon="redo"
              onClick={onClickRedo}
              color="rgba(34,36,38,.15)"
            />
          </SimpleCol>

          <SimpleCol>
            <div
              style={{
                background: '#e0e1e2',
                height: '100%',
                padding: '11px 35px 11px 11px',
                borderRadius: '.28571429rem',
                overflow: 'auto',
              }}
            >
              {textOut}
            </div>

            <CopyToClipboard text={textOut}>
              <Button
                onClick={onClickCopy}
                icon="copy outline"
                style={{
                  bottom: '35px',
                  right: '36.5px',
                  position: 'absolute',

                  Index: 1000,
                }}
              />
            </CopyToClipboard>
          </SimpleCol>
        </SimpleContainer>

        <ListContainer>
          <div> 검색내역</div>
          {/* <Divider /> */}
          <History onItemClick={onItemClick} style={{ overflow: 'scroll' }} />
        </ListContainer>
      </div>
    </AppLayout>
  );
};

export default Main;

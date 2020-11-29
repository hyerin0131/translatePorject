import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { TRANSLATE_TEMPLATE_REQUEST } from '../reducers/translate';
import { Form, TextArea, Button, Icon, Dropdown } from 'semantic-ui-react';
import styled, { createGlobalStyle } from 'styled-components';
import useTextInput from '../hooks/useTextInput';

const SimpleCol = styled.div`
  /* width: 100%; */
  padding: 10px 30px;
  height: 80%;
  position: relative;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 50%;
    marin: 0 auto;
  }
`;

const SimpleContainer = styled.div`
  height: 100%;
  position: relative;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    height: 80%;
    display: block;
  }
`;

// const GlobalStyle = createGlobalStyle`
//   .ui icon right labeled button{
//     background: #ffffffff;
//     border: 1px solid rgba(34, 36, 38, 0.15);
//   }
// `;

const ButtonStyled = styled(Button)`
  background: red;
`;

const Template = () => {
  const [textStart, onChangeStart] = useTextInput('');
  const [textMiddle, onChangeMiddle] = useTextInput('');
  const [textEnd, onChangeEnd] = useTextInput('');

  const [optionSelected, setoptionSelected] = useState('');
  const [textOut, setTextOut] = useState('');
  const { templateTemplatesuccess, template } = useSelector(
    (state) => state.translate
  );
  const dispatch = useDispatch('');

  useEffect(() => {
    if (templateTemplatesuccess) {
      setTextOut(template.Pay.Output);
      console.log(textOut);
    }
  }, [templateTemplatesuccess]);

  const onSubmit = useCallback(() => {
    console.log('submit');
    // console.log(text);
    if (
      textStart.trim('') === '' &&
      textMiddle.trim('') === '' &&
      textEnd.trim('') === ''
    ) {
      alert('내용을 입력하세요');
      return;
    }
    const result = textStart + textMiddle + textEnd;
    dispatch({
      type: TRANSLATE_TEMPLATE_REQUEST,
      data: result,
      value: optionSelected,
    });
  });

  const onClickRedo = useCallback(() => {
    setText('');
  }, []);

  const onChangeOption = useCallback(
    (e, { value }) => {
      setoptionSelected(value);
    },
    [optionSelected]
  );

  const options = [
    { key: 1, text: '결제', value: 1 },
    { key: 2, text: '홍보', value: 2 },
    { key: 3, text: '감사', value: 3 },
    { key: 4, text: '요청', value: 4 },
    { key: 5, text: '안부', value: 5 },
  ];
  return (
    <AppLayout>
      <Dropdown
        onChange={onChangeOption}
        placeholder="선택"
        clearable
        options={options}
        selection
        style={{ marginTop: '10px', marginLeft: '30px' }}
      />
      <div style={{ position: 'fixed', height: '100%', width: '100%' }}>
        <SimpleContainer>
          <SimpleCol style={{ flex: 1.5 }}>
            <Form
              style={{ height: '100%', width: '80%', position: 'relative' }}
              onSubmit={onSubmit}
            >
              <TextArea
                style={{ height: '22%', width: '90%', resize: 'none' }}
                placeholder="텍스트를 입력하세요..."
                onChange={onChangeStart}
                value={textStart}
              />
              <TextArea
                style={{
                  height: '51.5%',
                  resize: 'none',
                  width: '90%',
                  marginTop: '15px',
                }}
                placeholder="텍스트를 입력하세요..."
                onChange={onChangeMiddle}
                value={textMiddle}
              />
              <TextArea
                style={{
                  height: '22%',
                  resize: 'none',
                  width: '90%',
                  marginTop: '15px',
                }}
                placeholder="텍스트를 입력하세요..."
                onChange={onChangeEnd}
                value={textEnd}
              />

              <ButtonStyled
                icon
                labelPosition="right"
                type="submit"
                style={{ right: ' -120px', top: '350px', position: 'absolute' }}
              >
                <Icon name="exchange" />
                변환
              </ButtonStyled>
            </Form>
            {/* <Button
              style={{ top: '35px', right: '39px', position: 'absolute' }}
              position
              basic
              icon="redo"
              onClick={onClickRedo}
              color="rgba(34,36,38,.15)"
            /> */}
          </SimpleCol>

          <SimpleCol style={{ flex: 1 }}>
            <div
              style={{
                background: '#EBEBEB',
                height: '100%',
                padding: '.78571429em 1em',
                borderRadius: '.28571429rem',
                overflow: 'auto',
              }}
            >
              {textOut}
            </div>
            {/* <div
              style={{
                background: '#EBEBEB',
                height: '100%',
                padding: '.78571429em 1em',
                borderRadius: '.28571429rem',
                overflow: 'auto',
              }}
            >
              {textOut}
            </div>
            <Button
              icon="copy outline"
              style={{
                bottom: '35px',
                right: '36.5px',
                position: 'absolute',
                background: '#EBEBEB',
                Index: 1000,
              }}
              onClick={onClickCopy}
            /> */}
          </SimpleCol>
        </SimpleContainer>
      </div>
    </AppLayout>
  );
};

export default Template;

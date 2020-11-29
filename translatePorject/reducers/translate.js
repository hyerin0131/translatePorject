export const init = {
  loginrequest: false,
  loginsuccess: false,
  loginfailure: false,

  logoutrequest: false,
  logoutsuccess: false,
  logoutfailure: false,

  sendEmailrequest: false,
  sendEmailsuccess: false,
  sendEmailfailure: false,

  translateSimplerequest: false,
  translateSimplesuccess: false,
  translateSimplefailure: false,

  translateTemplaterequest: false,
  translateTemplatesuccess: false,
  translateTemplatefailure: false,

  user: null,

  simple: [
    {
      id: 1,
      Input: '안녕',
      Output: '안녕하세요',
    },
    {
      id: 2,
      Input: '바이',
      Output: '바이하세요',
    },
    {
      id: 3,
      Input: '즐거워',
      Output: '즐거우세요',
    },
  ],
  template: {
    Pay: null,
    Promotion: null,
    Thanks: null,
    Request: null,
    Greeting: null,
  },
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILURE = 'SEND_EMAIL_FAILURE';

export const TRANSLATE_SIMPLE_REQUEST = 'TRANSLATE_SIMPLE_REQUEST';
export const TRANSLATE_SIMPLE_SUCCESS = 'TRANSLATE_SIMPLE_SUCCESS';
export const TRANSLATE_SIMPLE_FAILURE = 'TRANSLATE_SIMPLE_FAILURE';

export const TRANSLATE_TEMPLATE_REQUEST = 'TRANSLATE_TEMPLATE_REQUEST';
export const TRANSLATE_TEMPLATE_SUCCESS = 'TRANSLATE_TEMPLATE_SUCCESS';
export const TRANSLATE_TEMPLATE_FAILURE = 'TRANSLATE_TEMPLATE_FAILURE';

export const REMOVE_SIMPLE_REQUEST = 'REMOVE_SIMPLE_REQUEST';
export const REMOVE_SIMPLE_SUCCESS = 'REMOVE_SIMPLE_SUCCESS';
export const REMOVE_SIMPLE_FAILURE = 'REMOVE_SIMPLE_FAILURE';

export const ADD_HISTORY_ = 'ADD_HISTORY';

export default (state = init, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginrequest: true,
        loginsuccess: false,
        loginfailure: false,
      };
    }
    case LOGIN_SUCCESS: {
      //   console.log('loginSucess');
      return {
        ...state,
        loginrequest: false,
        loginsuccess: true,
        loginfailure: true,
        user: action.data,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loginrequest: false,
        loginsuccess: false,
        loginfailure: action.error,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutrequest: true,
        logoutsuccess: false,
        logoutfailure: false,
      };
    }
    case LOGOUT_SUCCESS: {
      console.log('logoutSucess');
      return {
        ...state,
        logoutrequest: false,
        logoutsuccess: true,
        logoutfailure: true,
        user: null,
      };
    }
    case LOGOUT_FAILURE: {
      return {
        ...state,
        logoutrequest: false,
        logoutsuccess: false,
        logoutfailure: action.error,
      };
    }
    case SEND_EMAIL_REQUEST: {
      return {
        ...state,
        sendEmailrequest: true,
        sendEmailsuccess: false,
        sendEmailfailure: false,
      };
    }
    case SEND_EMAIL_SUCCESS: {
      console.log('sendEmailSucess');
      return {
        ...state,
        sendEmailrequest: false,
        sendEmailsuccess: true,
        sendEmailfailure: false,
      };
    }
    case SEND_EMAIL_FAILURE: {
      return {
        ...state,
        sendEmailrequest: false,
        sendEmailsuccess: false,
        sendEmailfailure: action.error,
      };
    }
    case TRANSLATE_SIMPLE_REQUEST: {
      return {
        ...state,
        translateSimplerequest: true,
        translateSimplesuccess: false,
        translateSimplefailure: false,
      };
    }
    case TRANSLATE_SIMPLE_SUCCESS: {
      console.log('translate');
      return {
        ...state,
        translateSimplerequest: false,
        translateSimplesuccess: true,
        translateSimplefailure: false,

        simple: [
          { id: action.id, Input: action.Input, Output: action.Output },
          ...state.simple,
        ],
      };
    }
    case TRANSLATE_SIMPLE_FAILURE: {
      return {
        ...state,
        templaterequest: false,
        templatesuccess: false,
        templatefailure: true,
      };
    }
    case TRANSLATE_TEMPLATE_REQUEST: {
      return {
        ...state,
        templateTemplaterequest: true,
        templateTemplatesuccess: false,
        templateTemplatefailure: false,
      };
    }
    case TRANSLATE_TEMPLATE_SUCCESS: {
      const obj = state.template;
      obj.Pay = { id: action.id, Input: action.Input, Output: action.Output };
      //   console.log(obj.Pay);

      return {
        ...state,
        templateTemplaterequest: false,
        templateTemplatesuccess: true,
        templateTemplatefailure: true,
        template: obj,
      };
    }
    case TRANSLATE_TEMPLATE_FAILURE: {
      return {
        ...state,
        translateTemplaterequest: false,
        translateTemplatesuccess: false,
        translateTemplatefailure: true,
      };
    }

    case REMOVE_SIMPLE_REQUEST: {
      console.log('remove');

      state.simple.shift((v) => v.id != action.id);

      return {
        ...state,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

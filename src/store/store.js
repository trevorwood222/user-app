import { setGlobal } from 'reactn';

const setUpGlobals = () => {
  setGlobal({
    user: (localStorage.user !== undefined) ? localStorage.user : null,

  });
}

export { setUpGlobals };
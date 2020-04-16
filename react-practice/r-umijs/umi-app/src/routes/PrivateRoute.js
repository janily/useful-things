import router from 'umi/router';

export default ({ children, match, route }) => {
  if (!localStorage.username && match.path !== '/login') {
    // 没有登录的情况下，返回到登录页
    router.push('/login');
  }

  if (localStorage.username && match.path === '/login') {
    router.push('/');
  }

  if (route.authority && !route.authority.includes(localStorage.authority)) {
    router.push('/');
  }

  return children;
};

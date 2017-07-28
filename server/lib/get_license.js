import getClient from './get_secure_client';

export default function getUserProvider(server) {
  const callWithRequest = getClient(server).callWithRequest;
  const callWithRequestUncert = getClient(server).callWithRequestUncert;

  server.expose('getUser', (request) => {
    return callWithRequestUncert(request, 'security.getUser')
    .then((response)=>{
      return Promise.resolve({
        username: response.username,
        roles: response.sg_roles,
        permissions: []
      })
    });
  });

  server.expose('getMe', (request) => {
    return callWithRequestUncert(request, 'security.getMe')
    .then((response)=>{
      return Promise.resolve({
        username: response.username,
        roles: response.sg_roles
      })
    });
  });
};

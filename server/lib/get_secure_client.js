import {once} from 'lodash';
import elasticSecurity from './elasticsearch-security';
import fs from 'fs';
import path from 'path';

export default once((server) => {
  let ca = server.config().get('security.adminCa');
  ca.forEach(function(c,index) {
    ca[index] = path.resolve(c);
  });

  const config = Object.assign({
    auth: true,
    plugins: [elasticSecurity],
    clientCrt: path.resolve(server.config().get('security.adminCrt')),
    clientKey: path.resolve(server.config().get('security.adminKey')),
    ca: ca,
    //log: 'trace'
  }, server.config().get('elasticsearch'));
  //console.log(config);
  const cluster = server.plugins.elasticsearch.createCluster('license', config);

  return cluster;

  /*const callWithRequestFactory = server.plugins.elasticsearch.callWithRequestFactory;
  const callWithRequest = callWithRequestFactory(client);
  const callWithRequestUncert = callWithRequestFactory(uncertClient);

  return {client, callWithRequest, callWithRequestUncert};*/
});

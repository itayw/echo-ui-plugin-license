import {
  flow
} from 'lodash';
import Boom from 'boom';
import _ from 'lodash';
import {
  wrapError
} from '../../../lib/errors';
import getClient from '../../../lib/get_secure_client';

export default (server, kbnUrl) => {
  const callWithRequest = getClient(server).callWithRequest;

  server.route({
    method: 'GET',
    path: '/api/license/v1',
    handler(request, reply) {
      return callWithRequest(request, 'security.getLicense', {}).then(reply, flow(wrapError, reply));
    }
  });

  server.route({
    method: 'GET',
    path: '/api/license/v1/{name}',
    handler(request, reply) {
      return callWithRequest(request, 'security.getLicense', {
        name: request.params.name
      }).then(reply, flow(wrapError, reply));
    }
  });

  server.route({
    method: 'POST',
    path: '/api/license/v1',
    handler(request, reply) {
      return callWithRequest(request, 'security.putLicense', {
        name: 'default',
        body: request.payload
      }).then(reply, flow(wrapError, reply));
    }
  });

  server.route({
    method: 'DELETE',
    path: '/api/license/v1/{name}',
    handler(request, reply) {
      return callWithRequest(request, 'security.deleteLicense', {
        name: 'default'
      }).then(reply, flow(wrapError, reply));
    }
  });
};

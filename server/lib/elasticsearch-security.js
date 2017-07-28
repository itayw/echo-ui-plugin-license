(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ElasticsearchSecurity = factory();
  }
}(this, function () {
  return function addSecurityApi(Client, config, components) {
    var ca = components.clientAction.factory;

    Client.prototype.security = components.clientAction.namespaceFactory();
    var security = Client.prototype.security.prototype;

    /**
     * Perform a [security.authenticate](Retrieve details about the currently authenticated user) request
     *
     * @param {Object} params - An object with parameters used to carry out this action
     */

    security.getLicense = ca({
      params: {},
      urls: [{
          fmt: '/searchguard/licenses/<%=name%>',
          req: {
            name: {
              type: 'string',
              required: false
            }
          },
          method: 'GET'
        },
        {
          fmt: '/searchguard/licenses/_search',
          method: 'GET'
        }
      ]
    });
    security.putLicense = ca({
      params: {
        refresh: {
          type: 'boolean'
        }
      },
      url: {
        fmt: '/searchguard/licenses/<%=name%>',
        req: {
          name: {
            type: 'string',
            required: true
          }
        }
      },
      needBody: true,
      method: 'PUT'
    });

    security.deleteLicense = ca({
      params: {
        refresh: {
          type: 'boolean'
        }
      },
      url: {
        fmt: '/searchguard/licenses/<%=name%>',
        req: {
          name: {
            type: 'string',
            required: true
          }
        }
      },
      method: 'DELETE'
    });
  };
}));

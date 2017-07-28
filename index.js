import initLicenseApi from './server/routes/api/v1/license';

module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'license',
    require: [],
    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true)
      }).default()
    },
    uiExports: {
      managementSections: [
        'plugins/license/management'
      ]
    },
    init: function (server) {
      var config = server.config();
      initLicenseApi(server);
    }
  });
};

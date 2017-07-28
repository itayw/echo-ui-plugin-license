import { management } from 'ui/management';
import 'plugins/license/management/license'

define(function (require) {
  management.getSection('stack').register('license', {
    display: 'License',
    order: 10,
    url: '#/management/license/license'
  });
});

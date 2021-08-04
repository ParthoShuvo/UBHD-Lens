var ContainerPanel = require('lens/reader/panels/container_panel');

module.exports = new ContainerPanel({
  type: 'resource',
  name: 'info',
  container: 'info',
  title: 'Info',
  icon: 'fa-info',
  references: ['contributor_reference'],
});
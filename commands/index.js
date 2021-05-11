module.exports = {
  //pibot commands
  status: require('./pihole/status'),
  enable: require('./pihole/enable'),
  disable: require('./pihole/disable'),
  recent: require('./pihole/recent')
};
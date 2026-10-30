'use strict';

hexo.extend.generator.register('empty-index', function (locals) {
  if (locals.posts.length) return;

  const config = this.config;

  function trimDir(value) {
    let dir = String(value || '');
    while (dir.charAt(0) === '/') dir = dir.slice(1);
    while (dir.slice(-1) === '/') dir = dir.slice(0, -1);
    return dir;
  }

  const indexPath = trimDir(config.index_generator && config.index_generator.path);
  const archiveDir = trimDir(config.archive_dir || 'archives');
  const baseData = {
    posts: locals.posts,
    current: 1,
    total: 1,
    prev: 0,
    next: 0,
  };

  return [
    {
      path: (indexPath ? indexPath + '/' : '') + 'index.html',
      layout: ['index'],
      data: Object.assign({}, baseData, { __index: true }),
    },
    {
      path: (archiveDir ? archiveDir + '/' : '') + 'index.html',
      layout: ['archive'],
      data: Object.assign({}, baseData),
    },
  ];
});

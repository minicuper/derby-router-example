var derby = require('derby');

var app = module.exports = derby.createApp('app', __filename);

if (!derby.util.isProduction) global.app = app;

var serverRoutes = derby.util.serverRequire(module, './server') || {};

app.use(require('derby-router'), {
  baseUrl: 'http://localhost:3000'
});

app.serverUse(module,'derby-jade');
app.serverUse(module, 'derby-stylus');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.get('/', ['items']);
app.get('item', '/item/:name+/:id', ['item']);
//app.get('second', ['second_1']);

app.serverGet('main', '/main', serverRoutes.main);
app.serverPost('mainPost', '/main', serverRoutes.mainPost);

app.module('item', {
  load: function(){
    this.item = this.model.at('items.'+this.params.item);
    this.subscriptions.push(this.item);
  },
  setup: function(){
    this.model.ref('_page.item', this.item);
  }
});

app.module('items', {
  load: function(){
    this.items = this.model.query('items', {});
    this.subscriptions.push(this.items);
  },
  setup: function(){
    this.model.ref('_page.items', this.items);
  }
});

app.module('first_1', {
  load: function(){
    this.items2 = this.model.at('items2');
    this.subscriptions.push(this.items2);
  },
  setup: function(){
    this.model.ref('_page.items2', this.items2);
  }
});

app.module('second_1', {
  load: function(items, first_1){
    console.log('second', arguments);
  },
  setup: function(){
  }
});

//console.log('routes', Object.keys(app._router.routes));


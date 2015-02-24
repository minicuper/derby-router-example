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
app.get('second', function(){
  console.log('redirect');
  this.redirect('home');
});

app.route('api', 'http://gmail.com/:item?');

app.serverGet('main', '/main', serverRoutes.main, serverRoutes.mainPost);
app.serverPost('mainPost', '/main', serverRoutes.mainPost);

app.module('item', {
  load: function(){
    this.item = this.model.at('items.'+this.params.item);
    this.addFetches(this.item, 'items');
  },
  setup: function(){
    this.model.ref('_page.item', this.item);
  }
});

app.module('items', {
  load: function(){
    this.items = this.model.query('items', {});
    this.addFetches(this.items);
  },
  setup: function(){
    this.model.ref('_page.items', this.items);
  }
});

app.module('first_1', {
  load: function(){
    this.moduleName = "first_1";
    this.items2 = this.model.at('items2');
    this.addSubscriptions(this.items2);
  },
  setup: function(){
    this.model.ref('_page.items2', this.items2);
  }
});

app.module('second_1', {
  load: ['items','first_1', function(items, first_1){
    console.log('second', arguments);
  }],
  setup: function(){
  }
});

console.log('routes', Object.keys(app.Router.routes));


var derby = require('derby');

var app = module.exports = derby.createApp('app', __filename);

if (!derby.util.isProduction) global.app = app;

app.use(require('derby-router'));

app.serverUse(module,'derby-jade');
app.serverUse(module, 'derby-stylus');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.route('/', ['items']);
app.route('item', '/item/:item', ['item']);

app.route('second', ['second_1']);



app.module('item', {
  load: function(){
    this.item = this.model.at('items.'+this.params.item);
    this._subscriptions.push(this.item);
  },
  setup: function(){
    this.model.ref('_page.item', this.item);
  }
});


app.module('items', {
  load: function(){
    this.items = this.model.query('items', {});
    this._subscriptions.push(this.items);
  },
  setup: function(){
    this.model.ref('_page.items', this.items);
  }
});

app.module('first_1', {
  load: function(){
    this.items2 = this.model.at('items2');
    this._subscriptions.push(this.items2);
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

console.log('routes', Object.keys(app._router.routes));


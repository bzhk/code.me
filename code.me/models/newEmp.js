var keystone = require('keystone');
var Types = keystone.Field.Types;

var newEmp = new keystone.List('newEmp',{
  map:{name:'post_slug'}
 });
  newEmp.add({
    post_slug:{ type: String},
    post_id:{type: String},
    user_slug:{type:String},
    user_id:{type: String},
    nick:{ type: String},
    email:{ type: String}
    
});
newEmp.defaultColumns = 'post_slug, nick|20%, email|20%';

newEmp.register();

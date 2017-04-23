var keystone = require('keystone');
var Types = keystone.Field.Types;

var expForEmp = new keystone.List('expForEmp',{
  map:{name:'_id'}
 });
  expForEmp.add({
    post_slug:{ type: String},
    post_id:{type: String},
    user_slug:{type:String},
    exp: {type: String},
    date: {type: Types.Datetime}

});
expForEmp.defaultColumns = 'post_slug, nick|20%, email|20%';

expForEmp.register();

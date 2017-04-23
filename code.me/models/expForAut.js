var keystone = require('keystone');
var Types = keystone.Field.Types;

var expForAut = new keystone.List('expForAut',{
  map:{name:'_id'}
 });
  expForAut.add({
    post_slug:{ type: String},
    post_id:{type: String},
    aut_slug:{type:String},
    exp: {type: String},
    emps: {type: Types.TextArray},
    date: {type: Types.Datetime}

});
expForAut.defaultColumns = 'post_slug, nick|20%, email|20%';

expForAut.register();

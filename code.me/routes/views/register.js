const keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req,res){

  if(req.user){
    return res.redirect("/");
  }
  var view = new keystone.View(req, res);

  var locals = res.locals;
  locals.section = "rejestracja";
  locals.form = req.body;

  view.on("post", function(next){
      var data = locals.form;
      var errors = [];
    async.series([
      function(done){
        if(!data.nick){
          errors.push("Brak nazwy użytkownika");
        }
        if(!data.email){
          errors.push("Brak adresu e-mail");
        }
        if(data.email && !keystone.utils.isEmail(data.email)){
          errors.push("Podano błędny adres e-mial");
        }
        if(data.email !== data.emailRep){
          errors.push("Adresy e-mail różnią się");
        }
        if(!data.firstname){
          errors.push("Brak imienia");
        }
        if(!data.lastname){
          errors.push("Brak nazwiska");
        }
        if(!data.password){
          errors.push("Brak hasła");
        }
        if(data.password && data.password !== data.passwordRep){
          errors.push("Hasła róznią się");
        }
        if(!data.agr){
          errors.push("Musisz zaakceptować regulamin Code.me");
        }
        errors.forEach(function(err){
          req.flash("error",err);
        })
        if(errors.length){
          return done(true);
        }

        done();
      },
      function(done){
         keystone.list("User").model.findOne({
              nick: data.nick
          }, function(err, user) {

              if(err || user) {
                  req.flash("error", "Taki użytkownik już istnieje.");
                  return done(true);
              }

              done();

          });
        },
      function(done){
         keystone.list("User").model.findOne({
              email: data.email
          }, function(err, user) {

              if(err || user) {
                  req.flash("error", "Użytkownik z takim adresem e-mail już istnieje.");
                  return done(true);
              }

              done();

          });
        },
      function(done){
        var userData={
          email: data.email,
          nick: data.nick,
          name:{
            first: data.firstname,
            last: data.lastname
          },
          password: data.password,
          agr: data.agr
        };
        var User = keystone.list("User").model,
            user = new User(userData);

          user.save(function(err){
            done(err);
          });

      }
    ],function(err){
      if(err){
        return next();
      }
      req.flash("success", "Zostałeś zarejestrowany. Sprawdz skrzynkę pocztową i potwierdź adres e-mail.");
      res.redirect("/");

    });

  });

  view.render("register")
}

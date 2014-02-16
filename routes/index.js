/*
 * GET home page.
 */

exports.discos = function(db){
    return function(req,res){
        var collection = db.get('discos');

        collection.find({}, function (err, docs){
                console.log(err,docs.length+' results')
                if(err==null){
                    res.json(docs);
                }else{
                    res.send("error");
                }
            }
        );
    }
}
exports.insertDisco = function(db){
    return function(req, res){
        var collection = db.get('discos');
        var newdata = req.param('data');
        console.log(newdata);
        if(newdata._id==''){
            console.log('insert');
            //INSERT
            newdata._id = null
            newdata.image = null;
            newdata.vip=[];
            console.log(newdata);
            collection.insert({name:newdata.name, email:newdata.email, vip:newdata.vip}, function(err, inserted){
                res.json(inserted);
            });
        }else{
            console.log('update');
            //UPDATE
            collection.update({_id:newdata._id}, newdata, function(err, inserted){
                res.json(inserted);
            });

        }
        
        
        /*
        temp_ob = new Disco(req.param('data'));
        collection.save(function(error, Disco){
            console.log(Disco);

            res.json(ob);
        });
        */
        //console.log(req.param('data'));
    }
}
exports.updateDisco = function(db){

}
exports.imageUpload = function(fs){
    return function(req, res){     
        //res.send('true');
        fs.readFile(req.files.files[0].path, function (err, imageData) {
            if(err)console.log(err);
            ext = req.files.files[0].name.substr(-3);

            var newPath = "./public/uploads/"+req.body.type+"/"+req.body.id+"."+ext;
           
            fs.writeFile(newPath, imageData, function (err) {
                if(err){console.log(err)}else{res.send(newPath)};
            });
            
        });
        
    }
}
exports.login = function(db){
    return function(req, res){
      res.render('index', { title: 'Noches-Bcn' });
    };
}
exports.formLogin = function(db){
    return function(req,res){
        var user = req.body.username;
        var password = req.body.password;
        var collection = db.get('users');

        collection.find({"username":user, "password":password}, 
            function (err, docs){
                if(err==null && docs.length==1){
                    //res.location("main");
                    res.redirect('main');
                }else{
                    res.send("Invalid login");
                }
            }
        );
    }
}
exports.main = function(req, res){
    res.sendfile('./views/main.html');
}
/*
exports.fiestas = function(db){
    return function(req,res){
        var collection = db.get('discos');

        collection.find({}, function (err, docs){
                console.log(err,docs.length+' results')
                if(err==null){
                    res.json(docs);
                }else{
                    res.send("error");
                }
            }
        );
    }
}
*/
/*

exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};


exports.newuser = function(req, res){
  res.render('newuser', { title: 'Add New User' });
};
exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var password = req.body.password;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "user" : userName,
            "password" : password
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
}
*/
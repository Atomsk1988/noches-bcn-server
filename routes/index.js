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
exports.parties = function(db){
    return function(req,res){
        var collection = db.get('fiestas');

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
exports.insertParty = function(db){
    return function(req, res){
        var collection = db.get('fiestas');
        var newdata = req.param('data');
        console.log(newdata);
        if(newdata._id==''){
            console.log('insert');
            //INSERT
            newdata._id = null
            newdata.prices=[];
            console.log(newdata);
            collection.insert({disco_id:newdata.disco_id, name:newdata.name, prices:newdata.prices}, function(err, inserted){
                res.json(inserted);
            });
        }else{
            console.log('update');
            //UPDATE
            collection.update({_id:newdata._id,name:''}, newdata, function(err, inserted){
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
exports.deleteDisco = function(db){
    return function(req,res){

        //TENEMOS QUE SACAR LA URL DEL PATH A Lo path/:id
        var collection = db.get('discos');
        var data = req.params.id;
        //var result = collection.find({_id:data.substr(1)});
        collection.remove({_id:data.substr(1)});
        res.send('true');
    }
}
exports.deleteParty = function(db){
    return function(req,res){

        //TENEMOS QUE SACAR LA URL DEL PATH A Lo path/:id
        var collection = db.get('parties');
        var data = req.params.id;
        //var result = collection.find({_id:data.substr(1)});
        collection.remove({_id:data.substr(1)});
        res.send('true');
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

var NetprojService = require('../models/services/netproj');
var util = require('util');

module.exports = function (app) {

    app.get('/netproj', checkLogin , function (req, res) {
        //取出所有engprojs
        NetprojService.getAll(function (err, netprojs) {
            if (err) {
                netprojs = [];
            }
            res.render('netproj', {
                title: '网络部项目管理',
                user: req.session.user,
                netprojs: netprojs,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    ////删除项目
    //app.delete('/engineeringproj', checkLogin , function (req, res) {
    //    var idsToDelete = req.body;
    //    console.log("ids:");
    //    console.log(idsToDelete);
    //    EngprojService.deleteById(idsToDelete,function(err,nRemoved){
    //        if(err){
    //            console.log(err);
    //            req.flash('error', err);
    //            return res.send({success:false});
    //        }
    //        console.log("nr: ");
    //        console.log(nRemoved);
    //        return res.send({success:true});
    //    });
    //});
    //
    ////保存项目
    //app.post('/engineeringproj/save',checkLogin,function(req,res){
    //    var proj = req.body.proj;
    //    EngprojService.save(proj,function (err, proj) {
    //        if (err) {
    //            return res.send({
    //                success:false,
    //                msg:"数据存储出错"
    //            });
    //        }
    //        return res.send({
    //            success:true
    //        });
    //    });
    //});
    //
    ////获取项目信息
    //app.post('/engineeringproj/getById',checkLogin,function(req,res){
    //    var id = req.body.id;
    //    EngprojService.getById(id,function(err,engproj){
    //        if(err){
    //            console.log(err);
    //            req.flash('error', err);
    //            res.send({engproj:null});
    //        }
    //        return res.send(engproj);
    //    });
    //});
    //
    ////编辑项目信息
    //app.post('/engineeringproj/edit',checkLogin,function(req,res){
    //    var proj = req.body.proj;
    //    EngprojService.updateOne(proj,function (err, nUpdated) {
    //        if (err) {
    //            return res.send({
    //                success:false
    //            });
    //        }
    //        return res.send({
    //            success:true
    //        });
    //    });
    //});

    function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '已登出!');
            res.redirect('/login');
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录!');
            res.redirect('back');
        }
        next();
    }
};
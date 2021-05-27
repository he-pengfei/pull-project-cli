#!/usr/bin/env node
const program = require('commander');
const download = require('download-git-repo');
const init = require('./init');
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
program.version('1.0.0', '-v', '--version')
    .command('init <name>')
    .action((name) => {
        const dirPath = path.resolve(process.cwd(), `./${name}`);
        fs.mkdir(dirPath, async (err) => {
            const result = await init(name);
            const { platform, account, password,address } = result;
            if (platform[0] === 'git') {
                const add = address.split("//");
                if(add){
                    const dict = ['https:','http:','ws:','wss:'];
                    if(dict.indexOf(add[0])<0) throw new Error('project address error');
                    exec(`git clone ${add[0]+'//'+account+":"+password+''+"@"+add[1]} ${dirPath}`, (err, stdout, stderr) => {
                        if (err) {
                            console.log(err);
                            process.exit();
                        }
                        process.exit();
                    })
                }else{
                    throw new Error('address error');
                }
            } else {
                exec(`svn checkout ${address} ${dirPath} --username ${account} --password ${password}`, (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        process.exit();
                    }
                    process.exit();
                })
            }

        })
        //    download('http://127.0.0.1:5500/index.html',name,{clone:true},(err)=>{
        //        console.log(err);
        //    })
    });
program.parse(process.argv);       
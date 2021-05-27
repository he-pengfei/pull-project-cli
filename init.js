const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const prompt = [
    {
    type: 'checkbox',
    message: 'choice platform',
    name:'platform',
    choices:[{
        name:'git',
        checked:true
    },
    {
        name:'svn',
    }],
},
{
    type: 'input',
    message: 'project address',
    name:'address',
    validate:(val)=>{
        if(!val)return 'please enter the project address';
        return true; 
    }
},
{
    type: 'input',
    message: 'platform account',
    name:'account',
    validate:(val)=>{
        if(!val)return 'please enter the platform account';
        return true; 
    }
},{
    type: 'password',
    message: 'platform password',
    name:'password',
    validate:(val)=>{
        if(!val)return 'please enter the platform password';
        return true; 
    }
}]
module.exports = function (name) {
    console.log(chalk.blueBright('pull-project-cli v1.0.0'));
    return new Promise((resolve,reject)=>{
        inquirer.prompt(prompt).then(answer => {
            resolve(answer)
        }).catch(err=>{
            reject(err)
        })
    })
}
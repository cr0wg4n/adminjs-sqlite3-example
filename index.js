import { Sequelize } from 'sequelize';
import AdminJSSequelize from '@adminjs/sequelize';
import AdminJSExpress from '@adminjs/express';
import models from './models/index.js';
import express from 'express';
import AdminJS from 'adminjs';


const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: './db/database.sqlite'
});

const { User, Post } = models(sequelize);

const setModels = async () => {
    await User.sync();
    await Post.sync();
    // await User.sync({force:true});
};

await sequelize.authenticate();
await setModels();


const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
});

const users = await User.findAll();

const app = express()

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
    databases: [sequelize],
    resources:[User],
    rootPath: '/admin',
})

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs,{
    authenticate: async(email,password)=>{
        if (email == 'test@test.com' && password==='testtesttest') {
            return true;
        }
        return false;
    },
    cookiePassword: 'some-random-string',
    cookieName:'rid'
})

app.use(adminJs.options.rootPath, router)

app.listen(8080, () => console.log('AdminJS is under http://localhost:8080/admin'))
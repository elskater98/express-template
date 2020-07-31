const request = require('supertest');
const app = require('../app');
const User = require('../schemas/user')

/* |---------------------------------------------------------------------------|
   | PAY ATTENTION using the test, because it use development (devel) database |
   |---------------------------------------------------------------------------|*/

describe('Users', function() {
    let token = "";

    beforeAll(async ()=>{
        const response = await request(app)
            .get("/auth")
            .expect(200)
            .query({email:"admin@admin.com",password:"password"});
        token = response.body.token
    });

    afterEach(async()=>{
        await User.deleteOne({"email":"admin1@gmail.com"});
    })

    it('responds a json with token and relevant information about user.', function() {
        return request(app)
            .get("/auth")
            .expect(200)
            .query({email:"admin@admin.com",password:"password"})
            .then(response => {
              expect(response.statusCode).toBe(200);
              expect(response.body.first_name).toBe("Admin");
              expect(response.body.last_name).toBe("Node Template");
              expect(response.body.email).toBe("admin@admin.com");
              expect(response.body.roles.toString()).toBe(["Administrator"].toString());
            })
    });

    it('responds a json with all users', async (done) => {
        return request(app)
            .get("/user")
            .query({token:token})
            .expect(200)
            .then(async (response) => {
                const num_users = await User.find({});
                expect(response.body.users.length).toBe(num_users.length);
                done();
            })
    });

    it('responds a json with user information', async (done) =>  {
        return request(app)
            .get("/user/"+"admin@admin.com")
            .query({token:token})
            .expect(200)
            .then(async (response) => {
                let user = response.body.user;
                expect(user.first_name).toBe("Admin");
                expect(user.last_name).toBe("Node Template");
                expect(user.email).toBe("admin@admin.com");
                done();
            })
    });

    it('create a new user', async (done) =>  {
        return request(app)
            .post("/user")
            .query({token:token})
            .expect(201)
            .send({
                "email":"admin1@gmail.com",
                "first_name":"Admin2",
                "last_name":"Admin2",
                "password":"password",
                "roles":["Administrator"]
            }).then(async ()=>{
                const user = await User.findOne({"email":"admin1@gmail.com"},{password:0,__v:0,createdAt:0,_id:0});
                expect("admin1@gmail.com").toBe(user.email);
                expect("Admin2").toBe(user.first_name);
                expect("Admin2").toBe(user.last_name);
                done();
            })
    });

    it('delete a user', async (done) =>  {
        let email = "admin1@gmail.com";
        const user = new User({
            "email":email,
            "first_name":"Admin2",
            "last_name":"Admin2",
            "password":"password",
            "roles":["Administrator"]
        });
        user.save();

        return request(app)
            .delete("/user/"+email)
            .query({token:token})
            .expect(200).then(async()=>{
                expect(await User.findOne({email:email})).toBeNull();
                done();
            })
    });

    it('edit a user', async (done) =>  {
        let email = "admin1@gmail.com";
        const user = new User({
            "email":email,
            "first_name":"Admin2",
            "last_name":"Admin2",
            "password":"password",
            "roles":["Administrator"]
        });
        user.save();

        return request(app)
            .patch("/user/"+email)
            .query({token:token})
            .send({first_name:"Juan",
                    last_name:"Manolo"})
            .expect(200).then(async ()=>{
                let user = await User.findOne({email:email});
                expect("Juan").toBe(user.first_name);
                expect("Manolo").toBe(user.last_name);
                done();
            })
    });
});


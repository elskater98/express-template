const request = require('supertest');
const app = require('../app');
const User = require('../schemas/user')


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

    it('responds a json with all users', function() {
        return request(app)
            .get("/user")
            .query({token:token})
            .expect(200)
            .then(async (response) => {
                const num_users = await User.find({});
                expect(response.body.users.length).toBe(num_users.length);
            })
    });

    it('create a new user', function() {
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
            })
    });
    // TODO: Finish edit user , delete user and  reset password.
    it('edit a user', function() {

        const user = new User({
            "email":"admin1@gmail.com",
            "first_name":"Admin2",
            "last_name":"Admin2",
            "password":"password",
            "roles":["Administrator"]
        });
        user.save();

        return request(app)
            .patch("/user")
            .query({token:token})
            .expect(200)
            .send({
                "first_name":"Admin26",
                "last_name":"Admin4",
            })
    });
});


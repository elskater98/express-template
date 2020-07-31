db = db.getSiblingDB('prod');
db.createUser({
    user: 'db',
    pwd: 'password',
    roles: [
        {
            role: 'readWrite',
            db: 'prod'
        }
    ]
});

db = db.getSiblingDB('devel');
db.createUser({
    user: 'db',
    pwd: 'password',
    roles: [
        {
            role: 'readWrite',
            db: 'devel'
        }
    ]
});

import { Client } from '../../../utils/db';
import { hash } from 'bcryptjs';

export default async function signup(req, res){
    if (req.method === 'POST') {
        //Getting email and password from body
        const { firstname, lastname, email, phone, password } = req.body;
        //Validate
        if (!email || !email.includes('@') || !password) {
            res.status(422).send({ message: 'Invalid Data' });
            return;
        }
        //Connect with database
        const db = (await Client.connect()).db('dubois-admin');
        
        //Check existing
        const checkExisting = await db
            .collection('admin-users')
            .findOne({ email: email });
        //Send error response if duplicate user is found
        if (checkExisting) {
            res.status(422).send({ message: 'User already exists' });
            Client.close();
            return;
        }
        //Hash password
        const status = await db.collection('admin-users').insertOne({
            firstname,
            lastname,
            email,
            phone,
            password: await hash(password, 12),
            isAdmin: false,
            isSuperAdmin: false
        });
        //Send success response
        res.status(200).send({ message: 'User created', ...status });
        //Close DB connection
        Client.close();
    } else {
        //Response for other than POST method
        res.status(500).send({ message: 'Route not valid' });
    }
}
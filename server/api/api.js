import express from 'express';
import User from '../Schema/User.js';
import Medicine from '../Schema/Medicine.js';

const router = express.Router();

router.post('/Signup', async (req, res, next) => {
    try {
        const exist = await User.findOne({ username: req.body.username });
        if (exist) {
            return res.status(401).json('Username already exists');
        } 
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            return res.status(200).json(`${req.body.username} login successful`);
        } else {
            return res.status(401).json('Invalid login');
        }
    } catch (error) {
        next(error);
    }
});

router.post('/medicine/update', async (req, res, next) => {
    try {
        const exist = await Medicine.findOne({ username: req.body.username, name: req.body.name });
        if (exist) {
            await Medicine.updateOne({ "_id": exist._id }, { $set: { quantity: req.body.quantity } });
            console.log("Data updated successfully");
        } else {
            await Medicine.create(req.body);
            console.log("Data created successfully");
        }
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.post('/medicine/delete', async (req, res, next) => {
    try {
        await Medicine.findOneAndDelete({ name: req.body.name, username: req.body.username });
        console.log("Data deleted successfully");
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.post('/medicine/add', async (req, res, next) => {
    try {
        const exist = await Medicine.findOne({ username: req.body.username, name: req.body.name });
        if (exist) {
            await Medicine.updateOne({ "_id": exist._id }, { $set: { quantity: req.body.quantity } });
            console.log("Data updated successfully");
        } else {
            await Medicine.create(req.body);
            console.log("Data created successfully");
        }
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.get('/medicine/search', async (req, res, next) => {
    try {
        const exist = await Medicine.find(req.query);
        if (exist.length > 0) {
            return res.json(exist);
        } else {
            return res.status(404).json('Medicine not found');
        }
    } catch (error) {
        next(error);
    }
});

router.get('/medicine', async (req, res, next) => {
    try {
        const medicine = await Medicine.find({});
        res.json(medicine);
    } catch (error) {
        next(error);
    }
});

router.get('/user/search', async (req, res, next) => {
    try {
        const exist = await User.find(req.query);
        if (exist.length > 0) {
            return res.json(exist);
        } else {
            return res.status(404).json('User not found');
        }
    } catch (error) {
        next(error);
    }
});

export default router;

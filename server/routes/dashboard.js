//Backend for dashboard page
import express from "express";
import db from "../db/connection.js"
import { ObjectId } from "mongodb";

const router = express.Router();

const userId = "user1" //Currently hardcoded will change later

//biomarker section for API calls refering to biomarkers
router.get('/biomarker', async (req, res) => {
    try {
        const collection = db.collection('biomarker');
        const results = await collection.find({}).toArray();
        res.json(results);
    } catch (err) {
        console.error('error:', err)
        res.status(500).json({ error: err.message });
    }
});

//Progress section
router.get('/progress', async (req, res) => {
    try {
        const results = await db.collection('progress').find({userId}).toArray();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//achievement section 
router.get('/achievement', async (req, res) => {
    try {
        const results = await db.collection('achievement').find({userId}).toArray();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//notification section 
//Updating read on database
router.patch('/notifications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.collection('notifications').updateOne(
            { _id: new ObjectId(id) },
            { $set: { read: true } }
        );
        res.json(result);
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: err.message });
    }
});
//retrieveing notifications
router.get('/notifications', async (req, res) => {
    try {
        const collection = db.collection('notifications');
        const results = await collection.find({}).toArray();
        res.json(results);
    } catch (err) {
        console.error('error:', err)
        res.status(500).json({ error: err.message });
    }
});

export default router;
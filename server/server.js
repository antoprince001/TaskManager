require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const db = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // To read post requests
app.use(express.urlencoded({ extended: true }));


/**  Create Operation */
app.post('/create',async (req,res)=>{
    try{
        const results = await db.query("INSERT INTO list (name,completed) values($1,$2) returning *", [req.body.name, false]);
        res.status(200).json({
            status : "Success",
        });
        }
        catch(err){
            console.log(err);
            res.status(400).json({
                error : err
            });
        };
});

/**  Read Operation */
app.get('/',async (req,res)=>{

    try{
        const results = await db.query("select * from list");

        res.status(200).json({
            status : "Success",
            results : results.rowCount,
            data : {
                list : results.rows,
            }
        });
        }
        catch(err){
            res.status(400).json({
                error : err
            });
        };

});

/* Update a restaurant */
app.put("/update", async (req,res)=>{

    try{
        const results = await db.query("UPDATE list SET completed = $1  where name = $2 returning *", [!req.body.completed,req.body.name]);
        res.status(200).json({
            status : "Success",
            results : results.rowCount,
            data : {
                restaurants : results.rows[0]
            }
        });
        }
        catch(err){
            res.status(400).json({
                error : err
            });
        };
    
});

/* Delete a restaurant */
app.post("/delete", async (req,res)=>{
    console.log(req.body.name);
    try{
        const results = await db.query("DELETE FROM list  where name = $1", [req.body.name]);
        res.status(200).json({
            status : "Success",
        });
        }
        catch(err){
            res.status(400).json({
                error : err
            });
        };
});

app.listen(5000,()=>{
    console.log(`Server Started on port 5000`);
});
const express=require('express');
const app=express();
const cors=require('cors');
const dotenv = require("dotenv");
const db=require('./db');
const authRouter=require('./routers/authRoutes');
const employeeRouter=require('./routers/employeeRoutes');
let origin = 'http://localhost:3000';
dotenv.config("./.env");
console.log('here env', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production') {
    origin = process.env.CLIENT_ORIGIN;
}
app.use(
    cors({
        credentials: true,
        origin
    })
);

app.use('/auth', authRouter);
app.use('/api', employeeRouter);

const PORT = process.env.PORT || 4001;

db();
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

import express from 'express';
import defendjs from './middleware/index';


const app = express();


app.use(express.json());
//add the middleware library
app.use(defendjs);

app.get('/', (req, res) =>{
    res.send(
        'Defend Js to the Rescue'
    );
}
)

app.listen(3000, ()=>{
    console.log('server is running on 3000');
})
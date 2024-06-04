const express = require('express')
const app = express();

app.use(express.json());

//add the middleware library
app.use( );

app.get('/', (req, res) =>{
    res.send(
        'Shield Js to the Rescue'
    );
}
)

app.listen(3000, ()=>{
    console.log('server is running on 3000');
})
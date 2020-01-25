require('dotenv').config();

const app = require('./config/app');

//Server listennig
app.listen(app.get('port'), () => {
    console.log('Server On: ', app.get('port'))
});
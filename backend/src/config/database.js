const mongoose = require('mongoose');

URI = process.env.URI || 'mongodb://localhost/meseros';

mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(db => console.log('DB Connected'))
  .catch(err => console.log(err));
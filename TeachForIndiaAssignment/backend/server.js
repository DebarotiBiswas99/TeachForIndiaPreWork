const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB Atlas connection string (replace <username>, <password>, and <cluster_name> with your credentials)
const dbUri = 'mongodb+srv://debarotibiswas1999:tp2v8sA5cRrmvXpG@mycluster.jesrgy5.mongodb.net/?retryWrites=true&w=majority';

// Enable Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

// Create a user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  weekdays: [String],
  languages: [String]
});

const User = mongoose.model('User', userSchema);

// Handle POST request to store user data
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, location, weekdays, languages } = req.body;
    const weekdaysArray = weekdays.split(',').map(day => day.trim());
    const languagesArray = languages.split(',').map(lang => lang.trim());
    const user = new User({ name, email, phone, location, weekdays: weekdaysArray, languages: languagesArray });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user. Please try again later.' });
  }
});

// Route to fetch all registered users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Create a classroom schema and model
const classroomSchema = new mongoose.Schema({
  classroomID: { type: String, required: true },
  capacity: { type: Number, required: true },
  requirement: { type: Number, required: true },
  subjects: [String],
  languageRequirement: [String],
  location: { type: String, required: true },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Classroom = mongoose.model('Classroom', classroomSchema);

// Route to fetch all classrooms
// app.get('/api/classrooms', async (req, res) => {
//   try {
//     const classrooms = await Classroom.find();
//     res.json(classrooms);
//   } catch (error) {
//     console.error('Error fetching classrooms:', error);
//     res.status(500).json({ error: 'Error fetching classrooms' });
//   }
// });

app.get('/api/classrooms', async (req, res) => {
  try {
    const classrooms = await Classroom.aggregate([
      {
        $lookup: {
          from: 'users',
          let: { classroomLocation: '$location', classroomLanguageReq: '$languageRequirement' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$location', '$$classroomLocation'] },
                    {
                      $or: [
                        { $eq: ['$$classroomLanguageReq', []] }, // If languageRequirement is null or empty array
                        {
                          $ne: [
                            { $size: { $setIntersection: ['$languages', '$$classroomLanguageReq'] } },
                            0
                          ]
                        } // If there is at least one common language between languages and languageRequirement
                      ]
                    }
                  ]
                },
              },
            },
            {
              $project: {
                _id: 0,
                name: 1,
                email: 1,
                languages: 1,
              },
            },
          ],
          as: 'volunteers',
        },
      },
    ]).exec();

    res.json(classrooms);
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ error: 'Error fetching classrooms' });
  }
});



// Start the server
app.listen(port, () => console.log(`Backend server listening on port ${port}`));

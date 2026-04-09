const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express()
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8000;
require('dotenv').config()
const { DateTime } = require('luxon');  // Import Luxon


app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@skolaschool.hvgr3f0.mongodb.net/?retryWrites=true&w=majority&appName=skolaschool`



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //creating user collectionn 
    const userCollection = client.db('skolaschool').collection('users');
    const assignmentsCollection = client.db('skolaschool').collection('assignments');
    const attendanceCollection = client.db('skolaschool').collection('attendences');
    const absencesCollection = client.db('skolaschool').collection('absences');
    const studentsCollection = client.db('skola').collection('students')


    /* Putting all users */
    app.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };

      try {
        const existingUser = await userCollection.findOne(filter);
        if (existingUser) {
          console.log("User with this email already exists:", email);
          return res.status(400).send({ error: 'User with this email already exists.' });
        }

        const options = { upsert: true };
        const updateDoc = { $set: user };

        const result = await userCollection.updateOne(filter, updateDoc, options);
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        console.log("User updated/created successfully:", result);
        res.send({ result, token });
      } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send({ error: 'Failed to update user' });
      }
    });


    /* getting all users */
    /*  app.get('/users', async (req, res) => {
        try {
          const result = await userCollection.find().toArray();
          res.send(result);
        } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
  
      */
    // Assuming you have a way to join user data with teacher data
    app.get('/users', async (req, res) => {
      try {
        // Fetch users
        const users = await userCollection.find().toArray();

        // Fetch teacher data from assignments or attendance
        const assignments = await assignmentsCollection.find().toArray(); // Or attendanceCollection.find().toArray()

        // Create a map of teacher emails to their IDs
        const teacherMap = assignments.reduce((acc, assignment) => {
          acc[assignment.teacherEmail] = assignment.teacherId;
          return acc;
        }, {});

        // Combine user data with teacher data
        const usersWithTeacherId = users.map(user => ({
          ...user,
          teacherId: teacherMap[user.email] || 'N/A'
        }));

        res.send(usersWithTeacherId);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ success: false, message: error.message });
      }
    });


    // making a existing user admin and checking a user is admin or not?
    app.put('/user/admin/:email', async (req, res) => {
      const email = req.params.email;
      const filter = { email: email }
      const updateDoc = {
        $set: { role: 'admin' },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result)
    })

    /********** Getting admin  */
    app.get('/admin/:email', async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      // Check if user is null
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      // Check if user is admin
      const isAdmin = user.role === 'admin';
      res.send({ admin: isAdmin });
    });



    /*** putting for teacher assingmensts  */
    /* app.post('/assign', async (req, res) => {
       const { teacherEmail, teacherId, classTime, className, day, subject, teacherName } = req.body;
       const assignment = { teacherEmail, teacherId, classTime, className, day, subject, teacherName };
   
       try {
           // Check if an assignment already exists with the same day, time, and class name
           const existingAssignment = await assignmentsCollection.findOne({
               classTime,
               className,
               day
           });
   
           if (existingAssignment) {
               return res.send({ success: false, message: 'Assignment collision: Another assignment already exists for the same day, time, and class.' });
           }
   
           // Check if the teacherId is already in use
           const existingTeacher = await assignmentsCollection.findOne({ teacherId });
   
           if (existingTeacher) {
               return res.send({ success: false, message: 'Teacher ID already in use. Please use a unique Teacher ID.' });
           }
   
           await assignmentsCollection.insertOne(assignment);
           res.send({ success: true });
       } catch (error) {
           res.send({ success: false, message: error.message });
       }
   }); */

    app.post('/assign', async (req, res) => {
      const { teacherEmail, teacherId, classTime, className, day, subject, teacherName } = req.body;
      const assignment = { teacherEmail, teacherId, classTime, className, day, subject, teacherName };

      try {
        // Check if an assignment already exists with the same day, time, and class name
        const existingAssignment = await assignmentsCollection.findOne({
          classTime,
          className,
          day
        });

        if (existingAssignment) {
          return res.send({ success: false, message: 'Assignment collision: Another assignment already exists for the same day, time, and class.' });
        }

        // Check if the teacherId is already in use
        const existingTeacher = await assignmentsCollection.findOne({ teacherId });

        if (existingTeacher && existingTeacher.teacherEmail !== teacherEmail) {
          return res.send({ success: false, message: 'Teacher ID already in use by a different teacher. Please use a unique Teacher ID.' });
        }

        // If the teacherId is not in use or is used by the same teacher, proceed with the assignment
        await assignmentsCollection.insertOne(assignment);
        res.send({ success: true });
      } catch (error) {
        res.send({ success: false, message: error.message });
      }
    });



    /****** getting teachers individula work in viewAssingments  */
    app.get('/assignments/:email', async (req, res) => {
      const email = req.params.email;
      try {
        const assignments = await assignmentsCollection.find({ teacherEmail: email }).toArray();
        res.send(assignments);
      } catch (error) {
        res.send({ success: false, message: error.message });
      }
    });

    /****** getting all teachers works in admin viewassingments   */
    app.get('/allAssignments', async (req, res) => {
      try {
        const assignments = await assignmentsCollection.find({}).toArray();
        res.send(assignments);
      } catch (error) {
        res.send({ success: false, message: error.message });
      }
    });


    /****** putting all attendence  */
    /* app.post('/markAttendance', async (req, res) => {
       const { teacherEmail,teacherId, classTime, className, day, subject, teacherName } = req.body;
       const attendance = { teacherEmail,teacherId, classTime, className, day, subject, teacherName, date: new Date() };
   
       try {
           const [start, end] = classTime.split(' - ');
           const now = DateTime.now().setZone('Asia/Dhaka');  // Get the current time in Asia/Dhaka timezone
           const currentTime = now.toFormat('HH:mm');  // Format current time in 24-hour format
           const currentDay = now.toFormat('cccc');  // Get the current day in full text format
   
           // Debugging logs
 
   
           if (currentDay.toLowerCase() !== day.toLowerCase()) {
               return res.status(400).send({ success: false, message: 'Cannot mark attendance on a different day' });
           }
   
           // Check if the current time is within the scheduled class time
           const [startTime, endTime] = [start, end].map(time => DateTime.fromFormat(time, 'h:mm a', { zone: 'Asia/Dhaka' }));
           const currentTimeLuxon = DateTime.fromFormat(currentTime, 'HH:mm', { zone: 'Asia/Dhaka' });
   
           if (currentTimeLuxon < startTime || currentTimeLuxon > endTime) {
               return res.status(400).send({ success: false, message: 'Cannot mark attendance outside of class time' });
           }
   
           await attendanceCollection.insertOne(attendance);
           res.send({ success: true });
       } catch (error) {
           console.error('Error inserting attendance:', error);
           res.status(500).send({ success: false, message: error.message });
       }
   });
 */

    const { DateTime } = require('luxon');

    app.post('/markAttendance', async (req, res) => {
      const { teacherEmail, teacherId, classTime, className, day, subject, teacherName } = req.body;
      const attendance = { teacherEmail, teacherId, classTime, className, day, subject, teacherName, date: new Date() };

      try {
        const [start, end] = classTime.split(' - ');
        const now = DateTime.now().setZone('Asia/Dhaka');  // Get the current time in Asia/Dhaka timezone
        const currentTime = now.toFormat('HH:mm');  // Format current time in 24-hour format
        const currentDay = now.toFormat('cccc');  // Get the current day in full text format

        // Debugging logs
        console.log(`Current time: ${currentTime}, Class time: ${start} - ${end}`);
        console.log(`Current day: ${currentDay}, Scheduled day: ${day}`);

        if (currentDay.toLowerCase() !== day.toLowerCase()) {
          return res.status(400).send({ success: false, message: 'Cannot mark attendance on a different day' });
        }

        // Check if the current time is within the scheduled class time
        const [startTime, endTime] = [start, end].map(time => DateTime.fromFormat(time, 'h:mm a', { zone: 'Asia/Dhaka' }));
        const currentTimeLuxon = DateTime.fromFormat(currentTime, 'HH:mm', { zone: 'Asia/Dhaka' });

        if (currentTimeLuxon < startTime || currentTimeLuxon > endTime) {
          return res.status(400).send({ success: false, message: 'Cannot mark attendance outside of class time' });
        }

        await attendanceCollection.insertOne(attendance);
        res.send({ success: true });
      } catch (error) {
        console.error('Error inserting attendance:', error);
        res.status(500).send({ success: false, message: error.message });
      }
    });


    /*********** getting all attendence and display in adminviewattendence  */
    /*  app.get('/allAttendance', async (req, res) => {
        try {
          const attendanceRecords = await attendanceCollection.find().toArray();
          res.send(attendanceRecords);
        } catch (error) {
          console.error('Error fetching attendance records:', error);
          res.send({ success: false, message: error.message });
        }
      }); */
    app.get('/allAttendance', async (req, res) => {
      try {
        const { teacherId } = req.query; // Get teacherId from query parameters
        let query = {};
        if (teacherId) {
          query.teacherId = teacherId; // Add teacherId to query if it exists
        }
        const attendanceRecords = await attendanceCollection.find(query).toArray();
        res.send(attendanceRecords);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.send({ success: false, message: error.message });
      }
    });





    app.post('/markAbsence', async (req, res) => {
      const { teacherEmail, teacherId, className, classTime, subject, day, teacherName, absenceReason } = req.body;

      if (!absenceReason) {
        return res.status(400).json({ success: false, message: 'Absence reason is required' });
      }

      const absence = { teacherEmail, teacherId, className, classTime, subject, day, teacherName, absenceReason, dateReported: new Date() };
      console.log(absence)

      try {
        await absencesCollection.insertOne(absence);
        res.status(200).json({ success: true, message: 'Absence reason submitted successfully' });
      } catch (error) {
        console.error('Error saving absence record:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });

    app.get('/allAbsences', async (req, res) => {
      try {
        const absences = await absencesCollection.find().toArray();
        res.send(absences);
      } catch (error) {
        console.error('Error fetching absences:', error);
        res.send({ success: false, message: error.message });
      }
    });




  } finally {

  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World! from Skola')
})

app.listen(port, () => {
  console.log(`Skola   app listening on port ${port}`)
})


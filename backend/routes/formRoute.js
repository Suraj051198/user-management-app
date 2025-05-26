// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const newUser = new User({ name, email, password });
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error registering user' });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');


// Route to handle user registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
});


// get all users
router.get('/users', async(req,res)=>{
  try{
    const users=await User.find();// Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' }); // Handle errors
  }
});

// delete user by id
router.delete('/users/:id',async(req,res)=>{
  const { id } = req.params; // Get the user ID from the request parameters

  try {
    const deletedUser = await User.findByIdAndDelete(id); // Find and delete the user by ID
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' }); // If user not found, return 404
    }
    res.status(200).json({ message: 'User deleted successfully' }); // Return success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting user' }); // Handle errors
  }
})

// update user by id
router.put('/users/:id', async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters
  const { name, email, password } = req.body; // Get the updated user data from the request body

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true }); // Find and update the user by ID
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' }); // If user not found, return 404
    }
    res.status(200).json(updatedUser); // Return the updated user data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user' }); // Handle errors
  }
});

module.exports = router;

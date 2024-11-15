// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// users/5/applications
router.get('/', async (req, res) => {
    try {
        // look up the user
        const currentUser = await User.findById(req.session.user._id)
        // render index.ejs, passing in all the current user's application as data in the context object
        res.render('applications/index.ejs', {
            applications: currentUser.applications,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// Create
router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        // look up the user from req.session
        const currentUser = await User.findById(req.session.user._id)
        // push req.body (the new form data object) to the applications array of the current user
        currentUser.applications.push(req.body)
        // save changes to the user
        await currentUser.save()
        // redirect back to the applicaiton index view
        res.redirect(`/users/${currentUser._id}/applications`)
    } catch (error) {
        // if any errors, log them and redirect back home
        console.log(error)
        res.redirect('/')
    }
})

// ID routes need to be listed last
// delete
router.delete('/:applicationId', async (req, res) => {
    try {
        // look up the user
        const currentUser = await User.findById(req.session.user._id)
        // use the mongoose .deleteOne() method to delete and application using the id supplied from req.params
        currentUser.applications.id(req.params.applicationId).deleteOne()
        // save changes to the user
        await currentUser.save()
        // redirect back to the applications index view
        res.redirect(`/users/${currentUser._id}/applications`)
    } catch (error) {
        // if any errors, log them and redirect back home
        console.log(error)
        res.redirect('/')
    }
})
// show route
router.get('/:applicationId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // use a mongoose helper method to find a specific embeded document within the model
      // Find the application by the applicationId supplied from req.params
      const application = currentUser.applications.id(req.params.applicationId);
      // Render the show view, passing the application data in the context object
      res.render('applications/show.ejs', {
        application: application,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/')
    }
});
// update route
router.put('/:applicationId', async (req, res) => {
    try {
      // Find the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Find the current application from the id supplied by req.params
      const application = currentUser.applications.id(req.params.applicationId);
      // Use the Mongoose .set() method
      // this method updates the current application to reflect the new form data on `req.body`
      application.set(req.body);
      // Save the current user
      await currentUser.save();
      // Redirect back to the show view of the current application
      res.redirect(
        `/users/${currentUser._id}/applications/${req.params.applicationId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});
// Edit route
router.get('/:applicationId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const application = currentUser.applications.id(req.params.applicationId);
      res.render('applications/edit.ejs', {
        application: application,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});



// Export the router
module.exports = router;

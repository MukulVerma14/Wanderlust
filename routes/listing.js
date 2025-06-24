const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const {storage} = require("../cloudConfig.js");
const multer = require('multer');
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

router.route("/")
 .get(wrapAsync(listingController.index))//Index route
 .post(isLoggedIn, upload.single("listing[image]"), wrapAsync(listingController.createListing));//Create route

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm); 

router.route("/:id")
 .get( wrapAsync(listingController.showListing))//show route
 .put( isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))//update route
 .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));//delete route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
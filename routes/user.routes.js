const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();


//CRUD ENDPOINTS: 


//AUTHORISATION ENDPOINTS (REGISTER, LOGIN, LOGOUT):
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);


// Display all the users in the database:
router.get("/", userController.getAllUsers);

//Get user by id:
router.get("/:id", userController.userInfo);

//Update user by id:
router.put("/:id", userController.updateUser);

//Delete user by id:
router.delete("/:id", userController.deleteUser);

//The 'Follow' feature:
router.patch("/follow/:id", userController.follow);

//The 'Unfollow feature:
router.patch("/unfollow/:id", userController.unfollow);



//Upload a profile picture on an account:
router.post("/upload", upload.single("file"), uploadController.uploadProfile);



module.exports = router;


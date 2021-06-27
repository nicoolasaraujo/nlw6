import { Router } from "express"
import { AuthenticateUserController } from "./controllers/authenticateUserContoller";
import { CreateComplimentController } from "./controllers/createComplimentController";
import { CreateTagController } from "./controllers/createTagContoller";
import { CreateUserController } from "./controllers/createUserController"
import { ListUserSendComplimentsController } from "./controllers/listSendComplimentsController";
import { ListTagsController } from "./controllers/listTagsController";
import { ListUsersController } from "./controllers/listUserController";
import { ListUserReceiveComplimentsController } from "./controllers/listUserReceiveComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router()

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post(
    "/tags",
    ensureAuthenticated,
    ensureAdmin,
    createTagController.handle
);
router.get(
    "/tags",
    ensureAuthenticated,
    listTagsController.handle
);

router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle)

router.post("/login", authenticateUserController.handle);

router.post(
    "/compliments",
    ensureAuthenticated,
    createComplimentController.handle
);

router.get(
    "/users/compliments/send",
    ensureAuthenticated,
    listUserSendComplimentsController.handle)
router.get(
    "/users/compliments/receive",
    ensureAuthenticated,
    listUserReceiveComplimentsController.handle)

export { router }
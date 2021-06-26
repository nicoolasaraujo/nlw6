import { Router } from "express"
import { AuthenticateUserController } from "./controllers/authenticateUserContoller";
import { CreateComplimentController } from "./controllers/createComplimentController";
import { CreateTagController } from "./controllers/createTagContoller";
import { CreateUserController } from "./controllers/createUserController"
import { ensureAdmin } from "./middlewares/ensureAdmin";


const router = Router()

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.use(ensureAdmin)
router.post("/users", ensureAdmin, createUserController.handle);
router.post("/tags", createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", createComplimentController.handle);

export { router }
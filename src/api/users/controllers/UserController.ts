import { Controller, Get, Path, Route, Tags } from "tsoa";
import User from "../models/User";
import UserService from "../services/UserService";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  /** Get user by ID */
  @Get("{userId}")
  async getUser(@Path() userId: string): Promise<User | null> {
    return new UserService().getUser(userId);
  }
}
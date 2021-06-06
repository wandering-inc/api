import { Controller, Get, Path, Route, Tags } from "tsoa";
import RealAchievement from "../../achievements/models/RealAchievement";
import { SafeUser } from "../models/SafeUser";
import RealUserService from "../services/UserService";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  /** Get user by ID */
  @Get("{userId}")
  async getUser(@Path() userId: string): Promise<SafeUser | null> {
    return new RealUserService().getUser(userId);
  }

  /** Get all achievements by user ID */
  @Get("{userId}/achievements")
  async getUserAchievements(@Path() userId: string): Promise<RealAchievement[] | null> {
    return new RealUserService().getUserAchievements(userId);
  }
}

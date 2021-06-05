import { DocumentType, pre, prop } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { Field, ID, ObjectType } from "type-graphql";

/**
 * @tsoaModel
 */

@pre<User>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
})
@ObjectType({ description: "User model" })
export default class User {
  @Field(() => ID)
  id!: string;

  @Field()
  @prop()
  firstName!: string;

  @Field()
  @prop()
  lastName!: string;

  @Field()
  @prop({ unique: true })
  email!: string;

  @Field()
  @prop()
  picture!: string;

  @Field()
  @prop()
  password!: string;

  public async comparePassword(this: DocumentType<User>, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}
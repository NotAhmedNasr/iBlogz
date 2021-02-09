import { User } from "./user";

export class Comment {
  constructor(
    public content: string,
    public commenter?: User,
    public _id?: string,
    public created_at?: Date
  ) { }
}

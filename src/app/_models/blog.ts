import { User } from "./user";
import { Comment } from "./comment";

export class Blog {
  constructor(
    public title: string,
    public author?: User,
    public body: string = '',
    public photo: string = '',
    public tags: string[] = [],
    public likers: string[] = [],
    public comments: Comment[] = [],
    public _id?: string,
    public created_at?: Date
  ) { }
}

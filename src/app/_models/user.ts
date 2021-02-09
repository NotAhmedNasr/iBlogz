export class User {
  constructor(
    public username: string = '',
    public password: string = '',
    public email: string = '',
    public firstname: string = '',
    public lastname: string = '',
    public dob: Date = new Date(),
    public followers: string[] = [],
    public following: string[] = [],
    public profilePicture: string = '',
    public _id: string = '',
    public token: string = '',
    public created_at?: Date
  ) { }
}


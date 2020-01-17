export class User {
    public Title:string;
    public FirstName: string;
    public LastName: string;
    public Email:string;
    public Password:string;
    public Phone:number;
    public Address:string
    public IsAdmin:boolean;
    public CreationDate=null;
}
export const Users: User[] = []

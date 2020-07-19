// import { Role } from "./Role";
// import { Specialty } from "./Specialty";

export interface User{
    userId: number
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    phone: string
    role:string
    specialty:string
    // role: Role
    // specialty: Specialty
    description: string,
    image?: string

    // constructor(userId: number, username: string, password: string, firstName: string, lastName: string,
    //             email: string, role: Role, phone: string, specialty: Specialty, description: string){
    //     this.userId = userId,
    //     this.username = username,
    //     this.password = password,
    //     this.firstName = firstName,
    //     this.lastName = lastName,
    //     this.email = email,
    //     this.role = role,
    //     this.phone = phone,
    //     this.specialty = specialty,
    //     this.description = description
    // }
}


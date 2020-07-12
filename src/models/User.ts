import { Role } from "./Role"
import { Specialty } from "./Specialty"

export class User{
    userId: number
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    role: Role
    phoneNumber: number
    specialty: Specialty
    description: string
}
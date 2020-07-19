import { UserDTO } from "../dtos/user-dto";
import { User } from "../models/User";
// import { Specialty } from "../models/Specialty";

export function UserDTOtoUserConverter(udto: UserDTO): User {
    // let specialty:specialty[] = [];
    // for(const c of udto.specialtys){
    //     specialty.push({specialtyId:0, specialty:c})// this si a problem to solve in the future
    // }
    return {
        userId: udto.user_id,
        username: udto.username,
        password: udto.password,
        firstName: udto.first_name,
        lastName: udto.last_name,
        email: udto.email,
        role: udto.role,
        specialty: udto.specialty,
        // role:{
        //     roleId: udto.role_id,
        //     role: udto.role
        // },
        phone: udto.phone,
        // specialty:{
        //     specialtyId: udto.specialty_id,
        //     specialty: udto.specialty
        // },
        description: udto.description,
        image: udto.image
    }
}
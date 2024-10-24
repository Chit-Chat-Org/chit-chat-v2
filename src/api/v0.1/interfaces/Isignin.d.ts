import {Document} from 'mongoose'

interface Isignin extends Document{
    username:string,
    password:string
}

export default Isignin;
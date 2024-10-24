import {Router} from 'express'
import SignUp from '../routers/SignUp'
import SignIn from '../routers/SignIn'
import sendMail from '../routers/sendMail'

const app = Router()
app.use('/signup', SignUp)
app.use('/signin', SignIn)
app.use('/send-email',sendMail);

export default app;
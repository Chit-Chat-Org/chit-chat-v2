import {Router} from 'express'
import uploadToAws from '../routers/uploadToAws'
import newOrganization from '../routers/newOrganization'
import addAiTrainingModel from '../routers/addNewtrainingModel'
import QnARetrieval from '../routers/QnARetrieval'


const app = Router()
app.use('/upload', uploadToAws)
app.use('/newOrganization', newOrganization)
app.use('/addAiTrainingModel',addAiTrainingModel)
app.use('/QnARetrieval',QnARetrieval)


export default app;
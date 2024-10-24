import { OpenAI } from 'openai'
import 'dotenv/config'

const openai_api = process.env.OPENAI_API__KEY

if(!openai_api) throw new Error('OpenAi Api Not Found !')

export const openai = new OpenAI({apiKey: openai_api})
//! IMPORTACION DE VARIABLES DE ENTORNO
import 'dotenv/config'
import { config } from '../config/env'

const { LOCAL_URL } = config
const whiteList = [LOCAL_URL, 'http://localhost:3000', 'http://localhost:4000']

const corsOptions = {
  origin: function (origin: any, callback: any) {
    let corsPass = true
    if (whiteList.indexOf(origin) !== -1) {
      corsPass = true
    } else {
      corsPass = false
    }
    callback(null, corsPass)
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

export { corsOptions }

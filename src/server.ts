import express, {Application} from 'express';
import route from './routes/Routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import dbConnet from './settings/db/db';
import { apis } from './settings/docs/openApi';



class Server{
    private app: Application;
    private port: String = process.env.PORT || '8080';

    constructor(){
        this.app = express();

    }

    /**
     * description: start the server
     */
    public start(){
        this.app.listen(this.port, ()=>{
            console.log('Server on port'+this.port)
        })
        this.middleware();
        this.routes()
        dbConnet()
    }

    private middleware(){
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json());
        const openapiSpecification = swaggerJsdoc(
            {
                definition: {
                  openapi: '3.0.0',
                  info: {
                    version: '1.0',
                    title: 'Pacific culsport api',
                  },
                  host:'http://localhost:8080'
                },
                apis // files containing annotations as above
              }
        );

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

    }

    private routes(){
        this.app.use('/', route)
    }
}

export default Server;
import express,{Application, Request, Response, NextFunction} from 'express';

const app: Application = express();

app.get('/',(req: Request, res: Response, next: NextFunction) => {
    res.send('This is the SERVER');
});

app.listen(process.env.PORT || 3000);
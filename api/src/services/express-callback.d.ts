import { IController } from "./Types";
declare const makeExpressCallback: (controller: IController) => (req: any, res: any) => void;
export default makeExpressCallback;

import { HttpRequest, IController } from "./Types";

const makeExpressCallback = (controller: IController) => {
  return (req: any, res: any) => {
    const httpRequest: HttpRequest = {
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
      body: req.body,
      params: req.params,
      query: req.query,
      ip: req.ip,
      method: req.method,
      path: req.path,
    };

    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) res.set(httpResponse.headers);
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) =>
        res.status(500).send({ error: "An unknown error has occured" })
      );
  };
};

export default makeExpressCallback
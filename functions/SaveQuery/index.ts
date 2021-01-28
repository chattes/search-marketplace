import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import Joi = require("joi");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
  const schema = Joi.object({
    location: Joi.string().required(),
    search: Joi.string().required(),
    category: Joi.string(),
    maxPrice: Joi.number().integer(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: error.message,
    };
  } else {
    context.res = {
      status: 204,
    };
  }
};

export default httpTrigger;

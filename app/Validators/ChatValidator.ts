import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({});

  public messages: CustomMessages = {};
}

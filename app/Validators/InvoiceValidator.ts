import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class InvoiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // Campos principales del modelo Invoice
    invoice_number: schema.string([
      rules.required(),
      rules.unique({ table: "invoices", column: "invoice_number" }), // Verifica que el número de factura sea único
      rules.maxLength(50),
    ]),
    invoice_date: schema.date({ format: "yyyy-MM-dd" }, [rules.required()]),
    total_amount: schema.number([
      rules.required(),
      rules.unsigned(), // El monto total debe ser positivo
    ]),
    fee_id: schema.number([
      rules.required(),
      rules.exists({ table: "fees", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {
    // Mensajes personalizados para los campos principales
    "invoice_number.required": "El número de factura es obligatorio",
    "invoice_number.unique": "El número de factura ya está en uso",
    "invoice_number.maxLength":
      "El número de factura no puede exceder los 50 caracteres",
    "invoice_date.required": "La fecha de la factura es obligatoria",
    "invoice_date.format":
      "El formato de la fecha de la factura debe ser yyyy-MM-dd",
    "total_amount.required": "El monto total es obligatorio",
    "total_amount.unsigned": "El monto total debe ser un número positivo",
  };
}

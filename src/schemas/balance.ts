import { z } from "zod";
import validator from "validator";
import { Balance } from "@prisma/client";

export const createBalanceSchema = z
  .object({
    user_id: z
      .string({ required_error: "User ID is required." })
      .uuid({ message: "user_id must be a valid id." }),
    createdAt: z.string({ required_error: "Date is required" }).date(),
    credit_amount: z
      .number({
        invalid_type_error: "Amount must be a number.",
        required_error: "Number is required.",
      })
      .min(1, { message: "Amount must be greater than 0." })
      .refine((value) =>
        validator.isCurrency(value.toFixed(2), {
          digits_after_decimal: [2],
          allow_negatives: false,
          decimal_separator: ".",
        })
      ),
    debit_amount: z
      .number({
        invalid_type_error: "Amount must be a number.",
        required_error: "Number is required.",
      })
      .min(1, { message: "Amount must be greater than 0." })
      .refine((value) =>
        validator.isCurrency(value.toFixed(2), {
          digits_after_decimal: [2],
          allow_negatives: false,
          decimal_separator: ".",
        })
      ),
    cash_amount: z
      .number({
        invalid_type_error: "Amount must be a number.",
        required_error: "Number is required.",
      })
      .min(1, { message: "Amount must be greater than 0." })
      .refine((value) =>
        validator.isCurrency(value.toFixed(2), {
          digits_after_decimal: [2],
          allow_negatives: false,
          decimal_separator: ".",
        })
      ),
    expense_amount: z
      .number({
        invalid_type_error: "Amount must be a number.",
        required_error: "Number is required.",
      })
      .min(1, { message: "Amount must be greater than 0." })
      .refine((value) =>
        validator.isCurrency(value.toFixed(2), {
          digits_after_decimal: [2],
          allow_negatives: false,
          decimal_separator: ".",
        })
      ),
  })
  .strict({ message: "Some provided field is not allowed." });

export const updateBalanceSchema = createBalanceSchema
  .omit({ user_id: true, createdAt: true })
  .partial();

export type RequestBalance = z.infer<typeof createBalanceSchema>;
export type ResponseBalance = Balance;
export type ResponseBalances = {
  balances: ResponseBalance[];
  metadata?: {
    total_balances: number;
    page: number;
    total_pages: number;
  };
};
export type UpdateBalance = z.infer<typeof updateBalanceSchema>;

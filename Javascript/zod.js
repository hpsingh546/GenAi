//const { z } = require("zod"); // Or:
import { z } from "zod";

// 1. Define the Blueprint (Schema)
const UserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  age: z.number().int().positive(),
  email: z.string().email("Please enter a valid email address"),
});

// 2. Data to validate (could come from a form or API)
const dataFromUser = {
  username: "Jo", // This is too short (rule: min 3)
  age: 25,
  email: "not-an-email", // This is an invalid email format
};

// 3. Validate the data
const result = UserSchema.safeParse(dataFromUser);

if (result.success) {
  // If valid, you can safely use result.data
  console.log("Success:", result.data);
} else {
  // If invalid, you get a clear list of errors
  console.error("Validation failed:", result.error.format());
}

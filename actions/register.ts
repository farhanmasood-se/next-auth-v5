'use server';

import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '@/data/user';

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Field' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // TODO: Send verification token email

  return { success: 'User created successfully!' };
};

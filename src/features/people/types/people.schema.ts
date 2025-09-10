import { z } from 'zod';

const PersonServerSnake = z.object({
  id: z.number().int().positive(),
  full_name: z.string().min(1),
  age: z.number().int().nonnegative(),
  role: z.enum(['admin', 'user', 'manager']),
  active: z.boolean(),
  created_at: z.iso.datetime({ offset: true }),
  score: z.number().nullable().optional().default(null),
  tags: z.array(z.string()).default([]),
});

const PersonServerCamel = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  age: z.number().int().nonnegative(),
  role: z.enum(['Admin', 'User', 'Manager']),
  isActive: z.boolean(),
  createdAt: z.iso.datetime({ offset: true }),
  score: z.number().nullable().optional().default(null),
  tags: z.array(z.string()).default([]),
});

export const PersonServerSchema = z.union([PersonServerSnake, PersonServerCamel]).transform((p) => {
  if ('full_name' in p) return p;
  return {
    id: p.id,
    full_name: p.name,
    age: p.age,
    role: p.role.toLowerCase() as 'admin' | 'user' | 'manager',
    active: p.isActive,
    created_at: p.createdAt,
    score: p.score ?? null,
    tags: p.tags ?? [],
  };
});

export type PersonServer = z.output<typeof PersonServerSchema>;
export const PeopleServerSchema = z.array(PersonServerSchema);

export const PersonSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  age: z.number().int().nonnegative(),
  role: z.enum(['Admin', 'User', 'Manager']),
  isActive: z.boolean(),
  createdAt: z.date(),
  score: z.number().nullable(),
  tags: z.array(z.string()),
});
export type Person = z.infer<typeof PersonSchema>;
export const PeopleSchema = z.array(PersonSchema);

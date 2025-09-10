// src/lib/zod-helpers.ts
import type { z } from 'zod';

export function parseOrThrow<T>(schema: z.ZodType<T>, data: unknown, ctx?: string): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const msg = result.error.issues
      .map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid data${ctx ? ` (${ctx})` : ''}: ${msg}`);
  }

  return result.data;
}

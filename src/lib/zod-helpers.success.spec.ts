import { z } from 'zod';
import { parseOrThrow } from './zod-helpers';

it('returns typed data on success', () => {
  const S = z.object({ n: z.number() });
  const out = parseOrThrow(S, { n: 1 }, 'ctx');
  expect(out.n).toBe(1);
});

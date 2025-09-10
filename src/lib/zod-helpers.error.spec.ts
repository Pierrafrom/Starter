import { z } from 'zod';
import { parseOrThrow } from './zod-helpers';

it('throws a readable error (includes field path and message)', () => {
  const S = z.object({ n: z.number() });
  expect(() => parseOrThrow(S, { n: 'x' }, 'ctx')).toThrow(/Invalid data \(ctx\): n: /i);
});

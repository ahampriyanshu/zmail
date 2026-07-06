import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

test('mobile footer spans the full viewport width', () => {
  const stylesheet = readFileSync(
    join(process.cwd(), 'app/components/Footer/footer.module.scss'),
    'utf8'
  );
  const mobileNavRule = stylesheet.match(
    /\.mobile_nav\s*\{[\s\S]*?@media only screen and \(max-width: 767px\)\s*\{([\s\S]*?)\n\s*\}/
  );

  assert.ok(mobileNavRule, 'Expected a mobile nav media rule');
  assert.match(mobileNavRule[1], /\bleft:\s*0;/);
  assert.match(mobileNavRule[1], /\bright:\s*0;/);
});

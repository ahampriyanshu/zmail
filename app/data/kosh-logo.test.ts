import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { permanentData } from './inbox.data';
import { PROFILE_DATA } from './links.data';

test('Kosh uses the updated PNG logo asset', () => {
  const koshEmail = permanentData.find((email) => email.id === 'kosh');

  assert.equal(koshEmail?.sender.logo, 'kosh.png');
  assert.equal(PROFILE_DATA.kosh.img, '/icons/kosh.png');
  assert.equal(
    existsSync(join(process.cwd(), 'public/icons/kosh.png')),
    true
  );
});

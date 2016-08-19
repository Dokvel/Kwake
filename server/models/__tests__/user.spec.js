import test from 'ava';
import request from 'supertest';
import app from '../../server';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';
import cuid from 'cuid';

const newUser = {
  givenName: 'Foo',
  familyName: 'Bar',
  email: 'test@test.com',
  googleId: '1',
  image: 'http://image.url.com'
};

test.beforeEach('connect', t => {
  connectDB(t, () => {
  });
});

test.afterEach.always(t => {
  dropDB(t);
});

test.serial('Should correctly auth new user', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/signin')
    .send({
      user: newUser
    })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedUser = await User.findOne({ email: newUser.email }).exec();
  t.is(savedUser.googleId, '1');
});

test.serial('Should correctly auth exist user', async t => {
  t.plan(2);

  const user = new User({ ...newUser, cuid: cuid() });
  user.save();

  const res = await request(app)
    .post('/api/signin')
    .send({
      user: { ...newUser, googleId: '3' }
    })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedUser = await User.findOne({ email: newUser.email }).exec();
  t.is(savedUser.googleId, '1');
});

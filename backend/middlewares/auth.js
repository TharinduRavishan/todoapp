import AuthToken from '../api/resources/auth/auth.model';

module.exports = async (req, res, next) => {
  const authToken = req.get('authorization');

  if (!authToken) {
    return res.status(500).send({ error: 'Authorization header is not found' });
  }
  const foundToken = await AuthToken.find({ token: authToken });

  if (foundToken.length === 0) {
    return res.status(500).send({ error: 'Invalid token' });
  }
  next();
};

const { getAuth } = require('@clerk/express');

// Allows through only signed-in Clerk users whose publicMetadata role is "admin".
// Requires a session token custom claim in the Clerk Dashboard:
//   "metadata": "{{user.public_metadata}}"
function requireAdmin(req, res, next) {
  const { userId, sessionClaims } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (sessionClaims?.metadata?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
}

module.exports = requireAdmin;

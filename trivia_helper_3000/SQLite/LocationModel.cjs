const Database = require('better-sqlite3');

class LocationModel {
  constructor(dbPath = '/Users/chrismayer/Repos/SUADTrivia/trivia_helper_3000/test_database_0.db') {
    this.db = new Database(dbPath);
    this.createTable();
  }

  createTable() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        venueName TEXT NOT NULL,
        playlist1 TEXT,
        playlist2 TEXT,
        playlist3 TEXT,
        playlist4 TEXT,
        playlist5 TEXT,
        playlist6 TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  insert(location) {
    const stmt = this.db.prepare(`
      INSERT INTO locations (
        venueName, playlist1, playlist2, playlist3, playlist4, playlist5, playlist6
      )
      VALUES (
        @venueName, @playlist1, @playlist2, @playlist3, @playlist4, @playlist5, @playlist6
      )
    `);
    const result = stmt.run(location);
    return result.lastInsertRowid;
  }

  findAll() {
    const stmt = this.db.prepare('SELECT * FROM locations');
    return stmt.all();
  }

  findAllVenueNames() {
    const stmt = this.db.prepare('SELECT venueName FROM locations');
    return stmt.all();
  }

  findById(id) {
    const stmt = this.db.prepare('SELECT * FROM locations WHERE id = ?');
    return stmt.get(id);
  }

  findByVenueName(venueName) {
    const stmt = this.db.prepare('SELECT playlist1, playlist2, playlist3, playlist4, playlist5, playlist6 FROM locations WHERE venueName = ?');
    return stmt.get(venueName);
  }

  updatePlaylistsByVenueName(venueName, playlists) {
    const stmt = this.db.prepare(`
        UPDATE locations
        SET
            playlist1 = @playlist1,
            playlist2 = @playlist2,
            playlist3 = @playlist3,
            playlist4 = @playlist4,
            playlist5 = @playlist5,
            playlist6 = @playlist6,
            updatedAt = CURRENT_TIMESTAMP
        WHERE venueName = @venueName
    `);
    stmt.run({
        venueName,
        playlist1: playlists.playlist1,
        playlist2: playlists.playlist2,
        playlist3: playlists.playlist3,
        playlist4: playlists.playlist4,
        playlist5: playlists.playlist5,
        playlist6: playlists.playlist6
    });
}

  delete(id) {
    const stmt = this.db.prepare('DELETE FROM locations WHERE id = ?');
    stmt.run(id);
  }

  close() {
    this.db.close();
  }
}

module.exports = LocationModel;
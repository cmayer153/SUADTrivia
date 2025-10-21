const Database = require('better-sqlite3');

class SongModel {
    //TODO switch this to a dynamic db string
  constructor(dbPath = '/Users/chrismayer/Repos/SUADTrivia/trivia_helper_3000/test_database_0.db') {
    this.db = new Database(dbPath);
    this.createTable();
  }

  createTable() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        url TEXT NOT NULL,
        playlist TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }


  insert(song) {
    if (Array.isArray(song)) {
        let lastId;
        for (const s of song) {
            lastId = this.db.prepare(`
                INSERT INTO songs (title, artist, url, playlist)
                VALUES (@title, @artist, @url, @playlist)
            `).run(s).lastInsertRowid;
            //TODO error checking
        }
        return lastId;
    }
  
  }

  findAll() {
    const stmt = this.db.prepare('SELECT * FROM songs');
    return stmt.all();
  }

  findAllPlaylists() {
    const stmt = this.db.prepare('SELECT DISTINCT playlist FROM songs');
    return stmt.all();
  }

  findById(id) {
    const stmt = this.db.prepare('SELECT * FROM songs WHERE id = ?');
    return stmt.get(id);
  }

  findByPlaylist(playlist) {
    const stmt = this.db.prepare('SELECT * FROM songs WHERE playlist = ?');
    return stmt.all(playlist);
  }

  update(id, song) {
    const fields = Object.keys(song).map(key => `${key} = @${key}`).join(', ');
    const stmt = this.db.prepare(`
      UPDATE songs SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = @id
    `);
    stmt.run({ ...song, id });
  }

  delete(id) {
    const stmt = this.db.prepare('DELETE FROM songs WHERE id = ?');
    stmt.run(id);
  }

  close() {
    this.db.close();
  }
}

module.exports = SongModel;
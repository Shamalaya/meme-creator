"use strict";

const db = require("./db");

// get all memes
exports.listMemes = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM meme";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const memes = rows.map((el) => {
        return {
          id: el.id,
          template_id: el.template_id,
          user_id: el.user_id,
          user_name: el.user_name,
          title: el.title,
          texts: [el.text0, el.text1, el.text2],
          font: el.font,
          color: el.color,
          protected: el.protected,
        };
      });
      resolve(memes);
      console.log(memes);
    });
  });
};

// get all public memes
exports.listPublicMemes = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM meme where protected = 0";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("sto qua");
      const memes = rows.map((el) => {
        return {
          id: el.id,
          template_id: el.template_id,
          user_id: el.user_id,
          user_name: el.user_name,
          title: el.title,
          texts: [el.text0, el.text1, el.text2],
          font: el.font,
          color: el.color,
          protected: el.protected,
        };
      });
      console.log(memes);
      resolve(memes);
    });
  });
};

// get all templates
exports.listTemplates = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM template";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const templates = rows.map((el) => {
        return {
          id: el.id,
          url: el.url,
          fontSize: el.font_size,
          textAreasNumber: el.text_areas,
          textAreas: [
            [el.text0_top, el.text0_left, el.text0_width],
            [el.text1_top, el.text1_left, el.text1_width],
            [el.text2_top, el.text2_left, el.text2_width],
          ],
        };
      });
      resolve(templates);
    });
  });
};

//add new meme
exports.createMeme = (meme) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO meme (id, template_id, user_id, user_name, title, text0, text1, text2, font, color, protected) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.run(
      sql,
      [
        meme.templateId,
        meme.userId,
        meme.userName,
        meme.title,
        meme.text[0],
        meme.text[1],
        meme.text[2],
        meme.font,
        meme.color,
        meme.protected,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

// delete an existing meme
exports.deleteMeme = (userId, id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM meme WHERE id = ? and user_id = ?";
    db.run(sql, [id, userId], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve(null);
    });
  });
};

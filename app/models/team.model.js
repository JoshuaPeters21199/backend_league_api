const sql = require("./db.js");

const Team = function(team) {
    this.name = team.name;
    this.coach_id = team.coach_id;
    this.league_id = team.league_id;
    this.notes = team.notes;
    this.motto = team.motto;
}

Team.create = async (newTeam, result) => {
    try {
        let result = await sql.query("INSERT INTO teams SET name = ?, coach_id = ?, league_id = ?, notes = ?, motto = ?",
        [newTeam.name, newTeam.coach_id, newTeam.league_id, newTeam.notes, newTeam.motto]);
        return { id: result.insertId, ...newTeam };
    } catch (err) {
        console.log("error: ", err);
        throw(err);
    }
};

Team.list = async (params, result) => {
    let query = `SELECT id, name, coach_id, league_id, notes, motto
    FROM (SELECT temp.id, temp.name, temp.coach_id, temp.league_id, temp.notes, temp.motto
    FROM teams temp) as x`;

    if (params.filterCol && params.filterStr) {
        query += ` WHERE x.${params.filterCol} LIKE '%${params.filterStr}%'`;
    }

    if (params.sortCol && params.sortDir) {
        query += ` ORDER BY x.${params.sortCol} ${params.sortDir}`;
    }

    console.log(query);

    try {
        let result = await sql.query(query);
        return result;
    } catch (err) {
        console.log("error: ", err);
        throw(err);
    }
};
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


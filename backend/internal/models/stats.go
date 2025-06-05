package models

type Stats struct {
	ChessDaily  *GameStats `json:"chess_daily,omitempty"`
	Chess960    *GameStats `json:"chess960_daily,omitempty"`
	ChessRapid  *GameStats `json:"chess_rapid,omitempty"`
	ChessBlitz  *GameStats `json:"chess_blitz,omitempty"`
	ChessBullet *GameStats `json:"chess_bullet,omitempty"`
	Tactics     *Tactics   `json:"tactics,omitempty"`
}

type GameStats struct {
	Last   *Rating    `json:"last,omitempty"`
	Best   *Rating    `json:"best,omitempty"`
	Record GameRecord `json:"record"`
}

type Rating struct {
	Rating int `json:"rating"`
	Date   int `json:"date"`
	RD     int `json:"rd,omitempty"`
}

type GameRecord struct {
	Win            int `json:"win"`
	Loss           int `json:"loss"`
	Draw           int `json:"draw"`
	TimePerMove    int `json:"time_per_move,omitempty"`
	TimeoutPercent int `json:"timeout_percent,omitempty"`
}

type Tactics struct {
	Highest Rating `json:"highest"`
	Lowest  Rating `json:"lowest"`
}

package models

type Game struct {
	URL          string `json:"url"`
	PGN          string `json:"pgn"`
	TimeControl  string `json:"time_control"`
	EndTime      int64  `json:"end_time"`
	Rated        bool   `json:"rated"`
	TimeClass    string `json:"time_class"`
	Rules        string `json:"rules"`
	White        Player `json:"white"`
	Black        Player `json:"black"`
	InitialSetup string `json:"initial_setup,omitempty"`
}

type GamePlayer struct {
	Rating   int    `json:"rating"`
	Result   string `json:"result"`
	Username string `json:"username"`
}

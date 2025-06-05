package models

type Player struct {
	Username   string `json:"username"`
	PlayerID   int    `json:"player_id"`
	Title      string `json:"title,omitempty"`
	Status     string `json:"status"`
	Name       string `json:"name,omitempty"`
	Avatar     string `json:"avatar,omitempty"`
	Location   string `json:"location,omitempty"`
	Country    string `json:"country"`
	Joined     int64  `json:"joined"`
	LastOnline int64  `json:"last_online"`
	Followers  int    `json:"followers"`
	IsStreamer bool   `json:"is_streamer"`
	TwitchURL  string `json:"twitch_url,omitempty"`
}

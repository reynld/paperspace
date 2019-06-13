package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

// Alert struct for parsed alerts from markdown
type Alert struct {
	Title string `json:"title"`
	Date  string `json:"date"`
	Tag   string `json:"tag"`
	Image string `json:"image"`
	Body  string `json:"body"`
}

var images = []string{
	"https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/mobile_images_rc0q.svg",
	"https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/goals_w8tw.svg",
	"https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/online_party_ar9g.svg",
}

func main() {
	godotenv.Load()
	port := fmt.Sprintf(":%s", os.Getenv("PORT"))

	r := mux.NewRouter()
	r.HandleFunc("/alerts", parseMarkDown).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET"},
	})

	fmt.Printf("server live on port%s\n", port)
	log.Fatal(http.ListenAndServe(port, c.Handler(r)))
}

func parseMarkDown(w http.ResponseWriter, r *http.Request) {
	url := fmt.Sprintf(os.Getenv("GIST_URL"))

	resp, err := http.Get(url)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	lines := strings.Split(string(body), "\n")

	var alerts []Alert
	var alertArr []string

	for _, line := range lines {
		if strings.HasPrefix(line, "###") {
			content := strings.Split(line, "### ")
			alertArr = append(alertArr, content[1])
		} else if len(alertArr) == 4 {
			index, _ := strconv.Atoi(alertArr[3])

			newAlert := Alert{
				Title: alertArr[0],
				Date:  alertArr[1],
				Tag:   alertArr[2],
				Image: images[index],
				Body:  line,
			}
			alerts = append(alerts, newAlert)

			alertArr = nil
		} else if line == "" {
			continue
		}
	}

	json.NewEncoder(w).Encode(&alerts)
}

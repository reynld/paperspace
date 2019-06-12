package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

type Alert struct {
	Title string `json:"title"`
	Date  string `json:"date"`
	Tag   string `json:"tag"`
	Image string `json:"image"`
	Body  string `json:"body"`
}

func main() {
	godotenv.Load()
	port := fmt.Sprintf(":%s", os.Getenv("PORT"))

	r := mux.NewRouter()
	r.HandleFunc("/get/alerts", parseMarkDown).Methods("GET")

	fmt.Printf("server live on port%s\n", port)
	log.Fatal(http.ListenAndServe(port, r))
}

func parseMarkDown(w http.ResponseWriter, r *http.Request) {
	url := fmt.Sprintf(os.Getenv("MD_URL"))

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
			newAlert := Alert{
				Title: alertArr[0],
				Date:  alertArr[1],
				Tag:   alertArr[2],
				Image: alertArr[3],
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
